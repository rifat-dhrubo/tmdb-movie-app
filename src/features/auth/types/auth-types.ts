import type { User } from 'firebase/auth';

export interface AuthContextType {
	isAuthenticated: boolean;
	isInitialLoading: boolean;
	logout: () => Promise<void>;
	signInWithEmail: (email: string, password: string) => Promise<void>;
	signUpWithEmail: (email: string, password: string) => Promise<void>;
	user: User | null;
}
