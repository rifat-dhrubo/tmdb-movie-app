import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { useSoundPreferences } from '@/integrations/sound-preferences';

export function SoundToggle() {
	const { soundEnabled, toggleSoundEnabled } = useSoundPreferences();

	return (
		<Button
			aria-label={soundEnabled ? 'Turn sound off' : 'Turn sound on'}
			aria-pressed={soundEnabled}
			size="icon"
			title={soundEnabled ? 'Sound on' : 'Sound off'}
			variant="ghost"
			onClick={toggleSoundEnabled}
		>
			{soundEnabled ? (
				<Icon className="h-[1.2rem] w-[1.2rem]" name="speaker_high" />
			) : (
				<Icon className="h-[1.2rem] w-[1.2rem]" name="speaker_slash" />
			)}
		</Button>
	);
}
