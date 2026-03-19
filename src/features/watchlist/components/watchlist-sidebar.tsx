import { WatchlistGenreRow } from './watchlist-genre-row';
import { WatchlistStatCard } from './watchlist-stat-card';

import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import type {
	WatchlistDirection,
	WatchlistGenreStat,
	WatchlistSortBy,
} from '@/features/watchlist';
import { cn, formatRuntime } from '@/lib/utils';

interface WatchlistSidebarProps {
	direction: WatchlistDirection;
	onDirectionChange: (nextDirection: WatchlistDirection) => void;
	onSortChange: (nextSort: WatchlistSortBy) => void;
	sortBy: WatchlistSortBy;
	stats: {
		moviesSaved: number;
		topDecades: Array<{ count: number; decade: number }>;
		topGenres: Array<WatchlistGenreStat>;
		totalRuntimeMinutes: number;
	};
}

const sortOptions: Array<{ label: string; value: WatchlistSortBy }> = [
	{ label: 'Date added', value: 'added' },
	{ label: 'Rating', value: 'rating' },
	{ label: 'Year', value: 'year' },
];

export function WatchlistSidebar({
	direction,
	onDirectionChange,
	onSortChange,
	sortBy,
	stats,
}: WatchlistSidebarProps) {
	const isAscending = direction === 'asc';

	return (
		<aside className="space-y-6 lg:sticky lg:top-24">
			<div>
				<p className="text-xs font-medium tracking-[0.28em] text-muted-foreground uppercase">
					Collection
				</p>
				<h2 className="mt-2 font-serif text-3xl text-foreground">Watchlist</h2>
			</div>

			<div className="space-y-3">
				<WatchlistStatCard
					label="Films saved"
					value={String(stats.moviesSaved).padStart(3, '0')}
				/>
				<WatchlistStatCard
					label="Total runtime"
					value={formatRuntime(stats.totalRuntimeMinutes) || '0m'}
				/>
			</div>

			<section>
				<p className="text-xs font-medium tracking-[0.28em] text-muted-foreground uppercase">
					Top genres
				</p>
				<div className="mt-4 space-y-3">
					{stats.topGenres.map((genre, index) => (
						<WatchlistGenreRow
							key={`${genre.name}-${genre.id ?? index}`}
							count={genre.count}
							name={genre.name}
						/>
					))}
				</div>
			</section>

			<section>
				<p className="text-xs font-medium tracking-[0.28em] text-muted-foreground uppercase">
					Top decades
				</p>
				<div className="mt-4 flex flex-wrap gap-2">
					{stats.topDecades.map((decade) => (
						<Badge key={decade.decade} variant="secondary">
							{decade.decade}&apos;s . {decade.count}
						</Badge>
					))}
				</div>
			</section>

			<section>
				<p className="text-xs font-medium tracking-[0.28em] text-muted-foreground uppercase">
					Sort by
				</p>
				<div className="mt-4 space-y-2">
					{sortOptions.map((option) => (
						<button
							key={option.value}
							className="flex w-full items-center gap-3 rounded-full px-1 py-1 text-left text-sm text-foreground transition-colors hover:text-primary"
							type="button"
							onClick={() => onSortChange(option.value)}
						>
							<span
								className={cn(
									'flex size-4 items-center justify-center rounded-full border border-border',
									sortBy === option.value && 'border-primary',
								)}
							>
								<span
									className={cn(
										'size-2 rounded-full bg-primary opacity-0 transition-opacity',
										sortBy === option.value && 'opacity-100',
									)}
								/>
							</span>
							{option.label}
						</button>
					))}
				</div>

				<div className="mt-4 flex items-center justify-between">
					<span className="text-sm text-muted-foreground">
						{isAscending ? 'Ascending' : 'Descending'}
					</span>
					<Switch
						checked={isAscending}
						onCheckedChange={(checked) =>
							onDirectionChange(checked ? 'asc' : 'desc')
						}
					/>
				</div>
			</section>
		</aside>
	);
}
