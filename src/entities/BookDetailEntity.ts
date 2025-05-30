import { z } from "zod";

export const bookSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1, "Name is required"),
	year: z.number().int().min(0),
	author: z.string(),
	summary: z.string(),
	publisher: z.string(),
	pageCount: z.number().int().min(1),
	readPage: z.number().int().min(0),
	finished: z.boolean().optional(), // diisi otomatis berdasarkan readPage === pageCount
	reading: z.boolean(),
	insertedAt: z.string().optional(),
	updatedAt: z.string().optional(),
});

export type BookDetailEntity = z.infer<typeof bookSchema>;
