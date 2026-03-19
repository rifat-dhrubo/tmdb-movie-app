import { Outlet, createFileRoute } from '@tanstack/react-router';

import { SiteHeader } from '@/components/site';

export const Route = createFileRoute('/_app')({
	component: AppLayout,
});

function AppLayout() {
	return (
		<div className="min-h-screen bg-background">
			<SiteHeader />
			<Outlet />
		</div>
	);
}
