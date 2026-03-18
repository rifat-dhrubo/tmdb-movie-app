import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function HomeSearchForm() {
	const navigate = useNavigate();
	const [query, setQuery] = React.useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (query.trim()) {
			void navigate({
				to: '/search',
				search: { q: query.trim() },
			});
		}
	};

	return (
		<form className="flex gap-2" onSubmit={handleSubmit}>
			<div className="relative flex-1">
				<svg
					className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					viewBox="0 0 24 24"
				>
					<path
						d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<Input
					className="rounded-md border-border/60 bg-background pl-10"
					placeholder="Search for films..."
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</div>
			<Button className="motion-pressable" type="submit" variant="default">
				Search
			</Button>
		</form>
	);
}
