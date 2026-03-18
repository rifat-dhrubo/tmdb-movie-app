import { Link } from '@tanstack/react-router';

export function SiteLogo() {
	return (
		<Link className="flex items-center gap-2" to="/">
			<img
				alt="Cine"
				className="size-8 rounded-full object-cover"
				height="32"
				src="/logo192.png"
				width="32"
			/>
		</Link>
	);
}
