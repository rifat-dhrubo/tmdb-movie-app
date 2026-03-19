import React from 'react';

import { getWatchlistStats } from '../lib/watchlist-selectors';

import { useWatchlistItems } from './use-watchlist-items';

export function useWatchlistStats() {
	const query = useWatchlistItems();

	const stats = React.useMemo(
		() => getWatchlistStats(query.data ?? []),
		[query.data],
	);

	return {
		...query,
		stats,
	};
}
