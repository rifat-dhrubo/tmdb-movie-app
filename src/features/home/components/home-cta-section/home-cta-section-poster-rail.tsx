import { HomeCtaSectionPosterSegment } from './home-cta-section-poster-segment';
import type { PosterSource } from './types';

import { ctaPosterSizeClasses } from '@/features/home/lib/poster-sizes';
import type { CtaPosterSize } from '@/features/home/lib/poster-sizes';
import { cn } from '@/lib/utils';

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
	size: CtaPosterSize;
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
	const sizeClass = ctaPosterSizeClasses[size];
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
