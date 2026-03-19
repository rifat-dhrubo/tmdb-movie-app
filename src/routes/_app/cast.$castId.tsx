import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { CastDetailContent } from '@/features/cast-detail/components/cast-detail-content';

const castDetailSchema = z.object({
	castId: z.coerce.number().positive(),
});

export const Route = createFileRoute('/_app/cast/$castId')({
	component: CastDetailPage,
	params: {
		parse: (params) => castDetailSchema.parse(params),
	},
});

function CastDetailPage() {
	const { castId } = Route.useParams();

	return (
		<main className="pb-16">
			<CastDetailContent castId={castId} />
		</main>
	);
}
