import '@fontsource-variable/dm-sans';
import '@fontsource-variable/geist-mono';

import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import { queryDevtools as TanStackQueryDevtools } from '../integrations/tanstack-query/devtools';
import appCss from '../styles.css?url';

import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import type { AuthContextType } from '@/features/auth';
import { ThemeProvider } from '@/integrations/theme-provider';

interface MyRouterContext {
	queryClient: QueryClient;
	auth?: AuthContextType;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		links: [
			{
				rel: 'stylesheet',
				href: appCss,
			},
			{
				rel: 'icon',
				href: '/favicon.ico',
			},
			{
				rel: 'apple-touch-icon',
				href: '/apple-touch-icon.png',
				sizes: '180x180',
			},
			{},
		],
		meta: [
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1.0',
			},
		],
	}),

	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html suppressHydrationWarning lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<ThemeProvider forcedTheme="light">
					<TooltipProvider>
						{children}
						<TanStackDevtools
							config={{
								position: 'bottom-right',
							}}
							plugins={[
								{
									name: 'Tanstack Router',
									render: <TanStackRouterDevtoolsPanel />,
								},
								TanStackQueryDevtools,
							]}
						/>
					</TooltipProvider>
					<Toaster />
				</ThemeProvider>
				<Scripts />
			</body>
		</html>
	);
}
