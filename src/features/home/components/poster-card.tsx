import React from 'react';

import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';
import { cn } from '@/lib/utils';

interface PosterCardProps {
	id: number;
	title: string;
	year: number;
	posterPath: string;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	rating?: number;
}

export function PosterCard({
	posterPath,
	rating,
	size = 'md',
	title,
	year,
}: PosterCardProps) {
	const [imageState, setImageState] = React.useState<
		'loading' | 'loaded' | 'error'
	>('loading');

	const imageUrl = buildTmdbImageUrl({
		type: 'poster',
		path: posterPath,
		size: size === 'xl' ? 'w500' : 'w342',
	});

	const sizeClasses = {
		sm: 'w-28 md:w-32',
		md: 'w-32 md:w-40',
		lg: 'w-40 md:w-48',
		xl: 'w-44 md:w-56',
	};

	const widthClass = sizeClasses[size];

	return (
		<div className={cn('group relative flex-shrink-0', widthClass)}>
			<div className="relative overflow-hidden rounded-md border border-border/50 bg-muted shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:border-border/70 group-hover:shadow-xl group-hover:shadow-black/5">
				{imageState === 'error' ? (
					// Permanent fallback for failed images
					<div className="flex aspect-[2/3] flex-col items-center justify-center gap-2 p-4">
						<span className="text-center text-xs text-muted-foreground">
							{title}
						</span>
					</div>
				) : (
					<>
						{/* Loading skeleton */}
						{imageState === 'loading' ? (
							<div className="absolute inset-0 aspect-[2/3] w-full animate-pulse bg-muted" />
						) : null}
						<img
							alt={`${title} (${year})`}
							decoding="async"
							loading="lazy"
							src={imageUrl ?? undefined}
							className={cn(
								'aspect-[2/3] w-full object-cover transition-all duration-500 group-hover:scale-110',
								imageState === 'loaded' ? 'opacity-100' : 'opacity-0',
							)}
							onError={() => setImageState('error')}
							onLoad={() => setImageState('loaded')}
						/>
						{/* Hover overlay gradient */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
					</>
				)}
			</div>
			<div className="mt-3">
				<p className="line-clamp-2 min-h-[2.5rem] text-sm leading-tight font-medium transition-colors group-hover:text-primary">
					{title}
				</p>
				<div className="flex items-center justify-between">
					<p className="text-xs text-muted-foreground">{year}</p>
					{rating ? (
						<div className="flex items-center gap-1">
							<span className="text-xs text-yellow-500">★</span>
							<span className="text-xs font-medium">{rating.toFixed(1)}</span>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
