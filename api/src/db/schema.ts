import {
	doublePrecision,
	integer,
	pgTable,
	text,
	varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';

export const productsTable = pgTable('products', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
	image: varchar({ length: 255 }),
	price: doublePrecision().notNull(),
});

export const createProductSchema = createInsertSchema(productsTable);

export const updateProductSchema = createUpdateSchema(productsTable);

export const usersTable = pgTable('users', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }).notNull(),
	role: varchar({ length: 255 }).notNull().default('user'),

	name: varchar({ length: 255 }),
	address: text(),
});

export const createUserSchema = createInsertSchema(usersTable).omit({
	role: true,
});

export const loginSchema = createInsertSchema(usersTable).pick({
	email: true,
	password: true,
});

export const updateUserSchema = createUpdateSchema(usersTable);
