export const STICKERS_DATA = {
  A: [
    { name: "México", code: "MEX" },
    { name: "África do Sul", code: "RSA" },
    { name: "Coreia do Sul", code: "KOR" },
    { name: "Rep. Tcheca", code: "CZE" },
  ],
  B: [
    { name: "Canadá", code: "CAN" },
    { name: "Bósnia", code: "BIH" },
    { name: "Catar", code: "QAT" },
    { name: "Suíça", code: "SUI" },
  ],
  C: [
    { name: "Brasil", code: "BRA" },
    { name: "Marrocos", code: "MAR" },
    { name: "Haiti", code: "HAI" },
    { name: "Escócia", code: "SCO" },
  ],
  D: [
    { name: "Estados Unidos", code: "USA" },
    { name: "Paraguai", code: "PAR" },
    { name: "Austrália", code: "AUS" },
    { name: "Turquia", code: "TUR" },
  ],
  E: [
    { name: "Alemanha", code: "GER" },
    { name: "Curaçao", code: "CUW" },
    { name: "Costa do Marfim", code: "CIV" },
    { name: "Equador", code: "ECU" },
  ],
  F: [
    { name: "Holanda", code: "NED" },
    { name: "Japão", code: "JPN" },
    { name: "Suécia", code: "SWE" },
    { name: "Tunísia", code: "TUN" },
  ],
  G: [
    { name: "Bélgica", code: "BEL" },
    { name: "Egito", code: "EGY" },
    { name: "Irã", code: "IRN" },
    { name: "Nova Zelândia", code: "NZL" },
  ],
  H: [
    { name: "Espanha", code: "ESP" },
    { name: "Cabo Verde", code: "CPV" },
    { name: "Arábia Saudita", code: "KSA" },
    { name: "Uruguai", code: "URU" },
  ],
  I: [
    { name: "França", code: "FRA" },
    { name: "Senegal", code: "SEN" },
    { name: "Iraque", code: "IRQ" },
    { name: "Noruega", code: "NOR" },
  ],
  J: [
    { name: "Argentina", code: "ARG" },
    { name: "Argélia", code: "ALG" },
    { name: "Áustria", code: "AUT" },
    { name: "Jordânia", code: "JOR" },
  ],
  K: [
    { name: "Portugal", code: "POR" },
    { name: "Congo", code: "COD" },
    { name: "Uzbequistão", code: "UZB" },
    { name: "Colômbia", code: "COL" },
  ],
  L: [
    { name: "Inglaterra", code: "ENG" },
    { name: "Croácia", code: "CRO" },
    { name: "Gana", code: "GHA" },
    { name: "Panamá", code: "PAN" },
  ],
};

export const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"] as const;
export const FIGURINHAS_PER_COUNTRY = 21; // 0-20

export function getCountriesByGroup(group: string) {
  return STICKERS_DATA[group as keyof typeof STICKERS_DATA] || [];
}

export function getAllCountries() {
  return Object.values(STICKERS_DATA).flat();
}

export function getCountryByCode(code: string) {
  return getAllCountries().find((c) => c.code === code);
}

export function getGroupByCountryCode(code: string) {
  for (const [group, countries] of Object.entries(STICKERS_DATA)) {
    if (countries.some((c) => c.code === code)) {
      return group;
    }
  }
  return null;
}
