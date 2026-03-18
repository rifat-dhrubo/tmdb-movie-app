import React from 'react';

import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';

interface PosterCardProps {
	id: number;
	title: string;
	year: number;
	posterPath: string;
	size?: 'sm' | 'md' | 'lg';
}

export function PosterCard({
	posterPath,
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
		size: 'w342',
	});

	const sizeClasses = {
		sm: 'w-28 md:w-32',
		md: 'w-32 md:w-40',
		lg: 'w-40 md:w-48',
	};

	const widthClass = sizeClasses[size];

	return (
		<div className={`group relative flex-shrink-0 ${widthClass}`}>
			<div className="relative overflow-hidden rounded-sm border border-border/40 bg-muted shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-border/60 group-hover:shadow-md">
				{imageState === 'error' ? (
					// Permanent fallback for failed images
					<div className="flex aspect-[2/3] flex-col items-center justify-center gap-2 p-4">
						<svg
							className="size-8 text-muted-foreground/50"
							fill="none"
							stroke="currentColor"
							strokeWidth={1.5}
							viewBox="0 0 24 24"
						>
							<path
								d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
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
							className={`aspect-[2/3] w-full object-cover transition-all duration-500 ${
								imageState === 'loaded' ? 'opacity-100' : 'opacity-0'
							} group-hover:scale-105`}
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
				<p className="text-xs text-muted-foreground">{year}</p>
			</div>
		</div>
	);
}
