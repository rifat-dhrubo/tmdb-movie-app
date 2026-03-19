import { Image } from '@/components/ui/image';
import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';

interface MovieDetailHeroPosterProps {
	posterPath: string | null;
	title: string;
}

export function MovieDetailHeroPoster({
	posterPath,
	title,
}: MovieDetailHeroPosterProps) {
	const imageUrl = buildTmdbImageUrl({
		path: posterPath,
		size: 'w780',
		type: 'poster',
	});

	const fallback = (
		<div className="flex h-full w-full items-center justify-center bg-muted p-8">
			<span className="text-center font-serif text-lg text-muted-foreground">
				{title}
			</span>
		</div>
	);

	return (
		<div className="flex flex-col gap-3">
			<div className="group relative mx-auto w-full max-w-95 lg:mx-0">
				<Image
					alt={title}
					aspectRatio="2/3"
					className="rounded-sm shadow-lg"
					containerClassName="overflow-hidden rounded-sm border border-border/40 shadow-lg bg-muted"
					decoding="async"
					fallback={fallback}
					loading="eager"
					src={imageUrl ?? ''}
				/>
			</div>
		</div>
	);
}
