import { Skeleton } from '@/components/ui/skeleton';

export function WatchlistLoadingState() {
	return (
		<div className="mt-8 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
			<div className="space-y-4">
				<Skeleton className="h-24 rounded-xl" />
				<Skeleton className="h-24 rounded-xl" />
				<Skeleton className="h-40 rounded-xl" />
			</div>
			<div className="space-y-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<Skeleton key={index} className="h-32 rounded-xl" />
				))}
			</div>
		</div>
	);
}
