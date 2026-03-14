// The types are taken from the TMDB API configuration response, but the actual config is hardcoded here since it doesn't change often and we want to avoid an extra API call.
const TMDB_IMAGE_CONFIG = {
	images: {
		base_url: 'http://image.tmdb.org/t/p/',
		secure_base_url: 'https://image.tmdb.org/t/p/',
		backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
		logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
		poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
		profile_sizes: ['w45', 'w185', 'h632', 'original'],
		still_sizes: ['w92', 'w185', 'w300', 'original'],
	},
} as const;

type TmdbImageConfig = typeof TMDB_IMAGE_CONFIG.images;

type ImageType = 'backdrop' | 'logo' | 'poster' | 'profile' | 'still';

interface ImageSizeMap {
	backdrop: TmdbImageConfig['backdrop_sizes'][number];
	logo: TmdbImageConfig['logo_sizes'][number];
	poster: TmdbImageConfig['poster_sizes'][number];
	profile: TmdbImageConfig['profile_sizes'][number];
	still: TmdbImageConfig['still_sizes'][number];
}

interface DefaultSizeMap {
	backdrop: 'w780';
	logo: 'w185';
	poster: 'w500';
	profile: 'w185';
	still: 'w300';
}

const DEFAULT_IMAGE_SIZES: DefaultSizeMap = {
	backdrop: 'w780',
	logo: 'w185',
	poster: 'w500',
	profile: 'w185',
	still: 'w300',
};

interface BuildTmdbImageUrlOptions<T extends ImageType> {
	type: T;
	path: string | null | undefined;
	size?: ImageSizeMap[T];
	secure?: boolean;
}

export function buildTmdbImageUrl<T extends ImageType>({
	path,
	secure = true,
	size,
	type,
}: BuildTmdbImageUrlOptions<T>): string | null {
	if (!path) return null;

	const baseUrl = secure
		? TMDB_IMAGE_CONFIG.images.secure_base_url
		: TMDB_IMAGE_CONFIG.images.base_url;

	const resolvedSize = size ?? DEFAULT_IMAGE_SIZES[type];
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;

	return `${baseUrl}${resolvedSize}${normalizedPath}`;
}
