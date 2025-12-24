import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const toastService = inject(ToastService);
    
    try {
        const currentUser = authService.currentUser();

        if (currentUser) {
            return true;
        }

        // User is not authenticated
        toastService.show('Please log in to access this area.', 'info');
        return router.createUrlTree(['/login'], { 
            queryParams: { returnUrl: state.url } 
        });
    } catch (error) {
        console.error('Auth guard error:', error);
        toastService.show('Authentication error. Please try logging in again.', 'error');
        
        // Fallback navigation
        return router.createUrlTree(['/login']);
    }
};
