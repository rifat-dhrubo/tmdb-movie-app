import { useDebouncedValue } from '@tanstack/react-pacer';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import React from 'react';

import { SearchInputSectionYearFilter } from './search-input-section-year-filter';

import { Icon } from '@/components/icon';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '@/components/ui/input-group';

export function SearchInputSection() {
	const navigate = useNavigate({ from: '/search' });
	const { q: queryParam, year } = useSearch({ from: '/_app/search' });
	const committedQuery = queryParam?.trim() ?? '';
	const [inputValue, setInputValue] = React.useState(committedQuery);
	const [debouncedInputValue] = useDebouncedValue(inputValue, { wait: 300 });
	const hasQuery = committedQuery.length > 0;

	React.useEffect(() => {
		setInputValue((currentValue) =>
			currentValue === committedQuery ? currentValue : committedQuery,
		);
	}, [committedQuery]);

	React.useEffect(() => {
		const nextQuery = debouncedInputValue.trim();

		if (nextQuery === committedQuery) {
			return;
		}

		void navigate({
			to: '/search',
			replace: true,
			resetScroll: false,
			search: {
				q: nextQuery || undefined,
				year,
			},
		});
	}, [committedQuery, debouncedInputValue, navigate, year]);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const nextQuery = inputValue.trim();

		void navigate({
			to: '/search',
			resetScroll: false,
			search: {
				q: nextQuery || undefined,
				year,
			},
		});
	}

	function handleYearChange(nextYear: string | undefined) {
		void navigate({
			to: '/search',
			resetScroll: false,
			search: {
				q: committedQuery || undefined,
				year: nextYear,
			},
		});
	}

	return (
		<div className="mx-auto max-w-2xl">
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
						placeholder="Search for films..."
						type="text"
						value={inputValue}
						onChange={(event) => setInputValue(event.target.value)}
					/>
				</InputGroup>
			</form>

			{hasQuery ? (
				<div className="mt-4 flex flex-wrap items-center justify-between gap-2">
					<div className="flex flex-wrap items-center gap-2">
						<SearchInputSectionYearFilter
							value={year}
							onChange={handleYearChange}
						/>
					</div>
					<Link
						className="text-sm text-muted-foreground transition-colors hover:text-foreground"
						to="/discover"
					>
						Want to filter by genre? Try Discover →
					</Link>
				</div>
			) : null}
		</div>
	);
}
