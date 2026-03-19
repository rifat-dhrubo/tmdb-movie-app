import { useNavigate, useSearch } from '@tanstack/react-router';
import React from 'react';

import { DiscoverFilterBarGenreFilterPopover } from './discover-filter-bar-genre-filter-popover';
import { DiscoverFilterBarSortFilter } from './discover-filter-bar-sort-filter';
import { DiscoverFilterBarYearFilter } from './discover-filter-bar-year-filter';

import type { DiscoverSortParam } from '@/features/discover/constants';
import {
	DEFAULT_DISCOVER_SORT,
	getDiscoverSortBy,
	getDiscoverSortParam,
	parseSelectedGenres,
} from '@/features/discover/constants';
import { useGenreMovieList } from '@/generated/tmdb/default/default';

export function DiscoverFilterBar() {
	const navigate = useNavigate({ from: '/discover' });
	const {
		genres: genresParam,
		sort,
		year,
	} = useSearch({
		from: '/_app/discover',
	});
	const { data: genresData } = useGenreMovieList();

	const genres = React.useMemo(() => genresData?.genres ?? [], [genresData]);
	const selectedGenres = React.useMemo(
		() => parseSelectedGenres(genresParam),
		[genresParam],
	);
	const sortBy = getDiscoverSortBy(sort);

	function updateFilters({
		newGenres,
		newSort,
		newYear,
	}: {
		newGenres?: Array<number>;
		newSort?: DiscoverSortParam;
		newYear?: string;
	}) {
		const nextGenres =
			newGenres !== undefined
				? newGenres.length > 0
					? newGenres.join(',')
					: undefined
				: genresParam;

		void navigate({
			to: '/discover',
			search: {
				genres: nextGenres,
				year: newYear !== undefined ? newYear || undefined : year,
				sort: newSort ?? sort ?? DEFAULT_DISCOVER_SORT,
			},
		});
	}

	return (
		<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex flex-wrap items-center gap-2">
				<DiscoverFilterBarGenreFilterPopover
					genres={genres}
					selectedGenres={selectedGenres}
					onChange={(newGenres) => updateFilters({ newGenres })}
				/>
				<DiscoverFilterBarYearFilter
					value={year}
					onChange={(newYear) => updateFilters({ newYear })}
				/>
			</div>
			<DiscoverFilterBarSortFilter
				value={sortBy}
				onChange={(newSortBy) =>
					updateFilters({ newSort: getDiscoverSortParam(newSortBy) })
				}
			/>
		</div>
	);
}
