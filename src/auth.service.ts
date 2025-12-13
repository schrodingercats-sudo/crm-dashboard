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
        });
    }

    async loginWithGoogle(flow: 'login' | 'signup' = 'login') {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(this.auth, provider);
            const additionalUserInfo = getAdditionalUserInfo(result);

            if (flow === 'login' && additionalUserInfo?.isNewUser) {
                await deleteUser(result.user);
                throw new Error("Account does not exist. Please sign up.");
            }

            this.setLastUsed();
            this.router.navigate(['/dashboard']);
            return result.user;
        } catch (error) {
            console.error('Google login error:', error);
            throw error;
        }
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
