import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import React from 'react';
import { flushSync } from 'react-dom';

import { AuthContext } from './auth-context';

import { auth } from '@/lib/firebase/config';

export function AuthContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUser] = React.useState<User | null>(auth.currentUser);
	const [isInitialLoading, setIsInitialLoading] = React.useState(true);
	const isAuthenticated = !!user;

	React.useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (userInfo) => {
			flushSync(() => {
				setUser(userInfo);
				setIsInitialLoading(false);
			});
		});
		return () => unsubscribe();
	}, []);

	const logout = async () => {
		console.log('Logging out...');
		await signOut(auth);
		setUser(null);
		setIsInitialLoading(false);
	};

	const signInWithEmail = async (email: string, password: string) => {
		const result = await signInWithEmailAndPassword(auth, email, password);
		flushSync(() => {
			setUser(result.user);
			setIsInitialLoading(false);
		});
	};

	const signUpWithEmail = async (email: string, password: string) => {
		const result = await createUserWithEmailAndPassword(auth, email, password);
		flushSync(() => {
			setUser(result.user);
			setIsInitialLoading(false);
		});
	};

	return (
		<AuthContext.Provider
			value={{
				isInitialLoading,
				isAuthenticated,
				user,
				logout,
				signInWithEmail,
				signUpWithEmail,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
