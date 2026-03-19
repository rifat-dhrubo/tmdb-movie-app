import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MovieDetailSectionErrorProps {
	title: string;
	message: string;
	onRetry: () => void;
	className?: string;
}

export function MovieDetailSectionError({
	className,
	message,
	onRetry,
	title,
}: MovieDetailSectionErrorProps) {
	return (
		<div className={cn(className)}>
			<h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
				{title}
			</h2>
			<p className="text-sm text-muted-foreground">
				{message}{' '}
				<Button className="h-auto p-0 text-sm" variant="link" onClick={onRetry}>
					Try again
				</Button>
			</p>
		</div>
	);
}
