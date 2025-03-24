CREATE TABLE `gangs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`location` varchar(255) NOT NULL,
	`members` int NOT NULL,
	`created_at` timestamp NOT NULL,
	`updated_at` timestamp NOT NULL,
	`is_active` tinyint DEFAULT 1,
	CONSTRAINT `gangs_id` PRIMARY KEY(`id`)
);
