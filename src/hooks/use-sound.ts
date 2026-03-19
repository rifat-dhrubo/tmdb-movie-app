import React from 'react';

import { useSoundPreferences } from '@/integrations/sound-preferences';
import { decodeAudioData, getAudioContext } from '@/lib/sound-engine';
import type {
	SoundAsset,
	UseSoundOptions,
	UseSoundReturn,
} from '@/lib/sound-types';

export function useSound(
	sound: SoundAsset,
	options: UseSoundOptions = {},
): UseSoundReturn {
	const {
		interrupt = false,
		onEnd,
		onPause,
		onPlay,
		onStop,
		playbackRate = 1,
		soundEnabled = true,
		volume = 1,
	} = options;
	const { soundEnabled: globalSoundEnabled } = useSoundPreferences();
	const isSoundEnabled = globalSoundEnabled && soundEnabled;

	const [isPlaying, setIsPlaying] = React.useState(false);
	const [duration, setDuration] = React.useState<number | null>(sound.duration);
	const sourceRef = React.useRef<AudioBufferSourceNode | null>(null);
	const gainRef = React.useRef<GainNode | null>(null);
	const bufferRef = React.useRef<AudioBuffer | null>(null);

	React.useEffect(() => {
		let cancelled = false;

		void decodeAudioData(sound.dataUri).then((buffer) => {
			if (!cancelled) {
				bufferRef.current = buffer;
				setDuration(buffer.duration);
			}
		});

		return () => {
			cancelled = true;
		};
	}, [sound.dataUri]);

	const stop = React.useCallback(() => {
		if (sourceRef.current) {
			try {
				sourceRef.current.stop();
			} catch {
				// Already stopped
			}

			sourceRef.current = null;
		}

		setIsPlaying(false);
		onStop?.();
	}, [onStop]);

	const play = React.useCallback(
		(overrides?: { playbackRate?: number; volume?: number }) => {
			if (!isSoundEnabled || !bufferRef.current) {
				return;
			}

			const ctx = getAudioContext();

			if (ctx.state === 'suspended') {
				void ctx.resume();
			}

			if (interrupt && sourceRef.current) {
				stop();
			}

			const source = ctx.createBufferSource();
			const gain = ctx.createGain();

			source.buffer = bufferRef.current;
			source.playbackRate.value = overrides?.playbackRate ?? playbackRate;
			gain.gain.value = overrides?.volume ?? volume;

			source.connect(gain);
			gain.connect(ctx.destination);

			source.onended = () => {
				setIsPlaying(false);
				onEnd?.();
			};

			source.start(0);
			sourceRef.current = source;
			gainRef.current = gain;
			setIsPlaying(true);
			onPlay?.();
		},
		[interrupt, isSoundEnabled, onEnd, onPlay, playbackRate, stop, volume],
	);

	const pause = React.useCallback(() => {
		stop();
		onPause?.();
	}, [onPause, stop]);

	React.useEffect(() => {
		if (gainRef.current) {
			gainRef.current.gain.value = volume;
		}
	}, [volume]);

	React.useEffect(() => {
		if (!isSoundEnabled && sourceRef.current) {
			stop();
		}
	}, [isSoundEnabled, stop]);

	React.useEffect(() => {
		return () => {
			if (sourceRef.current) {
				try {
					sourceRef.current.stop();
				} catch {
					// Already stopped
				}
			}
		};
	}, []);

	return [play, { duration, isPlaying, pause, sound, stop }] as const;
}
