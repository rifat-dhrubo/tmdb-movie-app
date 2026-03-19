import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { toast } from 'sonner';

import { useAddWatchlistItemMutation } from './use-add-watchlist-item-mutation';
import { useRemoveWatchlistItemMutation } from './use-remove-watchlist-item-mutation';
import { useWatchlistSavedIds } from './use-watchlist-saved-ids';

import { useAuth } from '@/features/auth';

export function useToggleWatchlistItemMutation() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const addMutation = useAddWatchlistItemMutation();
	const removeMutation = useRemoveWatchlistItemMutation();
	const { savedIds } = useWatchlistSavedIds();

	const toggle = React.useCallback(
		async (movieId: number) => {
			if (!user?.uid) {
				toast.info('Sign in to start building your watchlist.');
				await navigate({ to: '/sign-in' });
				return;
			}

			if (savedIds.has(movieId)) {
				await removeMutation.mutateAsync(movieId);
				return;
			}

			await addMutation.mutateAsync(movieId);
		},
		[addMutation, navigate, removeMutation, savedIds, user?.uid],
	);

	return {
		toggle,
		isPending: addMutation.isPending || removeMutation.isPending,
		addMutation,
		removeMutation,
	};
}
