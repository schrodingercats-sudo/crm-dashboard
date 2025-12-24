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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var app_1 = require("firebase/app");
var auth_1 = require("firebase/auth");
var router_1 = require("@angular/router");
var toast_service_1 = require("./toast.service");
var firebaseConfig = {
    apiKey: "AIzaSyCWqmOiSs08mXXtNVpJhGb7_SG0kcyLWQ0",
    authDomain: "zyptenix-ab.firebaseapp.com",
    projectId: "zyptenix-ab",
    storageBucket: "zyptenix-ab.firebasestorage.app",
    messagingSenderId: "710758393566",
    appId: "1:710758393566:web:6c008994a556ec3691044f",
    measurementId: "G-S10E7B3ZKJ"
};
var AuthService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1() {
            var _this = this;
            this.app = (0, app_1.initializeApp)(firebaseConfig);
            this.auth = (0, auth_1.getAuth)(this.app);
            this.router = (0, core_1.inject)(router_1.Router);
            this.toastService = (0, core_1.inject)(toast_service_1.ToastService);
            this.currentUser = (0, core_1.signal)(null);
            this.isLoading = (0, core_1.signal)(false);
            this.authError = (0, core_1.signal)(null);
            this.ADMIN_EMAILS = ['pratham.solanki30@gmail.com'];
            (0, auth_1.onAuthStateChanged)(this.auth, function (user) {
                try {
                    _this.currentUser.set(user);
                    _this.authError.set(null);
                    if (user) {
                        var currentUrl = _this.router.url;
                        if (currentUrl === '/' || currentUrl === '/login') {
                            _this.navigateBasedOnRole(user);
                        }
                    }
                }
                catch (error) {
                    console.error('Auth state change error:', error);
                    _this.handleAuthError(error, 'Failed to process authentication state');
                }
            });
        }
        AuthService_1.prototype.loginWithGoogle = function () {
            return __awaiter(this, arguments, void 0, function (flow) {
                var provider, result, error_1;
                if (flow === void 0) { flow = 'login'; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            provider = new auth_1.GoogleAuthProvider();
                            this.isLoading.set(true);
                            this.authError.set(null);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, (0, auth_1.signInWithPopup)(this.auth, provider)];
                        case 2:
                            result = _a.sent();
                            this.setLastUsed();
                            this.navigateBasedOnRole(result.user);
                            this.toastService.show('Successfully logged in with Google', 'success');
                            return [2 /*return*/, result.user];
                        case 3:
                            error_1 = _a.sent();
                            console.error('Google login error:', error_1);
                            this.handleAuthError(error_1, 'Failed to login with Google');
                            throw error_1;
                        case 4:
                            this.isLoading.set(false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.isAdmin = function (email) {
            try {
                return !!email && this.ADMIN_EMAILS.includes(email);
            }
            catch (error) {
                console.error('Error checking admin status:', error);
                // Fallback to false for safety
                return false;
            }
        };
        AuthService_1.prototype.loginWithEmail = function (email, password) {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.isLoading.set(true);
                            this.authError.set(null);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, (0, auth_1.signInWithEmailAndPassword)(this.auth, email, password)];
                        case 2:
                            result = _a.sent();
                            this.setLastUsed();
                            this.navigateBasedOnRole(result.user);
                            this.toastService.show('Successfully logged in', 'success');
                            return [2 /*return*/, result.user];
                        case 3:
                            error_2 = _a.sent();
                            console.error('Email login error:', error_2);
                            this.handleAuthError(error_2, 'Failed to login with email');
                            throw error_2;
                        case 4:
                            this.isLoading.set(false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.signUpWithEmail = function (email, password) {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.isLoading.set(true);
                            this.authError.set(null);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, (0, auth_1.createUserWithEmailAndPassword)(this.auth, email, password)];
                        case 2:
                            result = _a.sent();
                            this.setLastUsed();
                            this.navigateBasedOnRole(result.user);
                            this.toastService.show('Account created successfully', 'success');
                            return [2 /*return*/, result.user];
                        case 3:
                            error_3 = _a.sent();
                            console.error('Sign up error:', error_3);
                            this.handleAuthError(error_3, 'Failed to create account');
                            throw error_3;
                        case 4:
                            this.isLoading.set(false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.navigateBasedOnRole = function (user) {
            var _this = this;
            try {
                if (!user || !user.email) {
                    console.error('Invalid user object for navigation');
                    this.handleNavigationFallback('Invalid user data');
                    return;
                }
                if (this.isAdmin(user.email)) {
                    // Admin goes to admin dashboard
                    this.router.navigate(['/admin/dashboard/overview']).catch(function (error) {
                        console.error('Navigation to admin dashboard failed:', error);
                        _this.handleNavigationFallback('Failed to navigate to admin dashboard');
                    });
                }
                else {
                    // Regular user goes to user dashboard
                    this.router.navigate(['/user/dashboard/overview']).catch(function (error) {
                        console.error('Navigation to user dashboard failed:', error);
                        _this.handleNavigationFallback('Failed to navigate to user dashboard');
                    });
                }
            }
            catch (error) {
                console.error('Role-based navigation error:', error);
                this.handleNavigationFallback('Failed to determine user role');
            }
        };
        AuthService_1.prototype.logout = function () {
            return __awaiter(this, void 0, void 0, function () {
                var error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.isLoading.set(true);
                            this.authError.set(null);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, (0, auth_1.signOut)(this.auth)];
                        case 2:
                            _a.sent();
                            this.router.navigate(['/']);
                            this.toastService.show('Successfully logged out', 'info');
                            return [3 /*break*/, 5];
                        case 3:
                            error_4 = _a.sent();
                            console.error('Logout error:', error_4);
                            this.handleAuthError(error_4, 'Failed to logout');
                            throw error_4;
                        case 4:
                            this.isLoading.set(false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.setLastUsed = function () {
            try {
                localStorage.setItem('lastUsed', 'true');
            }
            catch (error) {
                console.error('Failed to set localStorage:', error);
                // Non-critical error, continue execution
            }
        };
        /**
         * Handles authentication errors with user-friendly messages
         */
        AuthService_1.prototype.handleAuthError = function (error, defaultMessage) {
            var userMessage = defaultMessage;
            if (error === null || error === void 0 ? void 0 : error.code) {
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
        };
        /**
         * Handles navigation fallback when role-based routing fails
         */
        AuthService_1.prototype.handleNavigationFallback = function (errorMessage) {
            var _this = this;
            console.error('Navigation fallback triggered:', errorMessage);
            this.toastService.show('Navigation error. Redirecting to dashboard...', 'error');
            // Fallback to basic dashboard route
            this.router.navigate(['/dashboard']).catch(function (fallbackError) {
                console.error('Fallback navigation also failed:', fallbackError);
                // Ultimate fallback to home page
                _this.router.navigate(['/']).catch(function (ultimateError) {
                    console.error('Ultimate fallback navigation failed:', ultimateError);
                    _this.toastService.show('Critical navigation error. Please refresh the page.', 'error');
                });
            });
        };
        /**
         * Retry mechanism for authentication operations
         */
        AuthService_1.prototype.retryAuthOperation = function (operation_1) {
            return __awaiter(this, arguments, void 0, function (operation, maxRetries) {
                var lastError, _loop_1, attempt, state_1;
                if (maxRetries === void 0) { maxRetries = 3; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _loop_1 = function (attempt) {
                                var _b, error_5;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _c.trys.push([0, 2, , 5]);
                                            _b = {};
                                            return [4 /*yield*/, operation()];
                                        case 1: return [2 /*return*/, (_b.value = _c.sent(), _b)];
                                        case 2:
                                            error_5 = _c.sent();
                                            lastError = error_5;
                                            // Don't retry for certain error types
                                            if ((error_5 === null || error_5 === void 0 ? void 0 : error_5.code) && [
                                                'auth/user-not-found',
                                                'auth/wrong-password',
                                                'auth/email-already-in-use',
                                                'auth/weak-password',
                                                'auth/invalid-email'
                                            ].includes(error_5.code)) {
                                                throw error_5;
                                            }
                                            if (!(attempt < maxRetries)) return [3 /*break*/, 4];
                                            console.log("Auth operation attempt ".concat(attempt, " failed, retrying..."));
                                            // Exponential backoff
                                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, Math.pow(2, attempt) * 1000); })];
                                        case 3:
                                            // Exponential backoff
                                            _c.sent();
                                            _c.label = 4;
                                        case 4: return [3 /*break*/, 5];
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            };
                            attempt = 1;
                            _a.label = 1;
                        case 1:
                            if (!(attempt <= maxRetries)) return [3 /*break*/, 4];
                            return [5 /*yield**/, _loop_1(attempt)];
                        case 2:
                            state_1 = _a.sent();
                            if (typeof state_1 === "object")
                                return [2 /*return*/, state_1.value];
                            _a.label = 3;
                        case 3:
                            attempt++;
                            return [3 /*break*/, 1];
                        case 4: throw lastError;
                    }
                });
            });
        };
        /**
         * Checks if the current authentication state is valid
         */
        AuthService_1.prototype.isAuthStateValid = function () {
            try {
                var user = this.currentUser();
                return user !== null && user.email !== null;
            }
            catch (error) {
                console.error('Error checking auth state validity:', error);
                return false;
            }
        };
        /**
         * Gets user role with fallback handling
         */
        AuthService_1.prototype.getUserRole = function () {
            try {
                var user = this.currentUser();
                if (!user || !user.email) {
                    return 'unknown';
                }
                return this.isAdmin(user.email) ? 'admin' : 'user';
            }
            catch (error) {
                console.error('Error determining user role:', error);
                return 'unknown';
            }
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
