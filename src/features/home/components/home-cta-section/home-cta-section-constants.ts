import type { PosterSource } from './types';

import { CASCADE_FILMS, SHELVES } from '@/features/home/constants';

const CTA_POSTERS: Array<PosterSource> = [
	...CASCADE_FILMS,
	...SHELVES[0].movies.slice(0, 4),
	...SHELVES[1].movies.slice(0, 4),
];

function repeatPosters(posters: Array<PosterSource>, times: number) {
	return Array.from({ length: times }, () => posters).flat();
}

export const MOBILE_RAIL_POSTERS = repeatPosters(CTA_POSTERS.slice(0, 6), 4);
export const DESKTOP_PRIMARY_POSTERS = repeatPosters(
	CTA_POSTERS.slice(0, 8),
	4,
);
export const DESKTOP_SECONDARY_POSTERS = repeatPosters(
	CTA_POSTERS.slice(3, 11).reverse(),
	4,
);

export const ROTATION_SEQUENCE = [-8, -4, 0, 6, 8, 3, -2, 5] as const;
export const OFFSET_SEQUENCE = [20, 8, 16, 0, 14, 6, 18, 10] as const;
