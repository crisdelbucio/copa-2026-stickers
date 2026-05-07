import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, userStickers, InsertUserSticker, UserSticker } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

// Sticker collection queries
export async function getUserStickers(userId: number): Promise<UserSticker[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get stickers: database not available");
    return [];
  }

  return db.select().from(userStickers).where(eq(userStickers.userId, userId));
}

export async function getUserStickersByCountry(userId: number, countryCode: string): Promise<UserSticker[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get stickers: database not available");
    return [];
  }

  return db
    .select()
    .from(userStickers)
    .where(and(eq(userStickers.userId, userId), eq(userStickers.countryCode, countryCode)));
}

export async function upsertUserSticker(data: InsertUserSticker): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert sticker: database not available");
    return;
  }

  try {
    await db
      .insert(userStickers)
      .values(data)
      .onDuplicateKeyUpdate({
        set: {
          status: data.status,
          updatedAt: new Date(),
        },
      });
  } catch (error) {
    console.error("[Database] Failed to upsert sticker:", error);
    throw error;
  }
}

export async function deleteUserSticker(userId: number, countryCode: string, figurinhaNumber: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete sticker: database not available");
    return;
  }

  try {
    await db
      .delete(userStickers)
      .where(
        and(
          eq(userStickers.userId, userId),
          eq(userStickers.countryCode, countryCode),
          eq(userStickers.figurinhaNumber, figurinhaNumber)
        )
      );
  } catch (error) {
    console.error("[Database] Failed to delete sticker:", error);
    throw error;
  }
}

export async function getUserStickerStats(userId: number): Promise<{ total: number; tenho: number; repetidas: number; faltam: number }> {
  const stickers = await getUserStickers(userId);
  const total = 48 * 21; // 48 countries * 21 stickers each
  const tenho = stickers.filter((s) => s.status === "T").length;
  const repetidas = stickers.filter((s) => s.status === "R").length;
  const faltam = stickers.filter((s) => s.status === "F").length;

  return { total, tenho, repetidas, faltam };
}
