import React from 'react';

import { Icon } from '@/components/icon';
import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';

interface PosterCardProps {
	id: number;
	isSaved?: boolean;
	onToggleSave?: (id: number) => void;
	onViewDetails?: (id: number) => void;
	posterPath: string | null;
	rating: number;
	title: string;
	year: number;
}

function getGradientFromId(id: number): string {
	const gradients = [
		'from-rose-400/30 to-orange-300/30',
		'from-violet-400/30 to-purple-300/30',
		'from-emerald-400/30 to-teal-300/30',
		'from-amber-400/30 to-yellow-300/30',
		'from-cyan-400/30 to-sky-300/30',
		'from-fuchsia-400/30 to-pink-300/30',
	];
	return gradients[id % gradients.length] ?? gradients[0];
}

export function PosterCard({
	id,
	isSaved = false,
	onToggleSave,
	onViewDetails,
	posterPath,
	rating,
	title,
	year,
}: PosterCardProps) {
	const [imageState, setImageState] = React.useState<
		'loading' | 'loaded' | 'error'
	>('loading');

	const imageUrl = buildTmdbImageUrl({
		path: posterPath,
		size: 'w342',
		type: 'poster',
	});

	const gradientClass = getGradientFromId(id);
	const isLoading = imageState === 'loading' && posterPath && imageUrl;

	return (
		<div className="group relative flex flex-col">
			<div
				className={`relative aspect-[2/3] overflow-hidden rounded-sm border border-border/40 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-border/60 group-hover:shadow-md ${
					isLoading ? 'animate-pulse bg-muted' : 'bg-muted'
				}`}
			>
				{/* Gradient fallback */}
				<div
					className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`}
				/>

				{/* Image */}
				{posterPath && imageUrl ? (
					<img
						alt=""
						decoding="async"
						loading="lazy"
						src={imageUrl}
						className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${
							imageState === 'loaded' ? 'opacity-100' : 'opacity-0'
						}`}
						onError={() => setImageState('error')}
						onLoad={() => setImageState('loaded')}
					/>
				) : null}

				{/* Bottom gradient overlay for text legibility */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

				{/* Year overlay - bottom left */}
				<div className="absolute bottom-2 left-2 text-xs font-medium text-white/90 drop-shadow-md">
					{year}
				</div>

				{/* Rating overlay - bottom right */}
				<div className="absolute right-2 bottom-2 flex items-center gap-0.5 text-xs font-medium text-white/90 drop-shadow-md">
					<Icon className="size-3" name="star_fill" />
					{rating.toFixed(1)}
				</div>

				{/* Saved badge - top left */}
				{isSaved ? (
					<div className="absolute top-2 left-2 rounded-sm bg-accent px-1.5 py-0.5 text-[10px] font-medium text-accent-foreground">
						Saved
					</div>
				) : null}

				{/* Add icon on hover - top right */}
				{!isSaved && onToggleSave ? (
					<button
						aria-label={`Add ${title} to watchlist`}
						className="motion-pressable absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-sm backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 hover:bg-background"
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onToggleSave(id);
						}}
					>
						<Icon className="size-4" name="plus_bold" />
					</button>
				) : null}
			</div>

			{/* Title */}
			<h3 className="mt-2 line-clamp-1 text-sm font-medium transition-colors group-hover:text-primary">
				{title}
			</h3>

			{/* Actions */}
			<div className="mt-2 flex gap-2">
				<button
					aria-label={`View details for ${title}`}
					className="motion-pressable flex-1 rounded-sm border border-border/60 bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
					type="button"
					onClick={() => onViewDetails?.(id)}
				>
					Details
				</button>
				<button
					type="button"
					aria-label={
						isSaved
							? `Remove ${title} from watchlist`
							: `Add ${title} to watchlist`
					}
					className={`motion-pressable rounded-sm px-3 py-1.5 text-xs font-medium transition-colors ${
						isSaved
							? 'bg-accent text-accent-foreground hover:bg-accent/80'
							: 'bg-primary text-primary-foreground hover:bg-primary/90'
					}`}
					onClick={() => onToggleSave?.(id)}
				>
					{isSaved ? 'Saved' : '+ Watchlist'}
				</button>
			</div>
		</div>
	);
}
