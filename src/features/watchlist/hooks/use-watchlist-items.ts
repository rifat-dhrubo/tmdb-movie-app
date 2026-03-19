import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getWatchlistItems } from '../api/watchlist-firestore';
import { watchlistKeys } from '../lib/watchlist-keys';
import type { WatchlistItem } from '../types/watchlist-types';

import { useAuth } from '@/features/auth';

export function useWatchlistItems() {
	const queryClient = useQueryClient();
	const { isInitialLoading, user } = useAuth();
	const uid = user?.uid;

	return useQuery<Array<WatchlistItem>>({
		queryKey: watchlistKeys.items(uid ?? 'anonymous'),
		queryFn: async () => {
			if (!uid) {
				return [];
			}

			return getWatchlistItems(uid);
		},
		enabled: !isInitialLoading && !!uid,
		initialData: uid
			? queryClient.getQueryData<Array<WatchlistItem>>(watchlistKeys.items(uid))
			: undefined,
		staleTime: Number.POSITIVE_INFINITY,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
}
