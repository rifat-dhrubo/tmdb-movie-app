import { useMutation, useQueryClient } from '@tanstack/react-query';

import { removeWatchlistItem } from '../api/watchlist-firestore';
import { watchlistKeys } from '../lib/watchlist-keys';
import type { WatchlistItem } from '../types/watchlist-types';

import { useAuth } from '@/features/auth';
import { useSound } from '@/hooks/use-sound';
import { confirmation001Sound } from '@/lib/confirmation-001';

export function useRemoveWatchlistItemMutation() {
	const queryClient = useQueryClient();
	const { user } = useAuth();
	const [playConfirmation] = useSound(confirmation001Sound);

	return useMutation({
		mutationFn: async (movieId: number) => {
			if (!user?.uid) {
				throw new Error('You must be signed in to remove saved films.');
			}

			return removeWatchlistItem(user.uid, movieId);
		},
		onMutate: async (movieId) => {
			if (!user?.uid) {
				return { previousItems: [] as Array<WatchlistItem> };
			}

			await queryClient.cancelQueries({
				queryKey: watchlistKeys.items(user.uid),
			});

			const previousItems =
				queryClient.getQueryData<Array<WatchlistItem>>(
					watchlistKeys.items(user.uid),
				) ?? [];

			queryClient.setQueryData<Array<WatchlistItem>>(
				watchlistKeys.items(user.uid),
				previousItems.filter((item) => item.tmdbId !== movieId),
			);

			return { previousItems };
		},
		onError: (_error, _movieId, context) => {
			if (!user?.uid || !context) {
				return;
			}

			queryClient.setQueryData(
				watchlistKeys.items(user.uid),
				context.previousItems,
			);
		},
		onSuccess: () => {
			playConfirmation();
		},
	});
}
