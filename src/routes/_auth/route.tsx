import { Outlet, createFileRoute, useMatches } from '@tanstack/react-router';

import { AuthLayout } from '@/features/auth/components/auth-layout';

interface AuthQuote {
	attribution: string;
	text: string;
}

interface AuthRouteStaticData {
	authQuote: AuthQuote;
}

const fallbackAuthQuote: AuthQuote = {
	text: 'The only place to keep track of every film I actually want to watch.',
	attribution: '4.8 stars · 2,400+ cinephiles',
};

export const Route = createFileRoute('/_auth')({
	component: AuthRouteLayout,
});

function AuthRouteLayout() {
	const quote = useMatches({
		select: (matches) => {
			for (let index = matches.length - 1; index >= 0; index -= 1) {
				const staticData = matches[index]?.staticData as
					| Partial<AuthRouteStaticData>
					| undefined;

				if (staticData?.authQuote != null) {
					return staticData.authQuote;
				}
			}

			return fallbackAuthQuote;
		},
	});

	return (
		<AuthLayout quote={quote}>
			<Outlet />
		</AuthLayout>
	);
}
