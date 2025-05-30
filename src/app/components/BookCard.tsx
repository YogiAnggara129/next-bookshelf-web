import React from "react";
import { BookDetailEntity } from "@/entities/BookDetailEntity";

type Props = {
	book: BookDetailEntity;
	onView: (id: string) => void;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
};

const BookCard: React.FC<Props> = ({ book, onView, onEdit, onDelete }) => {
	return (
		<div className='bg-white p-4 rounded shadow-md border'>
			<h2 className='text-lg font-semibold text-gray-800 mb-1'>{book.name}</h2>
			<p className='text-sm text-gray-600 mb-2'>by {book.publisher}</p>
			<div className='flex gap-2 mt-2'>
				<button
					onClick={() => onView(book.id!)}
					className='text-blue-600 hover:underline text-sm'
				>
					View
				</button>
				<button
					onClick={() => onEdit(book.id!)}
					className='text-yellow-600 hover:underline text-sm'
				>
					Edit
				</button>
				<button
					onClick={() => onDelete(book.id!)}
					className='text-red-600 hover:underline text-sm'
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default BookCard;
