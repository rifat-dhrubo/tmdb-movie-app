import { Link } from '@tanstack/react-router';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import React from 'react';

import { Icon } from '@/components/icon';
import { Spacer } from '@/components/spacer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { NoiseBackground } from '@/components/ui/noise-background';
import { Skeleton } from '@/components/ui/skeleton';
import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';
import { cn } from '@/lib/utils';

const movieCardVariants = cva(
	'group relative flex shrink-0 flex-col overflow-hidden rounded-sm border-r-2 border-l-2 border-dashed border-border shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl',
	{
		variants: {
			size: {
				sm: 'w-32 md:w-36',
				md: 'w-36 md:w-40',
				lg: 'w-44 md:w-48',
				xl: 'w-52 md:w-56',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
);

type MovieCardSize = 'sm' | 'md' | 'lg' | 'xl';

interface MovieCardProps extends Omit<
	VariantProps<typeof movieCardVariants>,
	'size'
> {
	id: number;
	title: string;
	posterPath: string;
	rating: number;
	director: string;
	year: number;
	genres: Array<string>;
	catalogNumber?: string;
	onAddToWatchlist: () => void;
	isLoading?: boolean;
	size?: MovieCardSize;
}

const ticketConfig = {
	sm: {
		posterClass: 'aspect-[2/3]',
		stubClass: 'h-[100px]',
		titleSize: 'text-sm',
		padding: 'p-2.5',
		imageSize: 'w185' as const,
	},
	md: {
		posterClass: 'aspect-[2/3]',
		stubClass: 'h-[110px]',
		titleSize: 'text-base',
		padding: 'p-3',
		imageSize: 'w342' as const,
	},
	lg: {
		posterClass: 'aspect-[2/3]',
		stubClass: 'h-[130px]',
		titleSize: 'text-lg',
		padding: 'p-4',
		imageSize: 'w342' as const,
	},
	xl: {
		posterClass: 'aspect-[2/3]',
		stubClass: 'h-[150px]',
		titleSize: 'text-xl',
		padding: 'p-5',
		imageSize: 'w500' as const,
	},
} as const;

export function MovieCard({
	catalogNumber,
	director,
	genres,
	id,
	onAddToWatchlist,
	posterPath,
	rating,
	size = 'md',
	title,
	year,
}: MovieCardProps) {
	const [isHovered, setIsHovered] = React.useState(false);

	const config = ticketConfig[size];

	const imageUrl = buildTmdbImageUrl({
		type: 'poster',
		path: posterPath,
		size: config.imageSize,
	});

	const displayGenres =
		genres.length > 2
			? `${genres.slice(0, 2).join(' / ')}`
			: genres.join(' / ');

	return (
		<div
			className={cn(movieCardVariants({ size }))}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className={cn('relative overflow-hidden', config.posterClass)}>
				<Image
					alt={`${title} (${year})`}
					aspectRatio="2/3"
					className="transition-transform duration-500 group-hover:scale-105"
					containerClassName="bg-muted"
					decoding="async"
					loading="lazy"
					src={imageUrl ?? undefined}
					fallback={
						<div className="flex h-full flex-col items-center justify-center gap-2 p-4">
							<span className="text-center font-serif text-sm text-muted-foreground">
								{title}
							</span>
						</div>
					}
				/>

				<div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />

				<div className="absolute right-3 bottom-3 flex items-center gap-1 text-background/90 dark:text-foreground">
					<Icon className="size-3" name="star_fill"></Icon>
					<span className="text-sm font-medium">{rating.toFixed(1)}</span>
				</div>

				{catalogNumber ? (
					<div className="absolute top-3 left-3 rounded px-1">
						<span className="font-mono text-[11px] tracking-[0.15em] text-background dark:text-foreground">
							{catalogNumber}
						</span>
					</div>
				) : null}

				<div
					className={cn(
						'absolute top-3 right-3 transition-all duration-300 ease-out',
						isHovered
							? 'translate-y-0 scale-100 opacity-100'
							: '-translate-y-2 scale-90 opacity-0',
					)}
				>
					<Button
						className="rounded-full"
						size="icon"
						title="Add to watchlist"
						type="button"
						variant="default"
						onClick={onAddToWatchlist}
					>
						<Icon className="size-4" name="bookmark_bold" />
					</Button>
				</div>
			</div>

			<div
				className={cn(
					'relative border-t border-dashed border-white/20 bg-stone-900',
					config.stubClass,
					config.padding,
				)}
			>
				<Link
					className="group/title relative w-full text-left"
					params={{ movieId: id }}
					to="/movies/$movieId"
				>
					<h3
						className={cn(
							'line-clamp-1 font-serif tracking-tight text-background dark:text-foreground',
							config.titleSize,
						)}
					>
						{title}
					</h3>
					<span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-primary/60 transition-transform duration-300 ease-out group-hover/title:scale-x-100" />
				</Link>
				<Spacer size={4}></Spacer>

				<div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
					<InfoSection label="dir" value={director} />
					<InfoSection label="year" value={year} />
					<InfoSection label="genre" value={displayGenres} />
				</div>
			</div>
		</div>
	);
}

interface MovieCardInfo {
	label: string;
	value: string | number;
}
function InfoSection({ label, value }: MovieCardInfo) {
	return (
		<>
			<span className="font-mono text-xs tracking-wider text-muted-foreground uppercase dark:text-foreground">
				{label}
			</span>
			<span className="text-xs text-background/80 dark:text-foreground">
				{value}
			</span>
		</>
	);
}

export function MovieCardSkeleton({ size = 'md' }: { size?: MovieCardSize }) {
	const config = ticketConfig[size];

	return (
		<div
			className={cn(
				'relative shrink-0 overflow-hidden rounded-sm border-r-2 border-l-2 border-dashed border-border',
				movieCardVariants({ size }),
			)}
		>
			<NoiseBackground
				gradientColors={[
					'rgb(255, 100, 150)',
					'rgb(100, 150, 255)',
					'rgb(255, 200, 100)',
				]}
			>
				<div
					className={cn(
						'relative overflow-hidden bg-muted',
						config.posterClass,
					)}
				>
					<Skeleton className="absolute inset-0" />
				</div>

				<div
					className={cn(
						'border-t border-dashed border-background/20 bg-foreground',
						config.stubClass,
						config.padding,
					)}
				>
					<Skeleton className="h-6 w-3/4 bg-background/10" />
					<div className="mt-3 space-y-2">
						<div className="flex gap-3">
							<Skeleton className="h-3 w-6 bg-background/10" />
							<Skeleton className="h-4 w-32 bg-background/10" />
						</div>
						<div className="flex gap-3">
							<Skeleton className="h-3 w-8 bg-background/10" />
							<Skeleton className="h-4 w-12 bg-background/10" />
						</div>
						<div className="flex gap-3">
							<Skeleton className="h-3 w-8 bg-background/10" />
							<Skeleton className="h-4 w-24 bg-background/10" />
						</div>
					</div>
				</div>
			</NoiseBackground>
		</div>
	);
}
