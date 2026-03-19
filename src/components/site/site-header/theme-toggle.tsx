import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { useSound } from '@/hooks/use-sound';
import { hoverTickSound } from '@/lib/hover-tick';

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [playHoverTick] = useSound(hoverTickSound);

	function toggleTheme() {
		playHoverTick();

		if (resolvedTheme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	}

	return (
		<Button
			aria-label="Toggle theme"
			size="icon"
			variant="ghost"
			onClick={toggleTheme}
		>
			<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
		</Button>
	);
}
