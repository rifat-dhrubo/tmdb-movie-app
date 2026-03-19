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
	{ x: 0, y: 25, rotate: -10, zIndex: 1 },
	{ x: 65, y: 10, rotate: -5, zIndex: 2 },
	{ x: 130, y: 0, rotate: -1, zIndex: 3 },
	{ x: 195, y: 0, rotate: 2, zIndex: 4 },
	{ x: 260, y: 8, rotate: 5, zIndex: 5 },
	{ x: 325, y: 20, rotate: 8, zIndex: 6 },
];

export interface ShelfMovie {
	id: number;
	title: string;
	year: number;
	posterPath: string;
	rating: number;
	director?: string;
	genres: Array<string>;
	catalogNumber?: string;
}

export interface Shelf {
	title: string;
	subtitle: string;
	movies: Array<ShelfMovie>;
	badge?: string;
}

export const SHELVES: Array<Shelf> = [
	{
		title: 'Trending',
		subtitle: 'What people are watching right now.',
		movies: [
			{
				id: 1,
				title: 'There Will Be Blood',
				year: 2007,
				posterPath: '/fa0RDkAlCec0STeMNAhPaF89q6U.jpg',
				rating: 8.2,
				director: 'Paul Thomas Anderson',
				genres: ['Drama', 'History'],
				catalogNumber: '001A',
			},
			{
				id: 2,
				title: 'No Country for Old Men',
				year: 2007,
				posterPath: '/6d5XOczc226jECq0LIX0siKtgHR.jpg',
				rating: 8.2,
				director: 'Joel Coen, Ethan Coen',
				genres: ['Crime', 'Thriller'],
				catalogNumber: '002A',
			},
			{
				id: 3,
				title: 'The Master',
				year: 2012,
				posterPath: '/rUSjbyvYWN9H4az8xt0tDtU7I6v.jpg',
				rating: 7.2,
				director: 'Paul Thomas Anderson',
				genres: ['Drama'],
				catalogNumber: '003A',
			},
			{
				id: 4,
				title: 'Zodiac',
				year: 2007,
				posterPath: '/6YmeO4pB7XTh8P8F960O1uA14JO.jpg',
				rating: 7.7,
				director: 'David Fincher',
				genres: ['Crime', 'Drama', 'Mystery'],
				catalogNumber: '004A',
			},
			{
				id: 5,
				title: 'Prisoners',
				year: 2013,
				posterPath: '/jsS3a3ep2KyBVmmiwaz3LvK49b1.jpg',
				rating: 8.2,
				director: 'Denis Villeneuve',
				genres: ['Crime', 'Drama', 'Thriller'],
				catalogNumber: '005A',
			},
			{
				id: 6,
				title: 'Nightcrawler',
				year: 2014,
				posterPath: '/j9HrX8f7GbZQm1BrBiR40uFQZSb.jpg',
				rating: 7.8,
				director: 'Dan Gilroy',
				genres: ['Crime', 'Drama', 'Thriller'],
				catalogNumber: '006A',
			},
			{
				id: 7,
				title: 'Drive',
				year: 2011,
				posterPath: '/602vevIURmpDfzbnv5Ubi6wIkQm.jpg',
				rating: 7.8,
				director: 'Nicolas Winding Refn',
				genres: ['Action', 'Crime', 'Drama'],
				catalogNumber: '007A',
			},
			{
				id: 8,
				title: 'Whiplash',
				year: 2014,
				posterPath: '/7fn624j5lj3xTme2SgiLCeuedmO.jpg',
				rating: 8.5,
				director: 'Damien Chazelle',
				genres: ['Drama', 'Music'],
				catalogNumber: '008A',
			},
		],
	},
	{
		title: 'Popular',
		subtitle: 'The ones people keep coming back to.',
		movies: [
			{
				id: 9,
				title: 'Before Sunrise',
				year: 1995,
				posterPath: '/kf1Jb1c2JAOqjuzA3H4oDM263uB.jpg',
				rating: 8.1,
				director: 'Richard Linklater',
				genres: ['Drama', 'Romance'],
				catalogNumber: '009A',
			},
			{
				id: 10,
				title: 'The Grand Budapest Hotel',
				year: 2014,
				posterPath: '/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',
				rating: 8.1,
				director: 'Wes Anderson',
				genres: ['Adventure', 'Comedy', 'Crime'],
				catalogNumber: '010A',
			},
			{
				id: 11,
				title: 'Amélie',
				year: 2001,
				posterPath: '/nSxDa3M9aMvGVLoItzWTepQ5h5d.jpg',
				rating: 8.3,
				director: 'Jean-Pierre Jeunet',
				genres: ['Comedy', 'Romance'],
				catalogNumber: '011A',
			},
			{
				id: 12,
				title: 'La La Land',
				year: 2016,
				posterPath: '/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
				rating: 8.0,
				director: 'Damien Chazelle',
				genres: ['Comedy', 'Drama', 'Music'],
				catalogNumber: '012A',
			},
			{
				id: 13,
				title: 'Midnight in Paris',
				year: 2011,
				posterPath: '/4wBG5kbfagTQclETblPRRGihk0I.jpg',
				rating: 7.7,
				director: 'Woody Allen',
				genres: ['Comedy', 'Fantasy', 'Romance'],
				catalogNumber: '013A',
			},
			{
				id: 14,
				title: 'Her',
				year: 2013,
				posterPath: '/eCOtqtfvn7mxGl6nfmq4b1exJRc.jpg',
				rating: 8.0,
				director: 'Spike Jonze',
				genres: ['Drama', 'Romance', 'Sci-Fi'],
				catalogNumber: '014A',
			},
			{
				id: 15,
				title: 'Lost in Translation',
				year: 2003,
				posterPath: '/3jCLmYDIIiSMPujbwygNpqdpM8N.jpg',
				rating: 7.7,
				director: 'Sofia Coppola',
				genres: ['Comedy', 'Drama'],
				catalogNumber: '015A',
			},
			{
				id: 16,
				title: 'Eternal Sunshine',
				year: 2004,
				posterPath: '/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg',
				rating: 8.3,
				director: 'Michel Gondry',
				genres: ['Drama', 'Romance', 'Sci-Fi'],
				catalogNumber: '016A',
			},
		],
	},
];
