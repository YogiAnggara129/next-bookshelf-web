// hooks/useBooks.ts
import { useEffect, useState, useCallback } from "react";
import { BookDetailEntity } from "@/entities/BookDetailEntity";
import * as booksApi from "@/api/booksApi";
import { BookEntity } from "@/entities/Book";

export const useBooks = () => {
	const [books, setBooks] = useState<BookEntity[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchBooks = useCallback(async () => {
		setLoading(true);
		try {
			const data = await booksApi.getBooks();
			setBooks(data);
		} catch (err) {
			console.error("Failed to fetch books:", err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchBooks();
	}, [fetchBooks]);

	const addBook = async (book: BookDetailEntity) => {
		await booksApi.createBook(book);
		const data = await booksApi.getBooks();
		setBooks(data);
	};

	const updateBook = async (book: BookDetailEntity) => {
		const updated = await booksApi.updateBook(book.id!, book);
		setBooks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
	};

	const deleteBook = async (id: string) => {
		await booksApi.deleteBook(id);
		setBooks((prev) => prev.filter((b) => b.id !== id));
	};

	const getBookDetail = async (id: string): Promise<BookDetailEntity> => {
		return await booksApi.getBookDetail(id);
	};

	return {
		books,
		loading,
		fetchBooks,
		addBook,
		updateBook,
		deleteBook,
		getBookDetail,
	};
};
