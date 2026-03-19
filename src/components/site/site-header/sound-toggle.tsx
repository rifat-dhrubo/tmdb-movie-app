import { SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';

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
				<SpeakerHigh className="h-[1.2rem] w-[1.2rem]" />
			) : (
				<SpeakerSlash className="h-[1.2rem] w-[1.2rem]" />
			)}
		</Button>
	);
}
