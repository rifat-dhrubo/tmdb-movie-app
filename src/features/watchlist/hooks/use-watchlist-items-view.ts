import React from 'react';

import { sortWatchlistItems } from '../lib/watchlist-selectors';
import type {
	WatchlistDirection,
	WatchlistSortBy,
} from '../types/watchlist-types';

import { useWatchlistItems } from './use-watchlist-items';

export function useWatchlistItemsView({
	direction = 'desc',
	sortBy = 'added',
}: {
	direction?: WatchlistDirection;
	sortBy?: WatchlistSortBy;
}) {
	const query = useWatchlistItems();

	const items = React.useMemo(
		() => sortWatchlistItems(query.data ?? [], { direction, sortBy }),
		[direction, query.data, sortBy],
	);

	return {
		...query,
		items,
	};
}
