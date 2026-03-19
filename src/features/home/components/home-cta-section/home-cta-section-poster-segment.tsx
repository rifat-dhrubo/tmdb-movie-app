import {
	OFFSET_SEQUENCE,
	ROTATION_SEQUENCE,
} from './home-cta-section-constants';
import type { PosterSource } from './types';

import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';

interface HomeCtaSectionPosterSegmentProps {
	posters: Array<PosterSource>;
	seed: number;
	className?: string;
}

export function HomeCtaSectionPosterSegment({
	className,
	posters,
	seed,
}: HomeCtaSectionPosterSegmentProps) {
	return (
		<div aria-hidden className="flex shrink-0">
			{posters.map((poster, index) => {
				const rotation =
					ROTATION_SEQUENCE[(index + seed) % ROTATION_SEQUENCE.length];
				const offsetY =
					OFFSET_SEQUENCE[(index + seed) % OFFSET_SEQUENCE.length];
				const src = buildTmdbImageUrl({
					type: 'poster',
					path: poster.posterPath,
					size: 'w342',
				});

				return (
					<div
						key={`${poster.title}-${index}`}
						className="shrink-0 origin-bottom"
						style={{
							transform: `translateY(${offsetY}px) rotate(${rotation}deg)`,
						}}
					>
						<img
							alt=""
							className={className}
							decoding="async"
							loading="lazy"
							src={src ?? ''}
						/>
					</div>
				);
			})}
		</div>
	);
}
