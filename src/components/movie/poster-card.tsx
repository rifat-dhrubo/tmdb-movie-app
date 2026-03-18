import React from 'react';

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
					<svg className="size-3" fill="currentColor" viewBox="0 0 20 20">
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
					</svg>
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
						<svg
							className="size-4"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							viewBox="0 0 24 24"
						>
							<path
								d="M12 4v16m8-8H4"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
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
