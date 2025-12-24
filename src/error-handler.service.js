"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerService = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var toast_service_1 = require("./toast.service");
var ErrorHandlerService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ErrorHandlerService = _classThis = /** @class */ (function () {
        function ErrorHandlerService_1() {
            this.router = (0, core_1.inject)(router_1.Router);
            this.toastService = (0, core_1.inject)(toast_service_1.ToastService);
        }
        /**
         * Handles authentication-related errors
         */
        ErrorHandlerService_1.prototype.handleAuthError = function (error, context) {
            if (context === void 0) { context = {}; }
            console.error('Authentication error:', error, context);
            var userMessage = 'Authentication error occurred.';
            var shouldRedirect = false;
            if (error === null || error === void 0 ? void 0 : error.code) {
                switch (error.code) {
                    case 'auth/user-not-found':
                        userMessage = 'No account found with this email address.';
                        break;
                    case 'auth/wrong-password':
                        userMessage = 'Incorrect password. Please try again.';
                        break;
                    case 'auth/email-already-in-use':
                        userMessage = 'An account with this email already exists.';
                        break;
                    case 'auth/weak-password':
                        userMessage = 'Password should be at least 6 characters long.';
                        break;
                    case 'auth/invalid-email':
                        userMessage = 'Please enter a valid email address.';
                        break;
                    case 'auth/network-request-failed':
                        userMessage = 'Network error. Please check your connection and try again.';
                        break;
                    case 'auth/too-many-requests':
                        userMessage = 'Too many failed attempts. Please try again later.';
                        break;
                    case 'auth/user-disabled':
                        userMessage = 'This account has been disabled. Please contact support.';
                        break;
                    case 'auth/invalid-credential':
                        userMessage = 'Invalid login credentials. Please check your email and password.';
                        break;
                    case 'auth/popup-closed-by-user':
                        userMessage = 'Login was cancelled.';
                        break;
                    case 'auth/popup-blocked':
                        userMessage = 'Popup was blocked. Please allow popups and try again.';
                        break;
                    case 'auth/unauthorized-domain':
                        userMessage = 'This domain is not authorized for authentication.';
                        break;
                    case 'auth/operation-not-allowed':
                        userMessage = 'This sign-in method is not enabled. Please contact support.';
                        break;
                    case 'auth/requires-recent-login':
                        userMessage = 'Please log in again to perform this action.';
                        shouldRedirect = true;
                        break;
                    default:
                        userMessage = "Authentication error: ".concat(error.message || 'Unknown error');
                }
            }
            else if (error === null || error === void 0 ? void 0 : error.message) {
                userMessage = error.message;
            }
            this.toastService.show(userMessage, 'error');
            if (shouldRedirect) {
                this.router.navigate(['/login']);
            }
        };
        /**
         * Handles permission-related errors
         */
        ErrorHandlerService_1.prototype.handlePermissionError = function (context) {
            var _this = this;
            if (context === void 0) { context = {}; }
            console.error('Permission error:', context);
            var userMessage = context.userEmail
                ? "Access denied for ".concat(context.userEmail, ". Insufficient permissions.")
                : 'Access denied. You do not have permission to perform this action.';
            this.toastService.show(userMessage, 'error');
            // Redirect based on context
            if (context.userEmail) {
                // Try to redirect to appropriate dashboard
                this.router.navigate(['/user/dashboard/overview']).catch(function (navError) {
                    console.error('Failed to redirect after permission error:', navError);
                    _this.router.navigate(['/']);
                });
            }
        };
        /**
         * Handles network-related errors
         */
        ErrorHandlerService_1.prototype.handleNetworkError = function (error, context) {
            if (context === void 0) { context = {}; }
            console.error('Network error:', error, context);
            var userMessage = 'Network error occurred.';
            if (!navigator.onLine) {
                userMessage = 'No internet connection. Please check your network and try again.';
            }
            else if ((error === null || error === void 0 ? void 0 : error.status) === 0) {
                userMessage = 'Cannot reach the server. Please try again later.';
            }
            else if ((error === null || error === void 0 ? void 0 : error.status) >= 500) {
                userMessage = 'Server error. Please try again later.';
            }
            else if ((error === null || error === void 0 ? void 0 : error.status) === 404) {
                userMessage = 'The requested resource was not found.';
            }
            else if ((error === null || error === void 0 ? void 0 : error.status) === 401) {
                userMessage = 'Authentication required. Please log in again.';
                this.router.navigate(['/login']);
            }
            else if ((error === null || error === void 0 ? void 0 : error.status) === 403) {
                userMessage = 'Access forbidden. You do not have permission to access this resource.';
            }
            else if ((error === null || error === void 0 ? void 0 : error.status) === 408) {
                userMessage = 'Request timeout. Please try again.';
            }
            else if ((error === null || error === void 0 ? void 0 : error.status) === 429) {
                userMessage = 'Too many requests. Please wait a moment and try again.';
            }
            else if (error === null || error === void 0 ? void 0 : error.message) {
                userMessage = "Network error: ".concat(error.message);
            }
            this.toastService.show(userMessage, 'error');
        };
        /**
         * Handles data loading errors
         */
        ErrorHandlerService_1.prototype.handleDataError = function (error, context) {
            if (context === void 0) { context = {}; }
            console.error('Data error:', error, context);
            var userMessage = 'Failed to load data.';
            if ((error === null || error === void 0 ? void 0 : error.status) === 401) {
                userMessage = 'Authentication expired. Please log in again.';
                this.router.navigate(['/login']);
            }
            else if ((error === null || error === void 0 ? void 0 : error.status) === 403) {
                userMessage = 'Access denied. You do not have permission to view this data.';
            }
            else if ((error === null || error === void 0 ? void 0 : error.status) === 404) {
                userMessage = 'The requested data was not found.';
            }
            else if ((error === null || error === void 0 ? void 0 : error.status) >= 500) {
                userMessage = 'Server error while loading data. Please try again later.';
            }
            else if (!navigator.onLine) {
                userMessage = 'Cannot load data while offline. Please check your connection.';
            }
            else if (context.operation) {
                userMessage = "Failed to ".concat(context.operation, ". Please try again.");
            }
            this.toastService.show(userMessage, 'error');
        };
        /**
         * Handles navigation errors
         */
        ErrorHandlerService_1.prototype.handleNavigationError = function (error, context) {
            if (context === void 0) { context = {}; }
            console.error('Navigation error:', error, context);
            var userMessage = 'Navigation error occurred. Redirecting to safe location.';
            this.toastService.show(userMessage, 'error');
            // Attempt fallback navigation
            this.performFallbackNavigation();
        };
        /**
         * Handles general application errors
         */
        ErrorHandlerService_1.prototype.handleGeneralError = function (error, context) {
            if (context === void 0) { context = {}; }
            console.error('General application error:', error, context);
            var userMessage = 'An unexpected error occurred.';
            if (error === null || error === void 0 ? void 0 : error.message) {
                // Don't expose technical error messages to users
                if (error.message.includes('network') || error.message.includes('fetch')) {
                    userMessage = 'Network error. Please check your connection and try again.';
                }
                else if (error.message.includes('permission') || error.message.includes('unauthorized')) {
                    userMessage = 'Permission error. You may not have access to this feature.';
                }
                else {
                    userMessage = 'An error occurred. Please try again or contact support if the problem persists.';
                }
            }
            this.toastService.show(userMessage, 'error');
        };
        /**
         * Performs fallback navigation when primary navigation fails
         */
        ErrorHandlerService_1.prototype.performFallbackNavigation = function () {
            var _this = this;
            // Try user dashboard first
            this.router.navigate(['/user/dashboard/overview']).catch(function () {
                // If that fails, try basic dashboard
                _this.router.navigate(['/dashboard']).catch(function () {
                    // Ultimate fallback to home page
                    _this.router.navigate(['/']).catch(function () {
                        // If even home page fails, show critical error
                        _this.toastService.show('Critical navigation error. Please refresh the page or contact support.', 'error');
                    });
                });
            });
        };
        /**
         * Logs errors for debugging and monitoring
         */
        ErrorHandlerService_1.prototype.logError = function (error, context) {
            if (context === void 0) { context = {}; }
            var errorLog = {
                timestamp: new Date().toISOString(),
                error: {
                    message: error === null || error === void 0 ? void 0 : error.message,
                    stack: error === null || error === void 0 ? void 0 : error.stack,
                    code: error === null || error === void 0 ? void 0 : error.code,
                    status: error === null || error === void 0 ? void 0 : error.status
                },
                context: context,
                userAgent: navigator.userAgent,
                url: window.location.href
            };
            console.error('Error logged:', errorLog);
            // In a production environment, you might want to send this to a logging service
            // this.sendToLoggingService(errorLog);
        };
        /**
         * Checks if an error is recoverable
         */
        ErrorHandlerService_1.prototype.isRecoverableError = function (error) {
            if (error === null || error === void 0 ? void 0 : error.status) {
                // Network errors that might be temporary
                return [408, 429, 500, 502, 503, 504].includes(error.status);
            }
            if (error === null || error === void 0 ? void 0 : error.code) {
                // Auth errors that might be recoverable
                return ['auth/network-request-failed', 'auth/too-many-requests'].includes(error.code);
            }
            return false;
        };
        /**
         * Provides retry suggestions for recoverable errors
         */
        ErrorHandlerService_1.prototype.getRetryMessage = function (error) {
            if ((error === null || error === void 0 ? void 0 : error.status) === 429) {
                return 'Too many requests. Please wait a moment before trying again.';
            }
            if ((error === null || error === void 0 ? void 0 : error.status) >= 500) {
                return 'Server error. Please try again in a few moments.';
            }
            if ((error === null || error === void 0 ? void 0 : error.code) === 'auth/network-request-failed') {
                return 'Network error. Please check your connection and try again.';
            }
            return 'Please try again.';
        };
        return ErrorHandlerService_1;
    }());
    __setFunctionName(_classThis, "ErrorHandlerService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ErrorHandlerService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ErrorHandlerService = _classThis;
}();
exports.ErrorHandlerService = ErrorHandlerService;
