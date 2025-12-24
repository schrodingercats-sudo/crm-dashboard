"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_service_1 = require("./auth.service");
var toast_service_1 = require("./toast.service");
var authGuard = function (route, state) {
    var authService = (0, core_1.inject)(auth_service_1.AuthService);
    var router = (0, core_1.inject)(router_1.Router);
    var toastService = (0, core_1.inject)(toast_service_1.ToastService);
    try {
        var currentUser = authService.currentUser();
        if (currentUser) {
            return true;
        }
        // User is not authenticated
        toastService.show('Please log in to access this area.', 'info');
        return router.createUrlTree(['/login'], {
            queryParams: { returnUrl: state.url }
        });
    }
    catch (error) {
        console.error('Auth guard error:', error);
        toastService.show('Authentication error. Please try logging in again.', 'error');
        // Fallback navigation
        return router.createUrlTree(['/login']);
    }
};
exports.authGuard = authGuard;
