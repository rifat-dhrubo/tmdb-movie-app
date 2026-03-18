export interface CascadeFilm {
	title: string;
	year: number;
	posterPath: string;
}

export const CASCADE_FILMS: Array<CascadeFilm> = [
	{
		title: 'The Godfather',
		year: 1972,
		posterPath: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
	},
	{
		title: "Singin' in the Rain",
		year: 1952,
		posterPath: '/w03EiJVHP8Un77boQeE7hg9DVdU.jpg',
	},
	{
		title: 'All About Eve',
		year: 1950,
		posterPath: '/blBzZaatPWVuWpXEnPscMA4Xp6m.jpg',
	},
	{
		title: 'Inglourious Basterds',
		year: 2009,
		posterPath: '/7sfbEnaARXDDhKm0CZ7D7uc2sbo.jpg',
	},

	{
		title: "It's a Wonderful Life",
		year: 1946,
		posterPath: '/bSqt9rhDZx1Q7UZ86dBPKdNomp2.jpg',
	},
	{
		title: 'Rear Window',
		year: 1954,
		posterPath: '/ILVF0eJxHMddjxeQhswFtpMtqx.jpg',
	},
];

export interface CascadePosition {
	x: number;
	y: number;
	rotate: number;
	zIndex: number;
}

export const CASCADE_ORIGIN_X = 300;

export const CASCADE_POSITIONS: Array<CascadePosition> = [
	{ x: 0, y: 20, rotate: -6, zIndex: 1 },
	{ x: 100, y: 0, rotate: -3, zIndex: 2 },
	{ x: 200, y: 10, rotate: 0, zIndex: 3 },
	{ x: 300, y: -5, rotate: 2, zIndex: 4 },
	{ x: 400, y: 5, rotate: 4, zIndex: 5 },
	{ x: 500, y: -10, rotate: 5, zIndex: 6 },
];

export interface ShelfMovie {
	id: number;
	title: string;
	year: number;
	posterPath: string;
}

export interface Shelf {
	title: string;
	subtitle: string;
	movies: Array<ShelfMovie>;
}

export const SHELVES: Array<Shelf> = [
	{
		title: 'Tonight',
		subtitle: 'Films that reward your full attention',
		movies: [
			{
				id: 1,
				title: 'There Will Be Blood',
				year: 2007,
				posterPath: '/fa0RDkAlCec0STeMNAhPaF89q6U.jpg',
			},
			{
				id: 2,
				title: 'No Country for Old Men',
				year: 2007,
				posterPath: '/6d5XOczc226jECq0LIX0siKtgHR.jpg',
			},
			{
				id: 3,
				title: 'The Master',
				year: 2012,
				posterPath: '/rUSjbyvYWN9H4az8xt0tDtU7I6v.jpg',
			},
			{
				id: 4,
				title: 'Zodiac',
				year: 2007,
				posterPath: '/6YmeO4pB7XTh8P8F960O1uA14JO.jpg',
			},
			{
				id: 5,
				title: 'Prisoners',
				year: 2013,
				posterPath: '/jsS3a3ep2KyBVmmiwaz3LvK49b1.jpg',
			},
			{
				id: 6,
				title: 'Nightcrawler',
				year: 2014,
				posterPath: '/j9HrX8f7GbZQm1BrBiR40uFQZSb.jpg',
			},
			{
				id: 7,
				title: 'Drive',
				year: 2011,
				posterPath: '/602vevIURmpDfzbnv5Ubi6wIkQm.jpg',
			},
			{
				id: 8,
				title: 'Whiplash',
				year: 2014,
				posterPath: '/7fn624j5lj3xTme2SgiLCeuedmO.jpg',
			},
		],
	},
	{
		title: 'For Rainy Sundays',
		subtitle: 'Comfort classics and gentle discoveries',
		movies: [
			{
				id: 9,
				title: 'Before Sunrise',
				year: 1995,
				posterPath: '/kf1Jb1c2JAOqjuzA3H4oDM263uB.jpg',
			},
			{
				id: 10,
				title: 'The Grand Budapest Hotel',
				year: 2014,
				posterPath: '/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',
			},
			{
				id: 11,
				title: 'Amélie',
				year: 2001,
				posterPath: '/nSxDa3M9aMvGVLoItzWTepQ5h5d.jpg',
			},
			{
				id: 12,
				title: 'La La Land',
				year: 2016,
				posterPath: '/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
			},
			{
				id: 13,
				title: 'Midnight in Paris',
				year: 2011,
				posterPath: '/4wBG5kbfagTQclETblPRRGihk0I.jpg',
			},
			{
				id: 14,
				title: 'Her',
				year: 2013,
				posterPath: '/eCOtqtfvn7mxGl6nfmq4b1exJRc.jpg',
			},
			{
				id: 15,
				title: 'Lost in Translation',
				year: 2003,
				posterPath: '/3jCLmYDIIiSMPujbwygNpqdpM8N.jpg',
			},
			{
				id: 16,
				title: 'Eternal Sunshine',
				year: 2004,
				posterPath: '/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg',
			},
		],
	},
];
