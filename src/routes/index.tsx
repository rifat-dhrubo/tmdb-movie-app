import { createFileRoute } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth';

export const Route = createFileRoute('/')({
	component: App,
});

function App() {
	const auth = useAuth();

	return (
		<div>
			<p>{auth.user?.email ?? 'Signed out'}</p>

			<Button onClick={() => void auth.logout()}> Logout</Button>
		</div>
	);
}
