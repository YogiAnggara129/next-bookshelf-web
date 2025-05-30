"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookDetailEntity, bookSchema } from "@/entities/BookDetailEntity";
import { Dialog } from "@headlessui/react";

type Props = {
	mode: "add" | "edit" | "view" | null;
	defaultValues?: BookDetailEntity;
	onSubmit: (data: BookDetailEntity) => void;
};

const BookForm: React.FC<Props> = ({ mode, defaultValues, onSubmit }) => {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<BookDetailEntity>({
		resolver: zodResolver(bookSchema),
		defaultValues: defaultValues ?? {},
	});

	const readPage = watch("readPage");
	const pageCount = watch("pageCount");

	React.useEffect(() => {
		setValue("finished", readPage === pageCount);
	}, [readPage, pageCount, setValue]);

	const isView = mode === "view";

	const isOpen = mode !== null;

	// Internal state untuk kontrol modal (tapi bakal ada desync kalau parent gak tau)
	const [open, setOpen] = React.useState(isOpen);

	React.useEffect(() => {
		setOpen(isOpen);
	}, [isOpen]);

	// Close modal internal (hanya tutup modal, parent gak tahu)
	const handleClose = () => {
		setOpen(false);
	};

	if (!open) return null;

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			className='fixed inset-0 z-50 flex items-center justify-center'
		>
			<div className='fixed inset-0 bg-black/30' aria-hidden='true' />
			<div className='bg-white rounded-xl shadow-lg w-full max-w-md p-6 z-10 relative'>
				<Dialog.Title className='text-lg font-semibold mb-4 capitalize'>
					{mode} Book
				</Dialog.Title>
				<button
					type='button'
					onClick={handleClose}
					className='absolute top-3 right-3 text-gray-500 hover:text-gray-700'
					aria-label='Close modal'
				>
					✕
				</button>

				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<input
						{...register("name")}
						placeholder='Book Name'
						disabled={isView}
						className='w-full px-4 py-2 border rounded text-sm'
					/>
					{errors.name && (
						<p className='text-xs text-red-500'>{errors.name.message}</p>
					)}

					<input
						type='number'
						{...register("year", { valueAsNumber: true })}
						placeholder='Year'
						disabled={isView}
						className='w-full px-4 py-2 border rounded text-sm'
					/>

					<input
						{...register("author")}
						placeholder='Author'
						disabled={isView}
						className='w-full px-4 py-2 border rounded text-sm'
					/>

					<input
						{...register("publisher")}
						placeholder='Publisher'
						disabled={isView}
						className='w-full px-4 py-2 border rounded text-sm'
					/>

					<textarea
						{...register("summary")}
						placeholder='Summary'
						disabled={isView}
						className='w-full px-4 py-2 border rounded text-sm'
					/>

					<input
						type='number'
						{...register("pageCount", { valueAsNumber: true })}
						placeholder='Page Count'
						disabled={isView}
						className='w-full px-4 py-2 border rounded text-sm'
					/>

					<input
						type='number'
						{...register("readPage", { valueAsNumber: true })}
						placeholder='Read Page'
						disabled={isView}
						className='w-full px-4 py-2 border rounded text-sm'
					/>

					<label className='flex items-center gap-2 text-sm'>
						<input type='checkbox' {...register("reading")} disabled={isView} />
						Reading
					</label>

					{!isView && (
						<button
							type='submit'
							className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm'
						>
							{mode === "add" ? "Add Book" : "Save Changes"}
						</button>
					)}
				</form>
			</div>
		</Dialog>
	);
};

export default BookForm;
