// components/BookFormSkeleton.tsx
export default function BookFormSkeleton() {
	const fieldStyle = "h-4 bg-gray-200 rounded w-full mb-4 animate-pulse";

	return (
		<div className='space-y-4 p-4'>
			<div className='h-6 bg-gray-300 rounded w-1/3 animate-pulse' />{" "}
			{/* Title */}
			<div className={fieldStyle} />
			<div className={fieldStyle} />
			<div className={fieldStyle} />
			<div className={fieldStyle} />
			<div className={fieldStyle} />
			<div className={fieldStyle} />
			<div className={fieldStyle} />
			<div className='flex items-center gap-4'>
				<div className='w-1/4 h-4 bg-gray-200 rounded animate-pulse' />
				<div className='w-1/4 h-4 bg-gray-200 rounded animate-pulse' />
			</div>
		</div>
	);
}
