import React from 'react';

const SOUND_ENABLED_STORAGE_KEY = 'cine:sound-enabled';

interface SoundPreferencesContextValue {
	soundEnabled: boolean;
	setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
	toggleSoundEnabled: () => void;
}

const SoundPreferencesContext =
	React.createContext<SoundPreferencesContextValue | null>(null);

export function SoundPreferencesProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [hasLoadedPreference, setHasLoadedPreference] = React.useState(false);
	const [soundEnabled, setSoundEnabled] = React.useState(true);

	React.useEffect(() => {
		try {
			const storedValue = window.localStorage.getItem(
				SOUND_ENABLED_STORAGE_KEY,
			);

			if (storedValue === 'true') {
				setSoundEnabled(true);
			}

			if (storedValue === 'false') {
				setSoundEnabled(false);
			}
		} finally {
			setHasLoadedPreference(true);
		}
	}, []);

	React.useEffect(() => {
		if (!hasLoadedPreference) {
			return;
		}

		try {
			window.localStorage.setItem(
				SOUND_ENABLED_STORAGE_KEY,
				String(soundEnabled),
			);
		} catch {
			// Ignore storage failures.
		}
	}, [hasLoadedPreference, soundEnabled]);

	function toggleSoundEnabled() {
		setSoundEnabled((currentValue) => !currentValue);
	}

	return (
		<SoundPreferencesContext.Provider
			value={{ soundEnabled, setSoundEnabled, toggleSoundEnabled }}
		>
			{children}
		</SoundPreferencesContext.Provider>
	);
}

export function useSoundPreferences() {
	const context = React.useContext(SoundPreferencesContext);

	if (!context) {
		throw new Error(
			'useSoundPreferences must be used within a SoundPreferencesProvider',
		);
	}

	return context;
}
