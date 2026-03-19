import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { subscribeToWatchlist } from '../api/watchlist-firestore';
import { watchlistKeys } from '../lib/watchlist-keys';

import { useAuth } from '@/features/auth';

export function useWatchlistLiveSync() {
	const queryClient = useQueryClient();
	const { isInitialLoading, user } = useAuth();
	const previousUidRef = React.useRef<string | null>(null);

	React.useEffect(() => {
		if (typeof window === 'undefined' || isInitialLoading) {
			return;
		}

		if (!user?.uid) {
			if (previousUidRef.current) {
				queryClient.removeQueries({
					queryKey: watchlistKeys.user(previousUidRef.current),
				});
			}

			previousUidRef.current = null;
			return;
		}

		if (previousUidRef.current && previousUidRef.current !== user.uid) {
			queryClient.removeQueries({
				queryKey: watchlistKeys.user(previousUidRef.current),
			});
		}

		previousUidRef.current = user.uid;

		return subscribeToWatchlist(user.uid, (items) => {
			queryClient.setQueryData(watchlistKeys.items(user.uid), items);
		});
	}, [isInitialLoading, queryClient, user?.uid]);
}
