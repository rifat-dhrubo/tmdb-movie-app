import React from 'react';

import { getWatchlistSavedIds } from '../lib/watchlist-selectors';

import { useWatchlistItems } from './use-watchlist-items';

export function useWatchlistSavedIds() {
	const query = useWatchlistItems();

	const savedIds = React.useMemo(
		() => getWatchlistSavedIds(query.data ?? []),
		[query.data],
	);

	return {
		...query,
		savedIds,
	};
}
