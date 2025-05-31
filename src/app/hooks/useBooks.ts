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
		setLoading(true);
		try {
			await booksApi.createBook(book);
			const data = await booksApi.getBooks();
			setBooks(data);
		} catch (err) {
			console.error("Failed to add book:", err);
		} finally {
			setLoading(false);
		}
	};

	const updateBook = async (book: BookDetailEntity) => {
		setLoading(true);
		try {
			await booksApi.updateBook(book.id!, book);
			const data = await booksApi.getBooks();
			setBooks(data);
		} catch (err) {
			console.error("Failed to add books:", err);
		} finally {
			setLoading(false);
		}
	};

	const deleteBook = async (id: string) => {
		setLoading(true);
		try {
			await booksApi.deleteBook(id);
			const data = await booksApi.getBooks();
			setBooks(data);
		} catch (err) {
			console.error("Failed to add books:", err);
		} finally {
			setLoading(false);
		}
	};

	const getBookDetail = async (id: string): Promise<BookDetailEntity> => {
		setLoading(true);
		const data = await booksApi.getBookDetail(id);
		setLoading(false);
		return data;
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
