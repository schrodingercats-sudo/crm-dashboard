"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminGuard = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_service_1 = require("./auth.service");
var toast_service_1 = require("./toast.service");
var adminGuard = function (route, state) {
    var authService = (0, core_1.inject)(auth_service_1.AuthService);
    var router = (0, core_1.inject)(router_1.Router);
    var toastService = (0, core_1.inject)(toast_service_1.ToastService);
    try {
        var currentUser = authService.currentUser();
        if (currentUser && authService.isAdmin(currentUser.email)) {
            return true;
        }
        // Handle different scenarios with appropriate error messages
        if (currentUser) {
            // User is authenticated but not admin
            toastService.show('Access denied. Admin privileges required.', 'error');
            console.log('Non-admin user attempted to access admin route:', currentUser.email);
            return router.createUrlTree(['/user/dashboard/overview']);
        }
        else {
            // User is not authenticated
            toastService.show('Please log in to access this area.', 'info');
            return router.createUrlTree(['/login'], {
                queryParams: { returnUrl: state.url }
            });
        }
    }
    catch (error) {
        console.error('Admin guard error:', error);
        toastService.show('Authentication error. Please try logging in again.', 'error');
        // Fallback navigation - just return the UrlTree
        return router.createUrlTree(['/login']);
    }
};
exports.adminGuard = adminGuard;
