import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { Icon } from '@/components/icon';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@/components/ui/input-group';

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
		<form className="w-full" onSubmit={handleSubmit}>
			<InputGroup className="h-11">
				<InputGroupInput
					placeholder="Search for films..."
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<InputGroupAddon align="inline-start">
					<Icon
						className="size-4 text-muted-foreground"
						name="magnifying_glass_bold"
					/>
				</InputGroupAddon>
				<InputGroupAddon align="inline-end">
					<InputGroupButton size="sm" type="submit" variant="default">
						Search
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</form>
	);
}
