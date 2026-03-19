import { Skeleton } from '@/components/ui/skeleton';

export function CastDetailSkeleton() {
	return (
		<div className="space-y-4">
			<div className="flex gap-4 overflow-hidden">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="shrink-0">
						<Skeleton className="h-48 w-32 rounded-sm" />
						<div className="mt-2 space-y-1">
							<Skeleton className="h-4 w-28" />
							<Skeleton className="h-3 w-20" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
