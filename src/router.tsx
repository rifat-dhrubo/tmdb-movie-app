import { createRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';

// Import the generated route tree

import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx';
import { routeTree } from './routeTree.gen.ts';

import { RouterErrorComponent } from '@/components/route-error-component';
import { RouteLoadingComponent } from '@/components/route-loading-component';
import { RouteNotFoundComponent } from '@/components/route-not-found-component';
import { AuthContextProvider } from '@/features/auth';
import { WatchlistLiveSyncProvider } from '@/features/watchlist';

// Create a new router instance
export const getRouter = () => {
	const rqContext = TanStackQueryProvider.getContext();

	const router = createRouter({
		routeTree,
		context: { ...rqContext, auth: undefined },
		defaultPreload: 'intent',
		defaultViewTransition: true,
		defaultErrorComponent: (errorProps) => (
			<RouterErrorComponent {...errorProps} />
		),
		defaultPendingComponent: () => <RouteLoadingComponent />,
		defaultNotFoundComponent: () => <RouteNotFoundComponent />,
		Wrap: (props: { children: React.ReactNode }) => {
			return (
				<AuthContextProvider>
					<TanStackQueryProvider.Provider {...rqContext}>
						<WatchlistLiveSyncProvider>
							{props.children}
						</WatchlistLiveSyncProvider>
					</TanStackQueryProvider.Provider>
				</AuthContextProvider>
			);
		},
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient: rqContext.queryClient,
	});

	return router;
};
