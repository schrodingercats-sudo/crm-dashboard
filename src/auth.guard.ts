import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const currentUser = authService.currentUser();

    if (currentUser && authService.isAdmin(currentUser.email)) {
        return true;
    }

    // Not logged in or not admin
    return router.createUrlTree(['/login']);
};
