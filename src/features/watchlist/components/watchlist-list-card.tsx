import { Link } from '@tanstack/react-router';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import type { WatchlistItem } from '@/features/watchlist';
import {
	formatWatchlistStub,
	getWatchlistPosterGradient,
} from '@/features/watchlist';
import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';
import { cn, formatRuntime } from '@/lib/utils';

interface WatchlistListCardProps {
	index: number;
	isRemoving: boolean;
	item: WatchlistItem;
	onRemove: (tmdbId: number) => void;
}

export function WatchlistListCard({
	index,
	isRemoving,
	item,
	onRemove,
}: WatchlistListCardProps) {
	const imageUrl = buildTmdbImageUrl({
		path: item.posterPath ?? null,
		size: 'w342',
		type: 'poster',
	});
	const primaryGenre = item.genres[0]?.name ?? 'Feature';
	const releaseYear = item.releaseYear ?? '----';
	const director = item.displayDirector ?? 'Unknown director';

	return (
		<article className="grid gap-4 rounded-xl border border-border bg-card-dark p-3 text-background shadow-lg transition-all hover:shadow-xl md:grid-cols-[112px_minmax(0,1fr)_auto] md:items-center md:p-4">
			<Link
				className="group relative overflow-hidden rounded-lg border border-border bg-muted"
				params={{ movieId: item.tmdbId }}
				to="/movies/$movieId"
			>
				<div className="relative aspect-[4/3] md:aspect-[3/4]">
					{imageUrl ? (
						<Image
							alt={item.title}
							className="transition-transform duration-500 group-hover:scale-105"
							containerClassName="h-full w-full"
							src={imageUrl}
						/>
					) : (
						<div
							className={cn(
								'h-full w-full bg-gradient-to-br',
								getWatchlistPosterGradient(item.tmdbId),
							)}
						/>
					)}
					<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
					<span className="absolute top-3 left-3 font-mono text-xs tracking-[0.28em] text-background/70 uppercase">
						{formatWatchlistStub(index)}
					</span>
				</div>
			</Link>

			<div className="min-w-0">
				<div className="flex flex-wrap items-center gap-2">
					<Link
						className="font-serif text-2xl leading-none text-background transition-colors hover:text-primary/80"
						params={{ movieId: item.tmdbId }}
						to="/movies/$movieId"
					>
						{item.title}
					</Link>
					<span className="rounded-full border border-border bg-background/10 px-2.5 py-1 text-[11px] tracking-wide text-background/70">
						{primaryGenre}
					</span>
				</div>
				<p className="mt-3 text-sm tracking-[0.14em] text-background/55 uppercase">
					{releaseYear} . {director} .{' '}
					{formatRuntime(item.runtimeMinutes ?? 0) || '-'}
				</p>
			</div>

			<div className="flex items-center justify-between gap-4 border-t border-border pt-3 md:border-t-0 md:pt-0">
				<div className="flex items-center gap-2 font-mono text-lg font-semibold text-background/85">
					<Icon className="size-3.5" name="star_fill" />
					{(item.voteAverage ?? 0).toFixed(1)}
				</div>
				<Button
					className="text-background/60 hover:bg-background/10 hover:text-background"
					disabled={isRemoving}
					size="sm"
					type="button"
					variant="ghost"
					onClick={() => onRemove(item.tmdbId)}
				>
					Remove
				</Button>
			</div>
		</article>
	);
}
