// api/booksApi.ts
import axios from "axios";
import { BookDetailEntity } from "@/entities/BookDetailEntity";
import { BookEntity } from "@/entities/Book";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export const getBooks = async (): Promise<BookEntity[]> => {
	const res = await axios.get(BASE_URL);
	return res.data["data"]["books"];
};

export const getBookDetail = async (id: string): Promise<BookDetailEntity> => {
	const res = await axios.get(`${BASE_URL}/${id}`);
	return res.data["data"]["book"];
};

export const createBook = async (book: BookDetailEntity): Promise<string> => {
	const res = await axios.post(BASE_URL, book);
	return res.data["data"]["bookId"];
};

export const updateBook = async (
	id: string,
	book: BookDetailEntity
): Promise<void> => {
	const res = await axios.put(`${BASE_URL}/${id}`, book);
	return res.data;
};

export const deleteBook = async (id: string): Promise<void> => {
	await axios.delete(`${BASE_URL}/${id}`);
};
