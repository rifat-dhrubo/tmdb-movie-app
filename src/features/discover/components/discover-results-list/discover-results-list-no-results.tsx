import { useNavigate, useSearch } from '@tanstack/react-router';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty';
import { parseSelectedGenres } from '@/features/discover/constants';

export function DiscoverResultsListNoResults() {
	const navigate = useNavigate({ from: '/discover' });
	const { genres, sort, year } = useSearch({ from: '/_app/discover' });

	const hasFilters = parseSelectedGenres(genres).length > 0 || Boolean(year);

	function handleClearFilters() {
		void navigate({
			to: '/discover',
			search: {
				genres: undefined,
				year: undefined,
				sort,
			},
		});
	}

	return (
		<div className="mx-auto mt-16 max-w-md text-center">
			<Empty className="border border-dashed border-border/40">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<Icon className="text-muted-foreground" name="question_bold" />
					</EmptyMedia>
					<EmptyTitle className="font-serif text-2xl tracking-tight">
						No films match these filters
					</EmptyTitle>
					<EmptyDescription>
						Try a different year, fewer genres, or a broader sort.
					</EmptyDescription>
				</EmptyHeader>
				{hasFilters ? (
					<EmptyContent className="flex-row justify-center">
						<Button
							type="button"
							variant="outline"
							onClick={handleClearFilters}
						>
							Clear filters
						</Button>
					</EmptyContent>
				) : null}
			</Empty>
		</div>
	);
}
