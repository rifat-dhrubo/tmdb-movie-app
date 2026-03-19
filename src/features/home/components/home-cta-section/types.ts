export interface CtaContent {
	badge: string;
	headline: [string, string];
	accentWord: string;
	body: string;
	primaryCta: { text: string; href: '/sign-up' | '/watchlist' };
	secondaryCta: { text: string; href: '/search' | '/sign-in' };
	footnote: string;
}

export interface PosterSource {
	posterPath: string;
	title: string;
}
