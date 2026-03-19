import type { PosterSource } from './types';

import { CASCADE_FILMS, SHELVES } from '@/features/home/constants';

const CTA_POSTERS: Array<PosterSource> = [
	...CASCADE_FILMS,
	...SHELVES[0].movies.slice(0, 8),
	...SHELVES[1].movies.slice(0, 8),
];

const MOBILE_POSTER_COUNT = 8;
const PRIMARY_POSTER_COUNT = 12;
const SECONDARY_POSTER_OFFSET = 5;
const SECONDARY_POSTER_COUNT = 17;

function repeatPosters(posters: Array<PosterSource>, times: number) {
	return Array.from({ length: times }, () => posters).flat();
}

export const MOBILE_RAIL_POSTERS = repeatPosters(
	CTA_POSTERS.slice(0, MOBILE_POSTER_COUNT),
	4,
);
export const DESKTOP_PRIMARY_POSTERS = repeatPosters(
	CTA_POSTERS.slice(0, PRIMARY_POSTER_COUNT),
	4,
);
export const DESKTOP_SECONDARY_POSTERS = repeatPosters(
	CTA_POSTERS.slice(SECONDARY_POSTER_OFFSET, SECONDARY_POSTER_COUNT).reverse(),
	4,
);

export function buildCtaPosterRails(posters: Array<PosterSource>) {
	const source =
		posters.length >= SECONDARY_POSTER_COUNT ? posters : CTA_POSTERS;

	return {
		mobile: repeatPosters(source.slice(0, MOBILE_POSTER_COUNT), 4),
		desktopPrimary: repeatPosters(source.slice(0, PRIMARY_POSTER_COUNT), 4),
		desktopSecondary: repeatPosters(
			source.slice(SECONDARY_POSTER_OFFSET, SECONDARY_POSTER_COUNT).reverse(),
			4,
		),
	};
}

export const ROTATION_SEQUENCE = [-8, -4, 0, 6, 8, 3, -2, 5] as const;
export const OFFSET_SEQUENCE = [20, 8, 16, 0, 14, 6, 18, 10] as const;
