import { z } from 'zod';

import type { DiscoverMovieSortBy } from '@/generated/tmdb/tmdbApi.schemas';

export const discoverSearchSchema = z.object({
	genres: z.string().optional(),
	year: z.string().optional(),
	sort: z.enum(['popularity', 'rating', 'newest', 'oldest']).optional(),
});

export type DiscoverSortParam = NonNullable<
	z.infer<typeof discoverSearchSchema>['sort']
>;

export const PRESET_YEARS = [
	{ label: '2020s', value: '2020' },
	{ label: '2010s', value: '2010' },
	{ label: '2000s', value: '2000' },
	{ label: '1990s', value: '1990' },
	{ label: '1980s', value: '1980' },
	{ label: 'Classic', value: '1970' },
] as const;

export const DEFAULT_DISCOVER_SORT = 'popularity' satisfies DiscoverSortParam;

const SORT_MAP: Record<DiscoverSortParam, DiscoverMovieSortBy> = {
	popularity: 'popularity.desc',
	rating: 'vote_average.desc',
	newest: 'primary_release_date.desc',
	oldest: 'primary_release_date.asc',
};

const REVERSE_SORT_MAP: Record<DiscoverMovieSortBy, DiscoverSortParam> = {
	'original_title.asc': DEFAULT_DISCOVER_SORT,
	'original_title.desc': DEFAULT_DISCOVER_SORT,
	'popularity.asc': DEFAULT_DISCOVER_SORT,
	'popularity.desc': DEFAULT_DISCOVER_SORT,
	'primary_release_date.asc': 'oldest',
	'primary_release_date.desc': 'newest',
	'revenue.asc': DEFAULT_DISCOVER_SORT,
	'revenue.desc': DEFAULT_DISCOVER_SORT,
	'title.asc': DEFAULT_DISCOVER_SORT,
	'title.desc': DEFAULT_DISCOVER_SORT,
	'vote_average.asc': 'rating',
	'vote_average.desc': 'rating',
	'vote_count.asc': DEFAULT_DISCOVER_SORT,
	'vote_count.desc': DEFAULT_DISCOVER_SORT,
};

export function getDiscoverSortBy(
	sort: DiscoverSortParam | undefined,
): DiscoverMovieSortBy {
	return SORT_MAP[sort ?? DEFAULT_DISCOVER_SORT];
}

export function getDiscoverSortParam(
	sortBy: DiscoverMovieSortBy,
): DiscoverSortParam {
	return REVERSE_SORT_MAP[sortBy];
}

export function parseSelectedGenres(
	genresParam: string | undefined,
): Array<number> {
	if (!genresParam) return [];

	return genresParam
		.split(',')
		.map((id) => Number.parseInt(id, 10))
		.filter((id) => !Number.isNaN(id));
}
