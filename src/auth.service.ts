import { Injectable, inject, signal } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, Auth, getAdditionalUserInfo, deleteUser } from 'firebase/auth';
import { Router } from '@angular/router';

const firebaseConfig = {
    apiKey: "AIzaSyCWqmOiSs08mXXtNVpJhGb7_SG0kcyLWQ0",
    authDomain: "zyptenix-ab.firebaseapp.com",
    projectId: "zyptenix-ab",
    storageBucket: "zyptenix-ab.firebasestorage.app",
    messagingSenderId: "710758393566",
    appId: "1:710758393566:web:6c008994a556ec3691044f",
    measurementId: "G-S10E7B3ZKJ"
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private app = initializeApp(firebaseConfig);
    private auth: Auth = getAuth(this.app);
    private router = inject(Router);

    currentUser = signal<User | null>(null);

    constructor() {
        onAuthStateChanged(this.auth, (user) => {
            this.currentUser.set(user);
            if (user && this.isAdmin(user.email)) {
                const currentUrl = this.router.url;
                if (currentUrl === '/' || currentUrl === '/login') {
                    this.router.navigate(['/dashboard']);
                }
            }
        });
    }

    private readonly ADMIN_EMAILS = ['pratham.solanki30@gmail.com'];

    async loginWithGoogle(flow: 'login' | 'signup' = 'login') {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(this.auth, provider);
            const userEmail = result.user.email;

            if (!userEmail || !this.ADMIN_EMAILS.includes(userEmail)) {
                await deleteUser(result.user).catch(() => { }); // Cleanup if possible/needed
                await this.logout(); // Ensure signed out
                throw new Error("Unauthorized Access: You are not an admin.");
            }

            const additionalUserInfo = getAdditionalUserInfo(result);

            if (flow === 'login' && additionalUserInfo?.isNewUser) {
                // For admin, we might strictly allow new users if they are in the whitelist, 
                // but the original code had logic to block new users on 'login' flow.
                // Since they are whitelisted, we can probably allow it, OR maintain the logic.
                // Let's assume if they are whitelisted, they are allowed regardless of "new-ness" for now,
                // OR stick to the previous logic. The previous logic threw "Account does not exist".
                // Given the explicit whitelist, it's safer to just allow them if they match.
                // BUT, sticking to previous behavior + whitelist:
                // If valid admin email, we allow.
            }

            this.setLastUsed();
            this.router.navigate(['/dashboard']);
            return result.user;
        } catch (error) {
            console.error('Google login error:', error);
            throw error;
        }
    }

    isAdmin(email: string | null | undefined): boolean {
        return !!email && this.ADMIN_EMAILS.includes(email);
    }

    async loginWithEmail(email: string, password: string) {
        try {
            const result = await signInWithEmailAndPassword(this.auth, email, password);
            this.setLastUsed();
            this.router.navigate(['/dashboard']);
            return result.user;
        } catch (error) {
            console.error('Email login error:', error);
            throw error;
        }
    }

    async signUpWithEmail(email: string, password: string) {
        try {
            const result = await createUserWithEmailAndPassword(this.auth, email, password);
            this.setLastUsed();
            this.router.navigate(['/dashboard']);
            return result.user;
        } catch (error) {
            console.error('Sign up error:', error);
            throw error;
        }
    }

    async logout() {
        try {
            await signOut(this.auth);
            this.router.navigate(['/']);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }

    private setLastUsed() {
        localStorage.setItem('lastUsed', 'true');
    }
}
