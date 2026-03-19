import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';

interface CastDetailErrorProps {
	message: string;
	onRetry: () => void;
	title: string;
}

export function CastDetailError({
	message,
	onRetry,
	title,
}: CastDetailErrorProps) {
	return (
		<div className="rounded-lg border border-border bg-muted p-6">
			<div className="flex items-start gap-4">
				<div className="rounded-full bg-foreground p-2">
					<Icon className="size-5 text-background" name="warning_bold" />
				</div>
				<div className="flex-1">
					<h3 className="font-serif text-lg text-foreground">{title}</h3>
					<p className="mt-1 text-sm text-muted-foreground">{message}</p>
					<Button
						className="mt-4"
						size="sm"
						variant="outline"
						onClick={onRetry}
					>
						Retry
					</Button>
				</div>
			</div>
		</div>
	);
}
