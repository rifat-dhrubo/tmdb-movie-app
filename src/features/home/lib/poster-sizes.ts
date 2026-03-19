// Poster size classes shared across components
export const posterSizeClasses = {
	sm: 'w-28 md:w-32',
	md: 'w-32 md:w-40',
	lg: 'w-40 md:w-48',
	xl: 'w-44 md:w-56',
} as const;

export type PosterSize = keyof typeof posterSizeClasses;

// CTA poster rail size classes (different sizing scale)
export const ctaPosterSizeClasses = {
	sm: 'w-20 lg:w-24 xl:w-28',
	md: 'w-24 lg:w-28 xl:w-32',
} as const;

export type CtaPosterSize = keyof typeof ctaPosterSizeClasses;
