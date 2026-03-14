import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import React from 'react';
import { flushSync } from 'react-dom';

import { auth } from '@/lib/firebase/config';

export interface AuthContextType {
	isAuthenticated: boolean;
	isInitialLoading: boolean;
	logout: () => Promise<void>;
	signInWithEmail: (email: string, password: string) => Promise<void>;
	signUpWithEmail: (email: string, password: string) => Promise<void>;
	user: User | null;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

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

export function useAuth() {
	const context = React.useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
