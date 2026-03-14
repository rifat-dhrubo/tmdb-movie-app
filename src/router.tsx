import { createRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';

// Import the generated route tree

import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx';
import { routeTree } from './routeTree.gen.ts';

import { AuthContextProvider } from '@/auth.tsx';

// Create a new router instance
export const getRouter = () => {
	const rqContext = TanStackQueryProvider.getContext();

	const router = createRouter({
		routeTree,
		context: { ...rqContext, auth: undefined },
		defaultPreload: 'intent',
		defaultViewTransition: true,
		Wrap: (props: { children: React.ReactNode }) => {
			return (
				<AuthContextProvider>
					<TanStackQueryProvider.Provider {...rqContext}>
						{props.children}
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
