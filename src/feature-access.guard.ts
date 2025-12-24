import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { DataAccessService } from './data-access.service';
import { ErrorHandlerService } from './error-handler.service';
import { ToastService } from './toast.service';

export const featureAccessGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
    const dataAccessService = inject(DataAccessService);
    const errorHandlerService = inject(ErrorHandlerService);
    const router = inject(Router);
    const toastService = inject(ToastService);
    
    try {
        const userEmail = dataAccessService.getCurrentUserEmail();
        
        // Extract feature name from route
        const feature = route.data?.['feature'] || route.routeConfig?.path || 'unknown';
        
        if (dataAccessService.hasFeatureAccess(feature, userEmail)) {
            return true;
        }

        // Feature access denied
        console.log(`Feature access denied for user ${userEmail} to feature: ${feature}`);
        
        errorHandlerService.handlePermissionError({
            component: 'FeatureAccessGuard',
            operation: `access feature: ${feature}`,
            userEmail: userEmail || 'unknown'
        });

        // Redirect to appropriate dashboard based on user role
        if (userEmail && dataAccessService.canAccessAdminRoutes(userEmail)) {
            return router.createUrlTree(['/admin/dashboard/overview']);
        } else if (userEmail) {
            return router.createUrlTree(['/user/dashboard/overview']);
        } else {
            return router.createUrlTree(['/login']);
        }
    } catch (error) {
        console.error('Feature access guard error:', error);
        
        errorHandlerService.handleGeneralError(error, {
            component: 'FeatureAccessGuard',
            operation: 'check feature access'
        });
        
        // Fallback to login
        return router.createUrlTree(['/login']);
    }
};