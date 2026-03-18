import React from 'react';

import { Icon } from '@/components/icon';
import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';
import { cn } from '@/lib/utils';

interface MovieCardProps {
	id: number;
	title: string;
	posterPath: string;
	rating: number;
	director: string;
	year: number;
	genres: Array<string>;
	catalogNumber?: string;
	onTitleClick: () => void;
	onAddToWatchlist: () => void;
	isLoading?: boolean;
}

export function MovieCard({
	catalogNumber,
	director,
	genres,
	onAddToWatchlist,
	onTitleClick,
	posterPath,
	rating,
	title,
	year,
}: Omit<MovieCardProps, 'id'>) {
	const [isHovered, setIsHovered] = React.useState(false);

	const imageUrl = buildTmdbImageUrl({
		type: 'poster',
		path: posterPath,
		size: 'w342',
	});

	const displayGenres =
		genres.length > 2
			? `${genres.slice(0, 2).join(' / ')} ...`
			: genres.join(' / ');

	return (
		<div
			className="group relative w-full"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Poster Section */}
			<div className="relative overflow-hidden rounded-t-md">
				<Image
					alt={`${title} (${year})`}
					aspectRatio="2/3"
					className="group-hover:scale-105"
					containerClassName="bg-muted"
					decoding="async"
					loading="lazy"
					src={imageUrl ?? undefined}
					fallback={
						<div className="flex h-full flex-col items-center justify-center gap-2 p-4">
							<span className="text-center text-xs text-muted-foreground">
								{title}
							</span>
						</div>
					}
				/>

				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

				{/* Catalog Number */}
				{catalogNumber ? (
					<div className="absolute top-3 left-3">
						<span className="font-mono text-xs text-white/80">
							{catalogNumber}
						</span>
					</div>
				) : null}

				{/* Rating */}
				<div className="absolute right-3 bottom-3 flex items-center gap-1">
					<span className="text-xs text-white/90">★</span>
					<span className="text-sm font-medium text-white">
						{rating.toFixed(1)}
					</span>
				</div>

				{/* Watchlist Button */}
				<div
					className={cn(
						'absolute top-3 right-3 transition-all duration-200',
						isHovered
							? 'translate-y-0 opacity-100'
							: '-translate-y-2 opacity-0',
					)}
				>
					<button
						className="motion-pressable flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
						title="Add to watchlist"
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onAddToWatchlist();
						}}
					>
						<Icon className="size-4" name="bookmark_bold" />
					</button>
				</div>
			</div>

			{/* Info Panel */}
			<div className="rounded-b-md border border-t-0 border-border/50 bg-card p-4">
				{/* Title with underline animation */}
				<button
					className="group/title relative w-full text-left"
					type="button"
					onClick={onTitleClick}
				>
					<h3 className="line-clamp-1 font-serif text-lg tracking-tight text-card-foreground">
						{title}
					</h3>
					<span className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover/title:scale-x-100" />
				</button>

				{/* Metadata Grid */}
				<div className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
					<span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
						DIR
					</span>
					<span className="line-clamp-1 text-sm text-card-foreground">
						{director}
					</span>

					<span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
						YEAR
					</span>
					<span className="text-sm text-card-foreground">{year}</span>

					<span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
						GENRE
					</span>
					<span className="line-clamp-1 text-sm text-card-foreground">
						{displayGenres}
					</span>
				</div>
			</div>
		</div>
	);
}

export function MovieCardSkeleton() {
	return (
		<div className="w-full">
			{/* Poster Skeleton */}
			<div className="relative aspect-[2/3] overflow-hidden rounded-t-md bg-muted">
				<Skeleton className="absolute inset-0" />
			</div>

			{/* Info Panel Skeleton */}
			<div className="rounded-b-md border border-t-0 border-border/50 bg-card p-4">
				<Skeleton className="h-6 w-3/4" />
				<div className="mt-3 space-y-2">
					<div className="flex gap-4">
						<Skeleton className="h-3 w-6" />
						<Skeleton className="h-4 w-32" />
					</div>
					<div className="flex gap-4">
						<Skeleton className="h-3 w-8" />
						<Skeleton className="h-4 w-12" />
					</div>
					<div className="flex gap-4">
						<Skeleton className="h-3 w-8" />
						<Skeleton className="h-4 w-24" />
					</div>
				</div>
			</div>
		</div>
	);
}
