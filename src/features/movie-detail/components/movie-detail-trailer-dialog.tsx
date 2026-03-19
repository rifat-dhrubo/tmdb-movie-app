import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

interface MovieDetailTrailerDialogProps {
	movieTitle?: string;
	onOpenChange: (open: boolean) => void;
	open: boolean;
	trailerKey: string;
	trailerName?: string;
}

const dialogDescription =
	'Watch the selected trailer without leaving the movie page.';

export function MovieDetailTrailerDialog({
	movieTitle,
	onOpenChange,
	open,
	trailerKey,
	trailerName,
}: MovieDetailTrailerDialogProps) {
	const embedUrl = buildYoutubeEmbedUrl(trailerKey);
	const title = movieTitle ? `${movieTitle} Trailer` : 'Movie Trailer';
	const description =
		trailerName && trailerName !== title ? trailerName : dialogDescription;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="w-[min(calc(100vw-1rem),72rem)] max-w-none overflow-hidden border-border/60 bg-background p-0 sm:w-[min(calc(100vw-2rem),72rem)]">
				<DialogHeader className="border-b border-border/60 bg-background/95 px-4 pt-4 pr-14 pb-3 backdrop-blur-xl sm:px-6 sm:pt-5 sm:pr-16">
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				<div className="bg-black">
					{open ? (
						<iframe
							allowFullScreen
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							className="aspect-video h-auto w-full"
							referrerPolicy="strict-origin-when-cross-origin"
							src={embedUrl}
							title={title}
						/>
					) : null}
				</div>
			</DialogContent>
		</Dialog>
	);
}

function buildYoutubeEmbedUrl(trailerKey: string) {
	const params = new URLSearchParams({
		autoplay: '1',
		modestbranding: '1',
		playsinline: '1',
		rel: '0',
	});

	return `https://www.youtube-nocookie.com/embed/${trailerKey}?${params.toString()}`;
}
