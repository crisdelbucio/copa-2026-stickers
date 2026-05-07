CREATE TABLE `userStickers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`countryCode` varchar(3) NOT NULL,
	`figurinhaNumber` int NOT NULL,
	`status` enum('T','R','F') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userStickers_id` PRIMARY KEY(`id`)
);
