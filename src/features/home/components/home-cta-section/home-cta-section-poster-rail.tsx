import { HomeCtaSectionPosterSegment } from './home-cta-section-poster-segment';
import type { PosterSource } from './types';

import { cn } from '@/lib/utils';

const sizeClasses = {
	sm: 'w-20 lg:w-24 xl:w-28',
	md: 'w-24 lg:w-28 xl:w-32',
} as const;

const directionClasses = {
	forward: 'animate-cta-marquee',
	reverse: 'animate-cta-marquee-reverse',
} as const;

const baseClasses =
	'aspect-2/3 rounded-sm border border-primary-foreground/10 object-cover opacity-75 saturate-[0.88]';

interface HomeCtaSectionPosterRailProps {
	posters: Array<PosterSource>;
	seed: number;
	direction: 'forward' | 'reverse';
	size: 'sm' | 'md';
	className?: string;
	disableAnimation?: boolean;
}

export function HomeCtaSectionPosterRail({
	className,
	direction,
	disableAnimation,
	posters,
	seed,
	size,
}: HomeCtaSectionPosterRailProps) {
	const sizeClass = sizeClasses[size];
	const animationClass = disableAnimation ? '' : directionClasses[direction];
	const imageClassName = cn(baseClasses, sizeClass, className);

	return (
		<div className="overflow-hidden">
			<div className={cn('flex w-max', animationClass)}>
				<HomeCtaSectionPosterSegment
					className={imageClassName}
					posters={posters}
					seed={seed}
				/>
				<HomeCtaSectionPosterSegment
					className={imageClassName}
					posters={posters}
					seed={seed}
				/>
			</div>
		</div>
	);
}
