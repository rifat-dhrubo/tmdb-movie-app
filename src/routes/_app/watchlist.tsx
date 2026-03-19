import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';

import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/features/auth';
import {
	WatchlistEmptyState,
	WatchlistGridCard,
	WatchlistGuestState,
	WatchlistListCard,
	WatchlistLoadingState,
	WatchlistSidebar,
	WatchlistViewToggle,
	useRemoveWatchlistItemMutation,
	useWatchlistItemsView,
	useWatchlistStats,
} from '@/features/watchlist';

const watchlistSearchSchema = z.object({
	dir: z.enum(['asc', 'desc']).optional(),
	sort: z.enum(['added', 'rating', 'year']).optional(),
	view: z.enum(['list', 'grid']).optional(),
});

export const Route = createFileRoute('/_app/watchlist')({
	component: WatchlistPage,
	validateSearch: watchlistSearchSchema,
	ssr: false,
});

function WatchlistPage() {
	const navigate = useNavigate();
	const search = Route.useSearch();
	const { isInitialLoading, user } = useAuth();
	const removeMutation = useRemoveWatchlistItemMutation();

	const direction = search.dir ?? 'desc';
	const sortBy = search.sort ?? 'added';
	const view = search.view ?? 'list';

	const { isLoading, items } = useWatchlistItemsView({ direction, sortBy });
	const { stats } = useWatchlistStats();
	const isPageLoading = isInitialLoading || (isLoading && !!user);

	function updateSearch(next: Partial<typeof search>) {
		void navigate({
			to: '/watchlist',
			search: {
				dir: next.dir ?? direction,
				sort: next.sort ?? sortBy,
				view: next.view ?? view,
			},
		});
	}

	const pageHeading = (
		<div>
			<p className="text-xs font-medium tracking-[0.32em] text-muted-foreground uppercase">
				Your collection . {String(stats.moviesSaved).padStart(3, '0')} stubs
			</p>
			<h1 className="mt-2 font-serif text-4xl tracking-tight text-foreground md:text-5xl">
				Watchlist
			</h1>
			<p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
				A live, per-user archive of films you want to revisit next.
			</p>
		</div>
	);

	return (
		<main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
			{!user ? (
				<>
					{pageHeading}
					<WatchlistGuestState />
				</>
			) : isPageLoading ? (
				<>
					{pageHeading}
					<WatchlistLoadingState />
				</>
			) : items.length === 0 ? (
				<>
					{pageHeading}
					<WatchlistEmptyState />
				</>
			) : (
				<Tabs
					className="gap-8"
					value={view}
					onValueChange={(nextView) =>
						updateSearch({ view: nextView as typeof view })
					}
				>
					<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
						{pageHeading}

						<div className="w-full max-w-[260px] lg:w-auto">
							<WatchlistViewToggle />
						</div>
					</div>

					<div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
						<WatchlistSidebar
							direction={direction}
							sortBy={sortBy}
							stats={stats}
							onSortChange={(nextSort) => updateSearch({ sort: nextSort })}
							onDirectionChange={(nextDirection) =>
								updateSearch({ dir: nextDirection })
							}
						/>

						<div>
							<TabsContent className="space-y-4" value="list">
								{items.map((item, index) => (
									<WatchlistListCard
										key={item.tmdbId}
										index={index}
										item={item}
										isRemoving={
											removeMutation.isPending
												? removeMutation.variables === item.tmdbId
												: false
										}
										onRemove={(tmdbId) => {
											void removeMutation.mutateAsync(tmdbId);
										}}
									/>
								))}
							</TabsContent>

							<TabsContent value="grid">
								<div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
									{items.map((item, index) => (
										<WatchlistGridCard
											key={item.tmdbId}
											index={index}
											item={item}
										/>
									))}
								</div>
							</TabsContent>
						</div>
					</div>
				</Tabs>
			)}
		</main>
	);
}
