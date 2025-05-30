"use client";
import BookCard from "./components/BookCard";
import { BookDetailEntity } from "@/entities/BookDetailEntity";
import BookForm from "./components/BookForm";
import { Dialog } from "@headlessui/react";
import { useBooks } from "./hooks/useBooks";
import { useState } from "react";

export default function Home() {
	const {
		books,
		loading,
		fetchBooks,
		addBook,
		updateBook,
		deleteBook,
		getBookDetail,
	} = useBooks();

	const [formMode, setFormMode] = useState<"add" | "edit" | "view" | null>(
		null
	);
	const closeModal = () => {
		setFormMode(null);
		setSelectedBook(undefined);
	};

	const [selectedBook, setSelectedBook] = useState<
		BookDetailEntity | undefined
	>();

	const handleAdd = () => {
		setSelectedBook(undefined);
		setFormMode("add");
	};

	const handleEdit = async (id: string) => {
		const book = await getBookDetail(id);
		console.log(book);
		setSelectedBook(book);
		setFormMode("edit");
	};

	const handleView = async (id: string) => {
		const book = await getBookDetail(id);
		setSelectedBook(book);
		setFormMode("view");
	};

	const handleDelete = async (id: string) => {
		await deleteBook(id);
		fetchBooks();
	};

	const handleSubmit = async (data: BookDetailEntity) => {
		if (formMode === "edit" && data.id) {
			await updateBook(data);
		} else {
			await addBook(data);
		}
		closeModal();
		fetchBooks();
	};

	return (
		<main className='min-h-screen bg-gray-100 px-6 py-10'>
			<h1 className='text-3xl font-bold text-center text-gray-800 mb-10'>
				Bookshelf
			</h1>

			<button
				onClick={handleAdd}
				className='bg-green-600 text-white px-4 py-2 rounded mb-4'
			>
				+ Add Book
			</button>

			{loading ? (
				<p className='text-gray-500'>Loading books...</p>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{books.map((book) => (
						<BookCard
							key={book.id}
							book={book}
							onEdit={handleEdit}
							onView={handleView}
							onDelete={handleDelete}
						/>
					))}
				</div>
			)}

			<Dialog
				open={formMode !== null}
				onClose={closeModal}
				className='relative z-50'
			>
				<div className='fixed inset-0 bg-black/30' aria-hidden='true' />
				<div className='fixed inset-0 flex items-center justify-center'>
					<Dialog.Panel className='bg-white p-6 rounded-xl w-full max-w-md shadow-xl relative'>
						<button
							onClick={closeModal}
							className='absolute top-3 right-3 text-gray-500 hover:text-gray-700'
						>
							✕
						</button>
						<BookForm
							mode={formMode!}
							defaultValues={selectedBook}
							onSubmit={handleSubmit}
						/>
					</Dialog.Panel>
				</div>
			</Dialog>
		</main>
	);
}
