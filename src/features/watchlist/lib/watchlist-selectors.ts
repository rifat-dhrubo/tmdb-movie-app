import type {
	WatchlistDirection,
	WatchlistGenreStat,
	WatchlistItem,
	WatchlistSortBy,
	WatchlistStats,
} from '../types/watchlist-types';

export function sortWatchlistItems(
	items: Array<WatchlistItem>,
	options: {
		direction?: WatchlistDirection;
		sortBy?: WatchlistSortBy;
	} = {},
) {
	const { direction = 'desc', sortBy = 'added' } = options;
	const directionFactor = direction === 'asc' ? 1 : -1;

	return [...items].sort((left, right) => {
		if (sortBy === 'rating') {
			return (
				((left.voteAverage ?? 0) - (right.voteAverage ?? 0)) * directionFactor
			);
		}

		if (sortBy === 'year') {
			return (
				((left.releaseYear ?? 0) - (right.releaseYear ?? 0)) * directionFactor
			);
		}

		return (
			(left.addedAt.toMillis() - right.addedAt.toMillis()) * directionFactor
		);
	});
}

export function getWatchlistSavedIds(items: Array<WatchlistItem>) {
	return new Set(items.map((item) => item.tmdbId));
}

export function getWatchlistStats(items: Array<WatchlistItem>): WatchlistStats {
	const genreCounts = new Map<string, WatchlistGenreStat>();
	const decadeCounts = new Map<number, number>();

	const totalRuntimeMinutes = items.reduce(
		(total, item) => total + (item.runtimeMinutes ?? 0),
		0,
	);

	for (const item of items) {
		for (const genre of item.genres) {
			const previous = genreCounts.get(genre.name);
			genreCounts.set(genre.name, {
				id: genre.id,
				name: genre.name,
				count: (previous?.count ?? 0) + 1,
			});
		}

		if (item.releaseYear) {
			const decade = Math.floor(item.releaseYear / 10) * 10;
			decadeCounts.set(decade, (decadeCounts.get(decade) ?? 0) + 1);
		}
	}

	return {
		moviesSaved: items.length,
		totalRuntimeMinutes,
		topGenres: [...genreCounts.values()]
			.sort(
				(left, right) =>
					right.count - left.count || left.name.localeCompare(right.name),
			)
			.slice(0, 4),
		topDecades: [...decadeCounts.entries()]
			.map(([decade, count]) => ({ decade, count }))
			.sort(
				(left, right) => right.count - left.count || left.decade - right.decade,
			)
			.slice(0, 6),
	};
}

export function formatWatchlistStub(index: number) {
	return `${String(index + 1).padStart(3, '0')}A`;
}

export function getWatchlistPosterGradient(tmdbId: number) {
	const gradients = [
		'from-violet-500/75 via-indigo-500/45 to-slate-950',
		'from-sky-500/75 via-blue-500/45 to-slate-950',
		'from-orange-500/75 via-amber-500/40 to-slate-950',
		'from-fuchsia-500/75 via-rose-500/40 to-slate-950',
		'from-emerald-500/75 via-teal-500/40 to-slate-950',
		'from-lime-500/75 via-green-500/40 to-slate-950',
	];

	return gradients[tmdbId % gradients.length] ?? gradients[0];
}
