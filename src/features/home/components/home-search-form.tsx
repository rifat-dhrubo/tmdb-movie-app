import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { Icon } from '@/components/icon';
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
				<Icon
					className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
					name="magnifying_glass_bold"
				/>
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
