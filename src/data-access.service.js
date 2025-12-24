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
exports.DataAccessService = void 0;
var core_1 = require("@angular/core");
var auth_service_1 = require("./auth.service");
var toast_service_1 = require("./toast.service");
var DataAccessService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DataAccessService = _classThis = /** @class */ (function () {
        function DataAccessService_1() {
            this.authService = (0, core_1.inject)(auth_service_1.AuthService);
            this.toastService = (0, core_1.inject)(toast_service_1.ToastService);
        }
        /**
         * Filters data based on user role and permissions with error handling
         * Admin users get all data, regular users get only their own data
         */
        DataAccessService_1.prototype.filterDataForUser = function (data, userEmail) {
            try {
                if (!Array.isArray(data)) {
                    console.error('Invalid data provided to filterDataForUser:', data);
                    this.toastService.show('Data loading error. Please refresh the page.', 'error');
                    return [];
                }
                if (this.authService.isAdmin(userEmail)) {
                    // Admin gets all data without filtering
                    return data;
                }
                else {
                    // Regular users get only their own data
                    return data.filter(function (item) {
                        try {
                            return item.ownerEmail === userEmail ||
                                item.assignee === userEmail ||
                                item.email === userEmail ||
                                item.createdBy === userEmail;
                        }
                        catch (filterError) {
                            console.error('Error filtering individual item:', filterError, item);
                            return false;
                        }
                    });
                }
            }
            catch (error) {
                console.error('Error in filterDataForUser:', error);
                this.toastService.show('Data filtering error. Some data may not be displayed correctly.', 'error');
                return [];
            }
        };
        /**
         * Checks if a user has access to a specific feature with error handling
         */
        DataAccessService_1.prototype.hasFeatureAccess = function (feature, userEmail) {
            try {
                if (!feature || typeof feature !== 'string') {
                    console.error('Invalid feature provided to hasFeatureAccess:', feature);
                    return false;
                }
                if (this.authService.isAdmin(userEmail)) {
                    // Admin has access to all features
                    return true;
                }
                else {
                    // Regular users have limited access
                    var userFeatures = ['overview', 'contacts', 'deals', 'tasks', 'settings', 'help'];
                    return userFeatures.includes(feature.toLowerCase());
                }
            }
            catch (error) {
                console.error('Error checking feature access:', error);
                this.toastService.show('Permission check failed. Access denied for safety.', 'error');
                return false;
            }
        };
        /**
         * Gets list of available features for a user based on their role with error handling
         */
        DataAccessService_1.prototype.getAvailableFeatures = function (userEmail) {
            try {
                if (this.authService.isAdmin(userEmail)) {
                    // Admin gets all features including admin-only ones
                    return [
                        'overview', 'contacts', 'deals', 'tasks', 'settings', 'help',
                        'integration', 'referral-partners', 'user-management', 'system-settings'
                    ];
                }
                else {
                    // Regular users get limited features
                    return ['overview', 'contacts', 'deals', 'tasks', 'settings', 'help'];
                }
            }
            catch (error) {
                console.error('Error getting available features:', error);
                this.toastService.show('Feature list loading error. Some features may not be available.', 'error');
                // Return minimal safe features
                return ['overview'];
            }
        };
        /**
         * Checks if user can manage all system data with error handling
         */
        DataAccessService_1.prototype.canManageAllData = function (userEmail) {
            try {
                return this.authService.isAdmin(userEmail);
            }
            catch (error) {
                console.error('Error checking data management permissions:', error);
                // Default to false for safety
                return false;
            }
        };
        /**
         * Checks if user can access admin routes with error handling
         */
        DataAccessService_1.prototype.canAccessAdminRoutes = function (userEmail) {
            try {
                return this.authService.isAdmin(userEmail);
            }
            catch (error) {
                console.error('Error checking admin route access:', error);
                // Default to false for safety
                return false;
            }
        };
        /**
         * Gets the current user's email from auth service with error handling
         */
        DataAccessService_1.prototype.getCurrentUserEmail = function () {
            try {
                var currentUser = this.authService.currentUser();
                return (currentUser === null || currentUser === void 0 ? void 0 : currentUser.email) || null;
            }
            catch (error) {
                console.error('Error getting current user email:', error);
                return null;
            }
        };
        /**
         * Filters navigation items based on user role with error handling
         */
        DataAccessService_1.prototype.filterNavigationItems = function (navItems, userEmail) {
            var _this = this;
            try {
                if (!Array.isArray(navItems)) {
                    console.error('Invalid navigation items provided:', navItems);
                    return [];
                }
                return navItems.filter(function (item) {
                    try {
                        if (!item.roles || item.roles.length === 0) {
                            // If no roles specified, show to all users
                            return true;
                        }
                        if (_this.authService.isAdmin(userEmail)) {
                            // Admin can see all items
                            return true;
                        }
                        else {
                            // Regular users can only see items marked for 'user' role
                            return item.roles.includes('user');
                        }
                    }
                    catch (itemError) {
                        console.error('Error filtering navigation item:', itemError, item);
                        return false;
                    }
                });
            }
            catch (error) {
                console.error('Error filtering navigation items:', error);
                this.toastService.show('Navigation loading error. Some menu items may not be displayed.', 'error');
                return [];
            }
        };
        /**
         * Handles data loading with retry mechanism and error handling
         */
        DataAccessService_1.prototype.loadDataWithRetry = function (loadFunction_1) {
            return __awaiter(this, arguments, void 0, function (loadFunction, maxRetries, errorMessage) {
                var lastError, _loop_1, this_1, attempt, state_1;
                if (maxRetries === void 0) { maxRetries = 3; }
                if (errorMessage === void 0) { errorMessage = 'Failed to load data'; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _loop_1 = function (attempt) {
                                var _b, error_1;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _c.trys.push([0, 2, , 5]);
                                            _b = {};
                                            return [4 /*yield*/, loadFunction()];
                                        case 1: return [2 /*return*/, (_b.value = _c.sent(), _b)];
                                        case 2:
                                            error_1 = _c.sent();
                                            lastError = error_1;
                                            console.error("Data loading attempt ".concat(attempt, " failed:"), error_1);
                                            // Don't retry for certain error types
                                            if ((error_1 === null || error_1 === void 0 ? void 0 : error_1.status) === 401 || (error_1 === null || error_1 === void 0 ? void 0 : error_1.status) === 403) {
                                                this_1.toastService.show('Access denied. Please check your permissions.', 'error');
                                                throw error_1;
                                            }
                                            if (!(attempt < maxRetries)) return [3 /*break*/, 4];
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
                            this_1 = this;
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
                        case 4:
                            console.error('All data loading attempts failed:', lastError);
                            this.toastService.show("".concat(errorMessage, ". Please try again later."), 'error');
                            return [2 /*return*/, null];
                    }
                });
            });
        };
        /**
         * Validates data integrity before processing
         */
        DataAccessService_1.prototype.validateDataIntegrity = function (data, requiredFields) {
            if (requiredFields === void 0) { requiredFields = []; }
            try {
                if (!Array.isArray(data)) {
                    console.error('Data is not an array:', data);
                    return false;
                }
                if (requiredFields.length > 0) {
                    var invalidItems = data.filter(function (item) {
                        return requiredFields.some(function (field) {
                            return !item || typeof item !== 'object' || !(field in item);
                        });
                    });
                    if (invalidItems.length > 0) {
                        console.error('Data integrity check failed. Invalid items found:', invalidItems);
                        this.toastService.show('Data integrity issue detected. Some data may be incomplete.', 'error');
                        return false;
                    }
                }
                return true;
            }
            catch (error) {
                console.error('Error validating data integrity:', error);
                return false;
            }
        };
        /**
         * Handles network errors with appropriate user feedback
         */
        DataAccessService_1.prototype.handleNetworkError = function (error, context) {
            if (context === void 0) { context = 'operation'; }
            console.error("Network error in ".concat(context, ":"), error);
            var userMessage = "Network error during ".concat(context, ". ");
            if (!navigator.onLine) {
                userMessage += 'Please check your internet connection.';
            }
            else if ((error === null || error === void 0 ? void 0 : error.status) === 0) {
                userMessage += 'Server is unreachable. Please try again later.';
            }
            else if ((error === null || error === void 0 ? void 0 : error.status) >= 500) {
                userMessage += 'Server error. Please try again later.';
            }
            else if ((error === null || error === void 0 ? void 0 : error.status) === 404) {
                userMessage += 'Requested resource not found.';
            }
            else {
                userMessage += 'Please try again.';
            }
            this.toastService.show(userMessage, 'error');
        };
        return DataAccessService_1;
    }());
    __setFunctionName(_classThis, "DataAccessService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DataAccessService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DataAccessService = _classThis;
}();
exports.DataAccessService = DataAccessService;
