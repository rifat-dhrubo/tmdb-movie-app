import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addWatchlistItem } from '../api/watchlist-firestore';
import { watchlistKeys } from '../lib/watchlist-keys';
import { sortWatchlistItems } from '../lib/watchlist-selectors';
import type { WatchlistItem } from '../types/watchlist-types';

import { useAuth } from '@/features/auth';
import { useSound } from '@/hooks/use-sound';
import { confirmation003Sound } from '@/lib/confirmation-003';

export function useAddWatchlistItemMutation() {
	const queryClient = useQueryClient();
	const { user } = useAuth();
	const [playConfirmation] = useSound(confirmation003Sound);

	return useMutation({
		mutationFn: async (movieId: number) => {
			if (!user?.uid) {
				throw new Error('You must be signed in to save films.');
			}

			return addWatchlistItem(user.uid, movieId);
		},
		onSuccess: (item) => {
			playConfirmation();

			if (!user?.uid) {
				return;
			}

			queryClient.setQueryData<Array<WatchlistItem>>(
				watchlistKeys.items(user.uid),
				(previous = []) => {
					const withoutItem = previous.filter(
						(previousItem) => previousItem.tmdbId !== item.tmdbId,
					);

					return sortWatchlistItems([...withoutItem, item], {
						sortBy: 'added',
						direction: 'desc',
					});
				},
			);
		},
	});
}
