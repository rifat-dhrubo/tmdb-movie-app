import { Link } from '@tanstack/react-router';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import React from 'react';

import { Icon } from '@/components/icon';
import { MovieCardStampOverlay } from '@/components/movie-card-stamp-overlay';
import { Spacer } from '@/components/spacer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';
import { cn } from '@/lib/utils';

const movieCardVariants = cva(
	'movie-card group relative flex shrink-0 flex-col overflow-hidden rounded-sm border-r-2 border-l-2 border-dashed border-border shadow-xl',
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
	posterPath: string | null;
	rating: number;
	director?: string;
	year: number;
	genres?: Array<string>;
	catalogNumber?: string;
	isPending?: boolean;
	isSaved?: boolean;
	onToggleWatchlist: () => void;
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
	isPending = false,
	isSaved = false,
	onToggleWatchlist,
	posterPath,
	rating,
	size = 'md',
	title,
	year,
}: MovieCardProps) {
	const [showStamp, setShowStamp] = React.useState(false);
	const previousSavedRef = React.useRef(isSaved);

	React.useEffect(() => {
		if (isSaved && !previousSavedRef.current) {
			setShowStamp(true);
		}
		previousSavedRef.current = isSaved;
	}, [isSaved]);

	function handleStampComplete() {
		setShowStamp(false);
	}

	const config = ticketConfig[size];

	const imageUrl = buildTmdbImageUrl({
		type: 'poster',
		path: posterPath,
		size: config.imageSize,
	});

	function getDisplayGenres(genreList: Array<string> | undefined): string {
		if (!genreList || genreList.length === 0) {
			return '-';
		}
		if (genreList.length > 2) {
			return genreList.slice(0, 2).join(' / ');
		}
		return genreList.join(' / ');
	}

	const displayGenres = getDisplayGenres(genres);

	return (
		<div
			data-saved={isSaved}
			className={cn(
				movieCardVariants({ size }),
				'cursor-pointer',
				isSaved && 'border-primary border-r-primary border-l-primary shadow-sm',
			)}
		>
			<Link
				aria-label={`Open details for ${title}`}
				className="absolute inset-0 z-10 rounded-sm focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-hidden"
				params={{ movieId: id }}
				to="/movie/$movieId"
			>
				<span className="sr-only">Open details for {title}</span>
			</Link>

			<div className={cn('relative overflow-hidden', config.posterClass)}>
				<Image
					alt={`${title} (${year})`}
					aspectRatio="2/3"
					className="movie-card-poster"
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

				<div className="movie-card-veil absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
				<div
					aria-hidden="true"
					className="movie-card-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-2/3 bg-linear-to-r from-transparent via-white/18 to-transparent mix-blend-screen"
				/>

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

				<MovieCardStampOverlay
					visible={showStamp}
					onAnimationComplete={handleStampComplete}
				/>

				<div
					className={cn(
						'movie-card-action absolute top-3 right-3 z-20 md:opacity-0',
						isSaved
							? 'md:translate-y-0 md:scale-100 md:opacity-100'
							: 'md:translate-y-2 md:scale-[0.96] md:opacity-0 md:group-focus-within:translate-y-0 md:group-focus-within:scale-100 md:group-focus-within:opacity-100 md:group-hover:translate-y-0 md:group-hover:scale-100 md:group-hover:opacity-100',
					)}
				>
					<Button
						aria-pressed={isSaved}
						disabled={isPending}
						size="icon"
						title={isSaved ? 'Remove from watchlist' : 'Add to watchlist'}
						type="button"
						variant={isSaved ? 'default' : 'default'}
						aria-label={
							isSaved
								? `Remove ${title} from watchlist`
								: `Add ${title} to watchlist`
						}
						className={cn({
							'bg-primary/50': isSaved,
						})}
						onClick={(event) => {
							event.preventDefault();
							event.stopPropagation();
							onToggleWatchlist();
						}}
					>
						{isPending ? (
							<Icon
								className="size-3.5 animate-spin md:size-4"
								name="spinner_bold"
							/>
						) : isSaved ? (
							<Icon className="size-3.5 md:size-4" name="checks" />
						) : (
							<Icon className="size-3.5 md:size-4" name="bookmark_bold" />
						)}
					</Button>
				</div>
			</div>

			<div
				className={cn(
					'movie-card-stub relative border-t border-dashed border-white/20 bg-linear-to-b from-stone-900 via-stone-900 to-stone-950',
					config.stubClass,
					config.padding,
				)}
			>
				<div className="relative flex items-start justify-between gap-3 pb-1">
					<h3
						className={cn(
							'line-clamp-1 min-w-0 flex-1 font-serif tracking-tight text-background dark:text-foreground',
							config.titleSize,
						)}
					>
						{title}
					</h3>

					<div className="pointer-events-none flex shrink-0 items-center gap-2 self-center text-background/55 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100 dark:text-foreground/60">
						<Icon
							className="size-3.5 transition-transform duration-200 group-focus-within:translate-x-1 group-hover:translate-x-1"
							name="arrow_right_bold"
						/>
					</div>

					<span className="absolute right-0 bottom-0 left-0 h-px origin-right scale-x-0 bg-primary transition-transform duration-200 group-focus-within:origin-left group-focus-within:scale-x-100 group-hover:origin-left group-hover:scale-x-100" />
				</div>
				<Spacer size={4}></Spacer>

				<div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
					{director ? <InfoSection label="dir" value={director} /> : null}
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
			<div
				className={cn('relative overflow-hidden bg-muted', config.posterClass)}
			>
				<Skeleton className="absolute inset-0" />
			</div>

			<div
				className={cn(
					'border-t border-dashed border-border bg-accent',
					config.stubClass,
					config.padding,
				)}
			>
				<Skeleton className="h-6 w-3/4" />
				<div className="mt-3 space-y-2">
					<div className="flex gap-3">
						<Skeleton className="h-3 w-8" />
						<Skeleton className="h-4 w-12" />
					</div>
					<div className="flex gap-3">
						<Skeleton className="h-3 w-8" />
						<Skeleton className="h-4 w-24" />
					</div>
				</div>
			</div>
		</div>
	);
}
