"use client";
import BookCard from "./components/BookCard";
import { useEffect, useState } from "react";
import BookFormModal from "./components/BookForm";
import { BookDetailEntity } from "@/entities/BookDetailEntity";
import { dummyBooks } from "@/data/bookDummy";

export default function Home() {
	const [books, setBooks] = useState<BookDetailEntity[]>([]);
	const [selectedBook, setSelectedBook] = useState<BookDetailEntity | null>(
		null
	);
	const [modalMode, setModalMode] = useState<"view" | "edit" | "add" | null>(
		null
	);

	useEffect(() => {
		// Simulasi fetch data
		const fetchBooks = async () => {
			// Ganti ini dengan fetch API kalau ada
			const data: BookDetailEntity[] = dummyBooks;
			setBooks(data);
		};

		fetchBooks();
	}, []);
	const openModal = (
		mode: "view" | "edit" | "add",
		book?: BookDetailEntity
	) => {
		setModalMode(mode);
		setSelectedBook(book ?? null);
	};

	const closeModal = () => {
		setModalMode(null);
		setSelectedBook(null);
	};

	const handleSubmit = (data: Partial<BookDetailEntity>) => {
		if (modalMode === "add") {
			const newBook: BookDetailEntity = {
				...(data as BookDetailEntity),
				id: Date.now().toString(), // dummy ID
				insertedAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			setBooks((prev) => [...prev, newBook]);
		} else if (modalMode === "edit" && selectedBook) {
			setBooks((prev) =>
				prev.map((b) =>
					b.id === selectedBook.id
						? { ...b, ...data, updatedAt: new Date().toISOString() }
						: b
				)
			);
		}
		closeModal();
	};

	const handleDelete = (id: string) => {
		const confirm = window.confirm(
			"Are you sure you want to delete this book?"
		);
		if (confirm) {
			setBooks((prev) => prev.filter((b) => b.id !== id));
		}
	};

	return (
		<main className='min-h-screen bg-gray-100 px-6 py-10'>
			<h1 className='text-3xl font-bold text-center text-gray-800 mb-10'>
				Bookshelf
			</h1>

			<button
				onClick={() => openModal("add")}
				className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
			>
				Add Book
			</button>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{books.map((book) => (
					<BookCard
						key={book.id}
						book={book}
						onView={() => openModal("view", book)}
						onEdit={() => openModal("edit", book)}
						onDelete={handleDelete}
					/>
				))}
			</div>

			{modalMode && (
				<BookFormModal
					mode={modalMode}
					defaultValues={selectedBook ?? undefined}
					onSubmit={handleSubmit}
				/>
			)}
		</main>
	);
}
