import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

export const adminGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const toastService = inject(ToastService);
    
    try {
        const currentUser = authService.currentUser();

        if (currentUser && authService.isAdmin(currentUser.email)) {
            return true;
        }

        // Handle different scenarios with appropriate error messages
        if (currentUser) {
            // User is authenticated but not admin
            toastService.show('Access denied. Admin privileges required.', 'error');
            return router.createUrlTree(['/user/dashboard/overview']);
        } else {
            // User is not authenticated
            toastService.show('Please log in to access this area.', 'info');
            return router.createUrlTree(['/login'], { 
                queryParams: { returnUrl: state.url } 
            });
        }
    } catch (error) {
        console.error('Admin guard error:', error);
        toastService.show('Authentication error. Please try logging in again.', 'error');
        
        // Fallback navigation - just return the UrlTree
        return router.createUrlTree(['/login']);
    }
};