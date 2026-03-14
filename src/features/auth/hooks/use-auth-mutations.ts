import { useMutation } from '@tanstack/react-query';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'node_modules/@tanstack/react-router/dist/esm/useNavigate';

import { auth } from '@/lib/firebase/config';

interface AuthCredentials {
	email: string;
	password: string;
}

export function useSignInMutation() {
	const navigate = useNavigate();
	return useMutation({
		mutationFn: async ({ email, password }: AuthCredentials) => {
			const result = await signInWithEmailAndPassword(auth, email, password);
			return result.user;
		},
		onSuccess() {
			void navigate({ to: '/' });
		},
	});
}

export function useSignUpMutation() {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async ({ email, password }: AuthCredentials) => {
			const result = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			return result.user;
		},
		onSuccess() {
			void navigate({ to: '/sign-in' });
		},
	});
}
