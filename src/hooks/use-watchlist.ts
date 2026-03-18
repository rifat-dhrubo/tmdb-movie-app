import React from 'react';

const STORAGE_KEY = 'reel-watchlist';

export function useWatchlist() {
	const [savedIds, setSavedIds] = React.useState<Set<number>>(new Set());
	const [isLoaded, setIsLoaded] = React.useState(false);
	const initialized = React.useRef(false);

	// Load from local storage on mount
	React.useEffect(() => {
		if (initialized.current) return;
		initialized.current = true;

		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const parsed = JSON.parse(stored) as Array<number>;
				setSavedIds(new Set(parsed));
			}
		} catch {
			// Ignore parse errors
		}
		setIsLoaded(true);
	}, []);

	// Save to local storage whenever savedIds changes
	React.useEffect(() => {
		if (isLoaded) {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(savedIds)));
			} catch {
				// Ignore storage errors
			}
		}
	}, [savedIds, isLoaded]);

	const toggleSave = React.useCallback((id: number) => {
		setSavedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) {
				next.delete(id);
			} else {
				next.add(id);
			}
			return next;
		});
	}, []);

	const isSaved = React.useCallback(
		(id: number) => savedIds.has(id),
		[savedIds],
	);

	const clearWatchlist = React.useCallback(() => {
		setSavedIds(new Set());
	}, []);

	return {
		clearWatchlist,
		isLoaded,
		isSaved,
		savedIds,
		toggleSave,
	};
}
