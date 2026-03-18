import { Skeleton } from '@/components/ui/skeleton';

interface PosterSkeletonProps {
	count?: number;
}

export function PosterSkeleton({ count = 6 }: PosterSkeletonProps) {
	return (
		<>
			{Array.from({ length: count }).map((_, i) => (
				<div key={i} className="flex flex-col">
					<div className="relative aspect-[2/3] overflow-hidden rounded-sm border border-border/40">
						<Skeleton className="absolute inset-0" />
					</div>
					<Skeleton className="mt-2 h-4 w-3/4" />
					<div className="mt-2 flex gap-2">
						<Skeleton className="h-7 flex-1" />
						<Skeleton className="h-7 w-20" />
					</div>
				</div>
			))}
		</>
	);
}
