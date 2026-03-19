import { Icon } from '@/components/icon';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { PRESET_YEARS } from '@/features/search/constants';
import { cn } from '@/lib/utils';

interface SearchInputSectionYearFilterProps {
	onChange: (year: string | undefined) => void;
	value: string | undefined;
}

export function SearchInputSectionYearFilter({
	onChange,
	value,
}: SearchInputSectionYearFilterProps) {
	const selectedLabel = value
		? (PRESET_YEARS.find((year) => year.value === value)?.label ?? value)
		: null;

	return (
		<Select
			value={value ?? 'all'}
			onValueChange={(newValue) =>
				onChange(newValue === 'all' ? undefined : newValue)
			}
		>
			<SelectTrigger
				className={cn(
					'h-9 w-auto gap-2 px-3',
					value && 'border-primary/30 text-primary',
				)}
			>
				<Icon className="size-4" name="calendar_blank_bold" />
				<SelectValue placeholder="Year">{selectedLabel ?? 'Year'}</SelectValue>
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="all">All Years</SelectItem>
				{PRESET_YEARS.map((year) => (
					<SelectItem key={year.value} value={year.value}>
						{year.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
