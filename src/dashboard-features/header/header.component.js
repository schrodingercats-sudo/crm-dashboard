"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.HeaderComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_service_1 = require("../../auth.service");
var HeaderComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-header',
            templateUrl: './header.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            imports: [common_1.CommonModule, router_1.RouterModule],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var HeaderComponent = _classThis = /** @class */ (function () {
        function HeaderComponent_1() {
            var _this = this;
            this.authService = (0, core_1.inject)(auth_service_1.AuthService);
            this.menuToggle = (0, core_1.output)();
            this.showNotifications = (0, core_1.signal)(false);
            this.showUserMenu = (0, core_1.signal)(false);
            this.notifications = (0, core_1.signal)([
                { id: 1, text: 'New lead assigned to you: Sarah Jones', time: '5m ago', read: false },
                { id: 2, text: 'Meeting with Dev team at 3 PM', time: '1h ago', read: false },
                { id: 3, text: 'Your export is ready to download', time: '2h ago', read: true },
            ]);
            this.unreadCount = (0, core_1.computed)(function () { return _this.notifications().filter(function (n) { return !n.read; }).length; });
            this.userProfile = (0, core_1.computed)(function () {
                var user = _this.authService.currentUser();
                if (!user) {
                    return { photoURL: null, initials: '' };
                }
                var photoURL = user.photoURL;
                var initials = '';
                if (user.displayName) {
                    initials = user.displayName.charAt(0).toUpperCase();
                }
                else if (user.email) {
                    initials = user.email.charAt(0).toUpperCase();
                }
                return { photoURL: photoURL, initials: initials };
            });
        }
        HeaderComponent_1.prototype.toggleNotifications = function () {
            this.showNotifications.update(function (v) { return !v; });
            if (this.showNotifications()) {
                this.showUserMenu.set(false);
            }
        };
        HeaderComponent_1.prototype.toggleUserMenu = function () {
            this.showUserMenu.update(function (v) { return !v; });
            if (this.showUserMenu()) {
                this.showNotifications.set(false);
            }
        };
        HeaderComponent_1.prototype.markAsRead = function (id) {
            this.notifications.update(function (items) {
                return items.map(function (item) { return item.id === id ? __assign(__assign({}, item), { read: true }) : item; });
            });
        };
        HeaderComponent_1.prototype.logout = function () {
            this.authService.logout();
        };
        return HeaderComponent_1;
    }());
    __setFunctionName(_classThis, "HeaderComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HeaderComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HeaderComponent = _classThis;
}();
exports.HeaderComponent = HeaderComponent;
