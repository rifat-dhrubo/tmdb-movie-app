import { Skeleton } from '@/components/ui/skeleton';

export function MovieDetailCastSkeleton() {
	return (
		<div>
			<div className="flex items-center justify-between">
				<Skeleton className="h-8 w-16" />
				<Skeleton className="h-4 w-32" />
			</div>

			<div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
				{Array.from({ length: 10 }).map((_, i) => (
					<div key={i} className="flex-shrink-0">
						<Skeleton className="size-16 rounded-full md:size-20" />
						<div className="mt-2 w-16 space-y-1 md:w-20">
							<Skeleton className="mx-auto h-3 w-14" />
							<Skeleton className="mx-auto h-2 w-10" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
