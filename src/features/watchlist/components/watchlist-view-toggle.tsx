import { Icon } from '@/components/icon';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { WatchlistViewMode } from '@/features/watchlist';

interface WatchlistViewToggleProps {
	onViewChange: (nextView: WatchlistViewMode) => void;
	view: WatchlistViewMode;
}

export function WatchlistViewToggle({
	onViewChange,
	view,
}: WatchlistViewToggleProps) {
	return (
		<Tabs
			className="w-full max-w-[260px] lg:w-auto"
			value={view}
			onValueChange={(value) => onViewChange(value as WatchlistViewMode)}
		>
			<TabsList className="w-full rounded-full border border-border/60 p-1 shadow-sm backdrop-blur">
				<TabsTrigger
					className="flex-1 gap-2 rounded-full px-4 py-2"
					value="list"
				>
					<Icon className="size-4" name="list_bold" />
					List
				</TabsTrigger>
				<TabsTrigger className="flex-1 rounded-full px-4 py-2" value="grid">
					Grid
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
