import { Injectable, inject, signal } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, Auth, getAdditionalUserInfo, deleteUser } from 'firebase/auth';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { SupabaseService } from './supabase.service';
import { environment } from './environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private app = initializeApp(environment.firebase);
    private auth: Auth = getAuth(this.app);
    private router = inject(Router);
    private toastService = inject(ToastService);
    private supabaseService = inject(SupabaseService);

    currentUser = signal<User | null>(null);
    isLoading = signal<boolean>(false);
    authError = signal<string | null>(null);
    private isExplicitLogout = false;

    private readonly ADMIN_EMAILS = ['pratham.solanki30@gmail.com'];

    constructor() {
        onAuthStateChanged(this.auth, (user) => {
            try {
                this.currentUser.set(user);
                this.authError.set(null);
                
                if (user) {
                    const currentUrl = this.router.url;
                    // Only auto-navigate if user is on login/home page and not explicitly logging out
                    if ((currentUrl === '/' || currentUrl === '/login') && !this.isExplicitLogout) {
                        // Handle async operation without blocking
                        this.handleUserAuthentication(user).catch(error => {
                            console.error('Error in handleUserAuthentication:', error);
                            this.handleNavigationFallback('Failed to process user authentication');
                        });
                    }
                    
                    // Refresh data filtering when user changes
                    this.refreshDataServices();
                }
                
                // Reset logout flag after processing
                this.isExplicitLogout = false;
            } catch (error) {
                console.error('Auth state change error:', error);
                this.handleAuthError(error, 'Failed to process authentication state');
            }
        });
    }

    private refreshDataServices() {
        // This will be called when user authentication state changes
        // Services will re-filter their data based on the new user
        try {
            // The services will automatically refresh their filtered data
            // when their computed properties are re-evaluated
        } catch (error) {
            console.error('Error refreshing data services:', error);
        }
    }

    async loginWithGoogle(flow: 'login' | 'signup' = 'login') {
        const provider = new GoogleAuthProvider();
        
        // Add scopes to ensure we get profile information including photo
        provider.addScope('profile');
        provider.addScope('email');
        
        // Force account selection to prevent automatic login with cached account
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        
        this.isLoading.set(true);
        this.authError.set(null);
        
        try {
            const result = await signInWithPopup(this.auth, provider);
            this.setLastUsed();
            await this.handleUserAuthentication(result.user);
            this.toastService.show('Successfully logged in with Google', 'success');
            return result.user;
        } catch (error: any) {
            console.error('Google login error:', error);
            this.handleAuthError(error, 'Failed to login with Google');
            throw error;
        } finally {
            this.isLoading.set(false);
        }
    }

    isAdmin(email: string | null | undefined): boolean {
        try {
            return !!email && this.ADMIN_EMAILS.includes(email);
        } catch (error) {
            console.error('Error checking admin status:', error);
            // Fallback to false for safety
            return false;
        }
    }

    async loginWithEmail(email: string, password: string) {
        this.isLoading.set(true);
        this.authError.set(null);
        
        try {
            const result = await signInWithEmailAndPassword(this.auth, email, password);
            this.setLastUsed();
            await this.handleUserAuthentication(result.user);
            this.toastService.show('Successfully logged in', 'success');
            return result.user;
        } catch (error: any) {
            console.error('Email login error:', error);
            this.handleAuthError(error, 'Failed to login with email');
            throw error;
        } finally {
            this.isLoading.set(false);
        }
    }

    async signUpWithEmail(email: string, password: string) {
        this.isLoading.set(true);
        this.authError.set(null);
        
        try {
            const result = await createUserWithEmailAndPassword(this.auth, email, password);
            this.setLastUsed();
            await this.handleUserAuthentication(result.user, true);
            this.toastService.show('Account created successfully', 'success');
            return result.user;
        } catch (error: any) {
            console.error('Sign up error:', error);
            this.handleAuthError(error, 'Failed to create account');
            throw error;
        } finally {
            this.isLoading.set(false);
        }
    }

    private async handleUserAuthentication(user: User, isNewUser: boolean = false) {
        try {
            if (!user || !user.email) {
                console.error('Invalid user object for authentication');
                this.handleNavigationFallback('Invalid user data');
                return;
            }

            // Check if user profile exists in Supabase
            let userProfile;
            try {
                userProfile = await this.supabaseService.getUserProfile(user.uid);
            } catch (error) {
                // User profile doesn't exist, create it
                console.log('Creating new user profile in Supabase');
                userProfile = await this.supabaseService.createUserProfile({
                    user_id: user.uid,
                    email: user.email,
                    full_name: user.displayName || '',
                    avatar_url: user.photoURL || '',
                    role: this.isAdmin(user.email) ? 'admin' : 'user',
                    onboarding_completed: false
                });
            }

            // Check if onboarding is completed
            if (!userProfile.onboarding_completed) {
                // Redirect to onboarding
                this.router.navigate(['/onboarding']).catch(error => {
                    console.error('Navigation to onboarding failed:', error);
                    this.handleNavigationFallback('Failed to navigate to onboarding');
                });
                return;
            }

            // User has completed onboarding, navigate to dashboard
            this.navigateBasedOnRole(user);
        } catch (error) {
            console.error('Error handling user authentication:', error);
            this.handleNavigationFallback('Failed to process user authentication');
        }
    }

    private navigateBasedOnRole(user: User) {
        try {
            if (!user || !user.email) {
                console.error('Invalid user object for navigation');
                this.handleNavigationFallback('Invalid user data');
                return;
            }

            if (this.isAdmin(user.email)) {
                // Admin goes to admin dashboard
                this.router.navigate(['/admin/dashboard/overview']).catch(error => {
                    console.error('Navigation to admin dashboard failed:', error);
                    this.handleNavigationFallback('Failed to navigate to admin dashboard');
                });
            } else {
                // Regular user goes to user dashboard
                this.router.navigate(['/user/dashboard/overview']).catch(error => {
                    console.error('Navigation to user dashboard failed:', error);
                    this.handleNavigationFallback('Failed to navigate to user dashboard');
                });
            }
        } catch (error) {
            console.error('Role-based navigation error:', error);
            this.handleNavigationFallback('Failed to determine user role');
        }
    }

    async logout() {
        this.isLoading.set(true);
        this.authError.set(null);
        this.isExplicitLogout = true; // Flag to prevent auto-redirect
        
        try {
            await signOut(this.auth);
            // Clear any stored authentication data
            try {
                localStorage.removeItem('lastUsed');
            } catch (error) {
                console.error('Failed to clear localStorage:', error);
            }
            
            this.router.navigate(['/']);
            this.toastService.show('Successfully logged out', 'info');
        } catch (error: any) {
            console.error('Logout error:', error);
            this.handleAuthError(error, 'Failed to logout');
            throw error;
        } finally {
            this.isLoading.set(false);
        }
    }

    private setLastUsed() {
        try {
            localStorage.setItem('lastUsed', 'true');
        } catch (error) {
            console.error('Failed to set localStorage:', error);
            // Non-critical error, continue execution
        }
    }

    /**
     * Handles authentication errors with user-friendly messages
     */
    private handleAuthError(error: any, defaultMessage: string) {
        let userMessage = defaultMessage;
        
        if (error?.code) {
            switch (error.code) {
                case 'auth/user-not-found':
                    userMessage = 'No account found with this email address';
                    break;
                case 'auth/wrong-password':
                    userMessage = 'Incorrect password';
                    break;
                case 'auth/email-already-in-use':
                    userMessage = 'An account with this email already exists';
                    break;
                case 'auth/weak-password':
                    userMessage = 'Password should be at least 6 characters';
                    break;
                case 'auth/invalid-email':
                    userMessage = 'Invalid email address';
                    break;
                case 'auth/network-request-failed':
                    userMessage = 'Network error. Please check your connection and try again';
                    break;
                case 'auth/too-many-requests':
                    userMessage = 'Too many failed attempts. Please try again later';
                    break;
                case 'auth/popup-closed-by-user':
                    userMessage = 'Login cancelled';
                    break;
                case 'auth/popup-blocked':
                    userMessage = 'Popup blocked. Please allow popups and try again';
                    break;
                default:
                    userMessage = defaultMessage;
            }
        }
        
        this.authError.set(userMessage);
        this.toastService.show(userMessage, 'error');
    }

    /**
     * Handles navigation fallback when role-based routing fails
     */
    private handleNavigationFallback(errorMessage: string) {
        console.error('Navigation fallback triggered:', errorMessage);
        this.toastService.show('Navigation error. Redirecting to dashboard...', 'error');
        
        // Fallback to basic dashboard route
        this.router.navigate(['/dashboard']).catch(fallbackError => {
            console.error('Fallback navigation also failed:', fallbackError);
            // Ultimate fallback to home page
            this.router.navigate(['/']).catch(ultimateError => {
                console.error('Ultimate fallback navigation failed:', ultimateError);
                this.toastService.show('Critical navigation error. Please refresh the page.', 'error');
            });
        });
    }

    /**
     * Retry mechanism for authentication operations
     */
    async retryAuthOperation<T>(operation: () => Promise<T>, maxRetries: number = 3): Promise<T> {
        let lastError: any;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await operation();
            } catch (error: any) {
                lastError = error;
                
                // Don't retry for certain error types
                if (error?.code && [
                    'auth/user-not-found',
                    'auth/wrong-password',
                    'auth/email-already-in-use',
                    'auth/weak-password',
                    'auth/invalid-email'
                ].includes(error.code)) {
                    throw error;
                }
                
                if (attempt < maxRetries) {
                    console.log(`Auth operation attempt ${attempt} failed, retrying...`);
                    // Exponential backoff
                    await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
                }
            }
        }
        
        throw lastError;
    }

    /**
     * Checks if the current authentication state is valid
     */
    isAuthStateValid(): boolean {
        try {
            const user = this.currentUser();
            return user !== null && user.email !== null;
        } catch (error) {
            console.error('Error checking auth state validity:', error);
            return false;
        }
    }

    /**
     * Gets user role with fallback handling
     */
    getUserRole(): 'admin' | 'user' | 'unknown' {
        try {
            const user = this.currentUser();
            if (!user || !user.email) {
                return 'unknown';
            }
            return this.isAdmin(user.email) ? 'admin' : 'user';
        } catch (error) {
            console.error('Error determining user role:', error);
            return 'unknown';
        }
    }
}
