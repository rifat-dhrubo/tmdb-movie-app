import { Icon } from '@/components/icon';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const PRESET_YEARS = [
	{ label: '2020s', value: '2020' },
	{ label: '2010s', value: '2010' },
	{ label: '2000s', value: '2000' },
	{ label: '1990s', value: '1990' },
	{ label: '1980s', value: '1980' },
	{ label: 'Classic', value: '1970' },
];

interface YearFilterPopoverProps {
	onChange: (year: string | undefined) => void;
	value: string | undefined;
}

export function YearFilterPopover({ onChange, value }: YearFilterPopoverProps) {
	const handleValueChange = (newValue: string) => {
		onChange(newValue === 'all' ? undefined : newValue);
	};

	const selectedLabel = value
		? (PRESET_YEARS.find((y) => y.value === value)?.label ?? value)
		: null;

	return (
		<Select value={value ?? 'all'} onValueChange={handleValueChange}>
			<SelectTrigger className={cn(value && 'border-primary/30 text-primary')}>
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
