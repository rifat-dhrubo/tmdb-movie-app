import { createRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';

// Import the generated route tree

import './styles.css';
import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx';
import { routeTree } from './routeTree.gen.ts';

// Create a new router instance

// Create a new router instance
export const getRouter = () => {
	const rqContext = TanStackQueryProvider.getContext();

	const router = createRouter({
		routeTree,
		context: { ...rqContext },
		defaultPreload: 'intent',
		defaultViewTransition: true,
		Wrap: (props: { children: React.ReactNode }) => {
			return (
				<TanStackQueryProvider.Provider {...rqContext}>
					{props.children}
				</TanStackQueryProvider.Provider>
			);
		},
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient: rqContext.queryClient,
	});

	return router;
};
