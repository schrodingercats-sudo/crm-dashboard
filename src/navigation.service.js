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
exports.NavigationService = void 0;
var core_1 = require("@angular/core");
var auth_service_1 = require("./auth.service");
var data_access_service_1 = require("./data-access.service");
var NavigationService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var NavigationService = _classThis = /** @class */ (function () {
        function NavigationService_1() {
            var _this = this;
            this.authService = (0, core_1.inject)(auth_service_1.AuthService);
            this.dataAccessService = (0, core_1.inject)(data_access_service_1.DataAccessService);
            // Computed property to determine current user role
            this.currentRole = (0, core_1.computed)(function () {
                var user = _this.authService.currentUser();
                if (!user)
                    return null;
                return _this.authService.isAdmin(user.email) ? 'admin' : 'user';
            });
            // Get role-appropriate navigation items
            this.getNavItems = (0, core_1.computed)(function () {
                var role = _this.currentRole();
                var currentUserEmail = _this.dataAccessService.getCurrentUserEmail();
                if (!role)
                    return [];
                var baseRoute = role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
                var allNavItems = _this.getAllNavItems(baseRoute, role);
                // Filter navigation items based on user permissions
                return _this.dataAccessService.filterNavigationItems(allNavItems, currentUserEmail);
            });
            // Get role-appropriate bottom navigation items
            this.getBottomNavItems = (0, core_1.computed)(function () {
                var role = _this.currentRole();
                var currentUserEmail = _this.dataAccessService.getCurrentUserEmail();
                if (!role)
                    return [];
                var baseRoute = role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
                var bottomNavItems = [
                    {
                        id: 'settings',
                        label: 'Settings',
                        icon: _this.getIcon('settings'),
                        route: "".concat(baseRoute, "/settings"),
                        roles: [role]
                    },
                    {
                        id: 'help',
                        label: 'Help & Support',
                        icon: _this.getIcon('help'),
                        route: "".concat(baseRoute, "/help"),
                        roles: [role]
                    },
                ];
                return _this.dataAccessService.filterNavigationItems(bottomNavItems, currentUserEmail);
            });
        }
        NavigationService_1.prototype.getAllNavItems = function (baseRoute, role) {
            if (role === 'admin') {
                return [
                    {
                        id: 'overview',
                        label: 'Overview',
                        icon: this.getIcon('overview'),
                        route: "".concat(baseRoute, "/overview"),
                        roles: ['admin']
                    },
                    {
                        id: 'contacts',
                        label: 'Contacts',
                        icon: this.getIcon('contacts'),
                        path: "".concat(baseRoute, "/contacts"),
                        roles: ['admin'],
                        children: [
                            { id: 'leads', label: 'Leads', route: "".concat(baseRoute, "/contacts/leads") },
                            { id: 'referral_partners', label: 'Referral Partners', route: "".concat(baseRoute, "/contacts/referral-partners") }
                        ]
                    },
                    {
                        id: 'deals',
                        label: 'Deals',
                        icon: this.getIcon('deals'),
                        path: "".concat(baseRoute, "/deals"),
                        roles: ['admin'],
                        children: [
                            { id: 'all_deals', label: 'All Deals', route: "".concat(baseRoute, "/deals") }
                        ]
                    },
                    {
                        id: 'integration',
                        label: 'Integration',
                        icon: this.getIcon('integration'),
                        route: "".concat(baseRoute, "/integration"),
                        roles: ['admin']
                    },
                    {
                        id: 'tasks',
                        label: 'Tasks',
                        icon: this.getIcon('tasks'),
                        route: "".concat(baseRoute, "/tasks"),
                        roles: ['admin']
                    },
                ];
            }
            else {
                return [
                    {
                        id: 'overview',
                        label: 'Overview',
                        icon: this.getIcon('overview'),
                        route: "".concat(baseRoute, "/overview"),
                        roles: ['user']
                    },
                    {
                        id: 'contacts',
                        label: 'My Contacts',
                        icon: this.getIcon('contacts'),
                        route: "".concat(baseRoute, "/contacts"),
                        roles: ['user']
                    },
                    {
                        id: 'deals',
                        label: 'My Deals',
                        icon: this.getIcon('deals'),
                        route: "".concat(baseRoute, "/deals"),
                        roles: ['user']
                    },
                    {
                        id: 'tasks',
                        label: 'My Tasks',
                        icon: this.getIcon('tasks'),
                        route: "".concat(baseRoute, "/tasks"),
                        roles: ['user']
                    },
                ];
            }
        };
        NavigationService_1.prototype.getIcon = function (name) {
            var icons = {
                overview: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z\" /></svg>",
                contacts: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z\" /></svg>",
                deals: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z\" /></svg>",
                integration: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z\" /></svg>",
                tasks: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01\" /></svg>",
                settings: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z\" /><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 12a3 3 0 11-6 0 3 3 0 016 0z\" /></svg>",
                help: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.79 4 4 0 1.846-1.226 3.37-3 3.867v.133M12 18h.01\" /></svg>"
            };
            return icons[name] || '';
        };
        return NavigationService_1;
    }());
    __setFunctionName(_classThis, "NavigationService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NavigationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NavigationService = _classThis;
}();
exports.NavigationService = NavigationService;
