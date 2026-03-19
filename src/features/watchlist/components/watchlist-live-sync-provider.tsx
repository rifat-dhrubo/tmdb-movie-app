import type React from 'react';

import { useWatchlistLiveSync } from '../hooks/use-watchlist-live-sync';

export function WatchlistLiveSyncProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	useWatchlistLiveSync();

	return <>{children}</>;
}
