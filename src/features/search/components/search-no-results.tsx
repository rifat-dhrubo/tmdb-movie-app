import { Icon } from '@/components/icon';
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty';

interface SearchNoResultsProps {
	query: string;
}

export function SearchNoResults({ query }: SearchNoResultsProps) {
	return (
		<div className="mx-auto mt-16 max-w-md text-center">
			<Empty className="border border-dashed border-border/40">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<Icon className="text-muted-foreground" name="question_bold" />
					</EmptyMedia>
					<EmptyTitle className="font-serif text-2xl tracking-tight">
						No films found for{' '}
						<span className="text-primary italic">&ldquo;{query}&rdquo;</span>
					</EmptyTitle>
					<EmptyDescription>
						Try checking your spelling or using different keywords.
					</EmptyDescription>
				</EmptyHeader>
			</Empty>
		</div>
	);
}
