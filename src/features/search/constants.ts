import { z } from 'zod';

export const searchSchema = z.object({
	q: z.string().optional(),
	year: z.string().optional(),
});

export const PRESET_YEARS = [
	{ label: '2020s', value: '2020' },
	{ label: '2010s', value: '2010' },
	{ label: '2000s', value: '2000' },
	{ label: '1990s', value: '1990' },
	{ label: '1980s', value: '1980' },
	{ label: 'Classic', value: '1970' },
] as const;
