/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { useDebouncedValue } from '@tanstack/react-pacer'; // React adapter re-exports
import React from 'react';

type RouteSearchFrom<RouteApi> = RouteApi extends {
	types: { fullSearchSchema: infer TSchema };
}
	? TSchema extends Record<string, unknown>
		? TSchema
		: Record<string, unknown>
	: RouteApi extends { useSearch: (...args: Array<any>) => infer TSearch }
		? TSearch extends Record<string, unknown>
			? TSearch
			: Record<string, unknown>
		: Record<string, unknown>;

// Constrain to keys whose non-nullish value is string-like (e.g. string | undefined)
type StringSearchKeys<T extends Record<string, unknown>> = {
	[K in keyof T]: NonNullable<T[K]> extends string ? Extract<K, string> : never;
}[keyof T];

export interface UseDebouncedSearchParamOptions {
	/** Debounce time in ms (default 300) */
	wait?: number;
	/** Force page=1 on debounced commits */
	resetPageOnSearch?: boolean;
	/** Update history entry or replace it (default replace=true to avoid stack spam) */
	replace?: boolean;
	/** Trim whitespace prior to commit */
	trim?: boolean;
	/** Leading edge commit: true to commit on first keystroke, trailing still runs by default */
	leading?: boolean;
}

/**
 * Route-scoped, type-safe hook for a debounced text search param.
 * Keeps local state instant & commits URL on debounce.
 */
export function useDebouncedSearchParam<
	RouteApi extends {
		types: { fullSearchSchema: Record<string, unknown> };
		useSearch: (...args: Array<any>) => unknown;
		useNavigate: (...args: Array<any>) => any;
	},
	Key extends StringSearchKeys<RouteSearchFrom<RouteApi>>,
>(routeApi: RouteApi, key: Key, opts: UseDebouncedSearchParamOptions = {}) {
	type RouteSearch = RouteSearchFrom<RouteApi>;

	const {
		leading = false,
		replace = true,
		resetPageOnSearch = false,
		trim = true,
		wait = 300,
	} = opts;

	const navigate = routeApi.useNavigate();
	const search = routeApi.useSearch() as RouteSearch;

	const committed = (search[key] ?? '') as string;
	const [draft, setDraft] = React.useState<string>(() => committed);
	const pendingCommitRef = React.useRef<string | null>(null);

	const buildNextSearch = React.useCallback(
		(prev: RouteSearch, value: string): RouteSearch => {
			const nextSearch = {
				...prev,
				[key]: value ? (value as RouteSearch[Key]) : (undefined as any),
			} as RouteSearch & { page?: number };

			if (resetPageOnSearch) {
				nextSearch.page = 1;
			}

			return nextSearch as RouteSearch;
		},
		[key, resetPageOnSearch],
	);

	// Keep local draft in sync if URL changes externally (back/forward, link clicks, etc.)
	React.useEffect(() => {
		if (
			pendingCommitRef.current !== null &&
			committed === pendingCommitRef.current
		) {
			pendingCommitRef.current = null;
			return;
		}

		pendingCommitRef.current = null;

		setDraft((prev) => {
			if (prev === committed) return prev;
			if (trim && prev.trim() === committed) return prev;
			return committed;
		});
	}, [committed, trim]);

	// Debounce just the *draft* value; the UI stays instant.
	const [debouncedDraft] = useDebouncedValue(draft, { wait, leading });
	// ^ Pacer defaults to trailing=true; no maxWait (use throttle if you need one). :contentReference[oaicite:6]{index=6}

	// Commit debounced value to URL search param, without history/scroll jank
	React.useEffect(() => {
		if (debouncedDraft === committed) return;
		const value = trim ? debouncedDraft.trim() : debouncedDraft;
		if (value === committed) return;

		pendingCommitRef.current = value;

		navigate({
			to: '.', // update current route
			replace, // avoid stacking history entries while typing
			resetScroll: false, // don't jump the page on every change
			search: (prev: RouteSearch): RouteSearch => buildNextSearch(prev, value),
		});
	}, [buildNextSearch, debouncedDraft, committed, navigate, replace, trim]);

	// Convenience helpers for inputs
	const bind = React.useMemo(
		() => ({
			value: draft,
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
				setDraft(e.target.value);
			},
			// Optional: commit immediately on blur
			onBlur: () => {
				const value = trim ? draft.trim() : draft;
				if (value === committed) return;
				pendingCommitRef.current = value;
				navigate({
					to: '.',
					replace,
					resetScroll: false,
					search: (prev: RouteSearch): RouteSearch =>
						buildNextSearch(prev, value),
				});
			},
		}),
		[buildNextSearch, committed, draft, navigate, replace, trim],
	);

	return {
		inputValue: draft,
		setValue: setDraft,
		searchValue: committed,
		bind,
		clear: () => setDraft(''),
	};
}
