import { Skeleton } from '@/components/ui/skeleton';

export function MovieDetailTechnicalSkeleton() {
	return (
		<div>
			<Skeleton className="mb-6 h-8 w-24" />

			<div className="rounded-sm border border-border">
				{Array.from({ length: 5 }).map((_, index) => (
					<div
						key={index}
						className={`grid grid-cols-2 ${
							index !== 4 ? 'border-b border-border' : ''
						}`}
					>
						{/* Left column */}
						<div className="flex items-center justify-between border-r border-border px-4 py-3">
							<Skeleton className="h-3 w-20" />
							<Skeleton className="h-4 w-24" />
						</div>

						{/* Right column */}
						<div className="flex items-center justify-between px-4 py-3">
							<Skeleton className="h-3 w-20" />
							<Skeleton className="h-4 w-24" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
