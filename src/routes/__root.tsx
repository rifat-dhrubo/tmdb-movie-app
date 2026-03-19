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
import { env } from '@/env';
import type { AuthContextType } from '@/features/auth';
import { SoundPreferencesProvider } from '@/integrations/sound-preferences';
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
		],
		meta: [
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1.0',
			},
			{
				name: 'description',
				content:
					'Discover films and curate your personal cinema journal. Track what you want to watch and remember what you loved.',
			},
			{
				property: 'og:site_name',
				content: 'Cine',
			},
			{
				property: 'og:type',
				content: 'website',
			},
			{
				property: 'og:url',
				content: env.VITE_PUBLIC_SITE_URL,
			},
			{
				property: 'og:title',
				content: 'Cine — Curate Your Cinema',
			},
			{
				property: 'og:description',
				content:
					'Discover films and curate your personal cinema journal. Track what you want to watch and remember what you loved.',
			},
			{
				property: 'og:image',
				content: env.VITE_PUBLIC_DEFAULT_OG_IMAGE,
			},
			{
				property: 'og:image:width',
				content: '1200',
			},
			{
				property: 'og:image:height',
				content: '630',
			},
			{
				property: 'og:image:alt',
				content: 'Cine - Curate Your Cinema',
			},
			{
				name: 'twitter:card',
				content: 'summary_large_image',
			},
			{
				name: 'twitter:title',
				content: 'Cine — Curate Your Cinema',
			},
			{
				name: 'twitter:description',
				content:
					'Discover films and curate your personal cinema journal. Track what you want to watch and remember what you loved.',
			},
			{
				name: 'twitter:image',
				content: env.VITE_PUBLIC_DEFAULT_OG_IMAGE,
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
				<ThemeProvider>
					<SoundPreferencesProvider>
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
					</SoundPreferencesProvider>
				</ThemeProvider>
				<Scripts />
			</body>
		</html>
	);
}
