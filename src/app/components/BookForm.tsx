import { BookDetailEntity } from "@/entities/BookDetailEntity";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
	mode: "add" | "edit" | "view";
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
		defaultValues,
	});

	const isReadOnly = mode === "view";
	const readPage = watch("readPage");
	const pageCount = watch("pageCount");

	useEffect(() => {
		if (!isReadOnly && pageCount != null && readPage != null) {
			setValue("finished", readPage === pageCount);
		}
	}, [readPage, pageCount, setValue, isReadOnly]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4 text-gray-900'>
			<div>
				<label className='block text-sm font-semibold mb-1'>Name</label>
				<input
					{...register("name", { required: true })}
					className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
					readOnly={isReadOnly}
				/>
				{errors.name && <span className='text-sm text-red-600'>Required</span>}
			</div>

			<div>
				<label className='block text-sm font-semibold mb-1'>Author</label>
				<input
					{...register("author", { required: true })}
					className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
					readOnly={isReadOnly}
				/>
			</div>

			<div>
				<label className='block text-sm font-semibold mb-1'>Publisher</label>
				<input
					{...register("publisher", { required: true })}
					className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
					readOnly={isReadOnly}
				/>
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<div>
					<label className='block text-sm font-semibold mb-1'>Year</label>
					<input
						type='number'
						{...register("year", { valueAsNumber: true, required: true })}
						className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
						readOnly={isReadOnly}
					/>
				</div>

				<div>
					<label className='block text-sm font-semibold mb-1'>Page Count</label>
					<input
						type='number'
						{...register("pageCount", { valueAsNumber: true, required: true })}
						className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
						readOnly={isReadOnly}
					/>
				</div>
			</div>

			<div>
				<label className='block text-sm font-semibold mb-1'>Read Page</label>
				<input
					type='number'
					{...register("readPage", {
						valueAsNumber: true,
						required: true,
						validate: (value) =>
							value <= pageCount || "Read page cannot be more than page count",
					})}
					className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
					readOnly={isReadOnly}
				/>
				{errors.readPage && (
					<span className='text-sm text-red-600'>
						{errors.readPage.message}
					</span>
				)}
			</div>

			<div>
				<label className='block text-sm font-semibold mb-1'>Summary</label>
				<textarea
					{...register("summary")}
					className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
					readOnly={isReadOnly}
				/>
			</div>

			<div className='flex gap-4'>
				<label className='flex items-center gap-2 text-sm font-semibold'>
					<input
						type='checkbox'
						{...register("reading")}
						disabled={isReadOnly}
					/>
					Reading
				</label>
				<label className='flex items-center gap-2 text-sm font-semibold'>
					<input type='checkbox' {...register("finished")} disabled />
					Finished
				</label>
			</div>

			{mode !== "view" && (
				<button
					type='submit'
					className='bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition-colors'
				>
					{mode === "add" ? "Add Book" : "Update Book"}
				</button>
			)}
		</form>
	);
};

export default BookForm;
