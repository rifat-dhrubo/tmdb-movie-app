import { House } from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';
import { linkOptions } from '@tanstack/react-router';

export const siteHeaderNavItems = [
	linkOptions({
		label: 'Home',
		to: '/',
		icon: House satisfies typeof House,
	}),
	linkOptions({
		label: 'Search',
		to: '/search',
		icon: undefined satisfies typeof House | undefined,
	}),
	linkOptions({
		label: 'Discover',
		to: '/discover',
		icon: undefined satisfies typeof House | undefined,
	}),
	linkOptions({
		label: 'Watchlist',
		to: '/watchlist',
		icon: undefined satisfies typeof House | undefined,
	}),
];

export interface SiteHeaderNavItem {
	label: string;
	to: string;
	icon?: Icon;
}
