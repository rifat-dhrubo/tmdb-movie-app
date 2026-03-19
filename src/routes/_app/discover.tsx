import { createFileRoute } from '@tanstack/react-router';

import { DiscoverPage as DiscoverFeaturePage } from '@/features/discover';
import { discoverSearchSchema } from '@/features/discover/constants';

export const Route = createFileRoute('/_app/discover')({
	component: DiscoverRoutePage,
	validateSearch: discoverSearchSchema,
});

function DiscoverRoutePage() {
	return (
		<main className="pb-16">
			<DiscoverFeaturePage />
		</main>
	);
}
