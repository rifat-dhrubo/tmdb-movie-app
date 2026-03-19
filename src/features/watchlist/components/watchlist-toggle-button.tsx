import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WatchlistToggleButtonProps {
	className?: string;
	disabled?: boolean;
	movieTitle?: string;
	mode?: 'card' | 'hero';
	onClick: () => void;
	pending?: boolean;
	saved: boolean;
}

export function WatchlistToggleButton({
	className,
	disabled,
	mode = 'card',
	movieTitle,
	onClick,
	pending = false,
	saved,
}: WatchlistToggleButtonProps) {
	const label = saved ? 'In Watchlist' : 'Save';
	const actionLabel = saved ? 'Remove from watchlist' : 'Add to watchlist';
	const pendingLabel = saved ? 'Updating watchlist' : 'Saving to watchlist';
	const ariaLabel = movieTitle ? `${actionLabel}: ${movieTitle}` : actionLabel;

	if (mode === 'hero') {
		return (
			<Button
				aria-label={ariaLabel}
				aria-pressed={saved}
				disabled={disabled === true || pending}
				size="lg"
				title={actionLabel}
				type="button"
				variant={saved ? 'secondary' : 'default'}
				className={cn(
					'rounded-full px-4 shadow-sm md:px-5',
					saved
						? 'border-transparent bg-accent text-accent-foreground hover:bg-accent/90'
						: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90',
					className,
				)}
				onClick={onClick}
			>
				{pending ? (
					<>
						<Icon className="size-4 animate-spin" name="spinner_bold" />
						{pendingLabel}
					</>
				) : saved ? (
					<>
						<Icon className="size-4" name="check" />
						In Watchlist
					</>
				) : (
					<>
						<Icon className="size-4" name="bookmark_bold" />
						Add to Watchlist
					</>
				)}
			</Button>
		);
	}

	return (
		<Button
			aria-label={ariaLabel}
			aria-pressed={saved}
			disabled={disabled === true || pending}
			size="sm"
			title={actionLabel}
			type="button"
			variant={saved ? 'secondary' : 'outline'}
			className={cn(
				'motion-pressable rounded-full border px-2.5 shadow-sm backdrop-blur-sm sm:px-3',
				saved
					? 'border-transparent bg-accent text-accent-foreground hover:bg-accent/90'
					: 'border-border/80 bg-background/90 text-foreground hover:bg-background',
				className,
			)}
			onClick={onClick}
		>
			{pending ? (
				<>
					<Icon className="size-3.5 animate-spin" name="spinner_bold" />
					<span className="hidden sm:inline">Updating</span>
				</>
			) : saved ? (
				<>
					<Icon className="size-3.5" name="check" />
					<span className="hidden sm:inline">Saved</span>
				</>
			) : (
				<>
					<Icon className="size-3.5" name="bookmark_bold" />
					<span className="hidden sm:inline">{label}</span>
				</>
			)}
		</Button>
	);
}
