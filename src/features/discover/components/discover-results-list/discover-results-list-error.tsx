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

interface DiscoverResultsListErrorProps {
	onRetry: () => void;
}

export function DiscoverResultsListError({
	onRetry,
}: DiscoverResultsListErrorProps) {
	return (
		<div className="mx-auto mt-16 max-w-md text-center">
			<Empty className="border border-dashed border-destructive/30">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<Icon className="text-destructive" name="warning_circle_bold" />
					</EmptyMedia>
					<EmptyTitle className="font-serif text-2xl tracking-tight">
						Something went wrong
					</EmptyTitle>
					<EmptyDescription>
						We couldn&apos;t load the catalog right now. Please try again.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent className="flex-row justify-center">
					<Button type="button" onClick={onRetry}>
						Try again
					</Button>
				</EmptyContent>
			</Empty>
		</div>
	);
}
