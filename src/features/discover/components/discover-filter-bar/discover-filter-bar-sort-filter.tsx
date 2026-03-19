import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import type { DiscoverMovieSortBy } from '@/generated/tmdb/tmdbApi.schemas';

const SORT_OPTIONS: Array<{ label: string; value: DiscoverMovieSortBy }> = [
	{ label: 'Most Popular', value: 'popularity.desc' },
	{ label: 'Highest Rated', value: 'vote_average.desc' },
	{ label: 'Newest First', value: 'primary_release_date.desc' },
	{ label: 'Oldest First', value: 'primary_release_date.asc' },
];

interface DiscoverFilterBarSortFilterProps {
	value: DiscoverMovieSortBy;
	onChange: (value: DiscoverMovieSortBy) => void;
}

export function DiscoverFilterBarSortFilter({
	onChange,
	value,
}: DiscoverFilterBarSortFilterProps) {
	return (
		<Select
			value={value}
			onValueChange={(nextValue) => onChange(nextValue as DiscoverMovieSortBy)}
		>
			<SelectTrigger className="h-9 w-auto gap-2 px-3">
				<span className="text-muted-foreground">Sort by</span>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{SORT_OPTIONS.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
