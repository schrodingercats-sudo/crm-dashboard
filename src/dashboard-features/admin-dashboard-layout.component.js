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
exports.AdminDashboardLayoutComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var admin_sidebar_component_1 = require("./admin-sidebar/admin-sidebar.component");
var header_component_1 = require("./header/header.component");
var mobile_sidebar_component_1 = require("./mobile-sidebar/mobile-sidebar.component");
var AdminDashboardLayoutComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-admin-dashboard-layout',
            standalone: true,
            templateUrl: './admin-dashboard-layout.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            imports: [router_1.RouterOutlet, admin_sidebar_component_1.AdminSidebarComponent, header_component_1.HeaderComponent, mobile_sidebar_component_1.MobileSidebarComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminDashboardLayoutComponent = _classThis = /** @class */ (function () {
        function AdminDashboardLayoutComponent_1() {
            this.mobileSidebarOpen = (0, core_1.signal)(false);
        }
        AdminDashboardLayoutComponent_1.prototype.toggleMobileSidebar = function () {
            this.mobileSidebarOpen.update(function (value) { return !value; });
        };
        return AdminDashboardLayoutComponent_1;
    }());
    __setFunctionName(_classThis, "AdminDashboardLayoutComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminDashboardLayoutComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminDashboardLayoutComponent = _classThis;
}();
exports.AdminDashboardLayoutComponent = AdminDashboardLayoutComponent;
