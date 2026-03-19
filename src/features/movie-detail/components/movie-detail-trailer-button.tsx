import React from 'react';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { MovieDetailTrailerDialog } from '@/features/movie-detail/components/movie-detail-trailer-dialog';
import { useMovieVideos } from '@/generated/tmdb/default/default';
import type { MovieVideos200ResultsItem } from '@/generated/tmdb/tmdbApi.schemas';

interface MovieDetailTrailerButtonProps {
	movieId: number;
	movieTitle?: string;
}

type PlayableTrailer = MovieVideos200ResultsItem & {
	key: string;
};

const trailerTypeScore: Record<string, number> = {
	Trailer: 40,
	Teaser: 30,
	Clip: 20,
	Featurette: 10,
};

export function MovieDetailTrailerButton({
	movieId,
	movieTitle,
}: MovieDetailTrailerButtonProps) {
	const [open, setOpen] = React.useState(false);
	const { data } = useMovieVideos(movieId, {});

	const trailer = React.useMemo(
		() => selectPreferredTrailer(data?.results),
		[data?.results],
	);

	return trailer ? (
		<>
			<Button size="lg" variant="contrast" onClick={() => setOpen(true)}>
				<Icon name="play_fill" />
				Watch Trailer
			</Button>
			<MovieDetailTrailerDialog
				movieTitle={movieTitle}
				open={open}
				trailerKey={trailer.key}
				trailerName={trailer.name}
				onOpenChange={setOpen}
			/>
		</>
	) : null;
}

function selectPreferredTrailer(
	results: Array<MovieVideos200ResultsItem> | undefined,
): PlayableTrailer | null {
	const candidates =
		results?.filter(
			(video): video is PlayableTrailer =>
				video.site === 'YouTube' &&
				typeof video.key === 'string' &&
				video.key.length > 0,
		) ?? [];

	return (
		[...candidates].sort((left: PlayableTrailer, right: PlayableTrailer) => {
			return (
				scoreTrailer(right) - scoreTrailer(left) ||
				getPublishedAt(right) - getPublishedAt(left)
			);
		})[0] ?? null
	);
}

function scoreTrailer(video: MovieVideos200ResultsItem) {
	const languageScore =
		video.iso_639_1 === 'en' ? 12 : video.iso_639_1 == null ? 6 : 0;
	const officialScore = video.official ? 20 : 0;
	const typeScore = trailerTypeScore[video.type ?? ''] ?? 0;

	return typeScore + officialScore + languageScore;
}

function getPublishedAt(video: MovieVideos200ResultsItem) {
	return video.published_at ? new Date(video.published_at).getTime() : 0;
}
