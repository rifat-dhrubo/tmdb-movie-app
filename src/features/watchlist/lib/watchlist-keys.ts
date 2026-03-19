export const watchlistKeys = {
	all: ['watchlist'] as const,
	user: (uid: string) => [...watchlistKeys.all, uid] as const,
	items: (uid: string) => [...watchlistKeys.user(uid), 'items'] as const,
};
