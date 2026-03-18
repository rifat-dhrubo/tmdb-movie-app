import type React from 'react';

import { Icon } from '@/components/icon';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '@/components/ui/input-group';

interface SearchInputProps {
	onChange: (value: string) => void;
	onSubmit: (value: string) => void;
	placeholder?: string;
	value: string;
}

export function SearchInput({
	onChange,
	onSubmit,
	placeholder = 'Search for films...',
	value,
}: SearchInputProps) {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (value.trim()) {
			onSubmit(value.trim());
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<InputGroup className="h-12">
				<InputGroupAddon align="inline-start">
					<Icon
						className="size-5 text-muted-foreground"
						name="magnifying_glass_bold"
					/>
				</InputGroupAddon>
				<InputGroupInput
					aria-label="Search for films"
					className="text-base"
					placeholder={placeholder}
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
			</InputGroup>
		</form>
	);
}
