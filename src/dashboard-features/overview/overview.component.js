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
exports.OverviewComponent = void 0;
var core_1 = require("@angular/core");
var navigation_service_1 = require("../../navigation.service");
var contact_service_1 = require("../../contact.service");
var deal_service_1 = require("../../deal.service");
var task_service_1 = require("../../task.service");
var data_access_service_1 = require("../../data-access.service");
var OverviewComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-overview',
            templateUrl: './overview.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OverviewComponent = _classThis = /** @class */ (function () {
        function OverviewComponent_1() {
            var _this = this;
            this.navigationService = (0, core_1.inject)(navigation_service_1.NavigationService);
            this.contactService = (0, core_1.inject)(contact_service_1.ContactService);
            this.dealService = (0, core_1.inject)(deal_service_1.DealService);
            this.taskService = (0, core_1.inject)(task_service_1.TaskService);
            this.dataAccessService = (0, core_1.inject)(data_access_service_1.DataAccessService);
            // Get role-based routes for navigation
            this.currentRole = this.navigationService.currentRole;
            this.baseRoute = (0, core_1.computed)(function () {
                var role = _this.currentRole();
                return role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
            });
            // Role-based data access
            this.leads = this.contactService.getLeads();
            this.deals = this.dealService.getDeals();
            this.tasks = this.taskService.getTasks();
            // Computed statistics based on role and filtered data
            this.stats = (0, core_1.computed)(function () {
                var role = _this.currentRole();
                var leadsCount = _this.leads().length;
                var dealsCount = _this.deals().length;
                var tasksCount = _this.tasks().filter(function (task) { return task.status === 'Pending'; }).length;
                var revenue = _this.deals().reduce(function (sum, deal) { return sum + (deal.value || 0); }, 0);
                if (role === 'admin') {
                    return [
                        { label: 'Total Leads', value: leadsCount.toString(), change: '+12%', isPositive: true },
                        { label: 'Active Deals', value: dealsCount.toString(), change: '+5%', isPositive: true },
                        { label: 'Revenue', value: "$".concat(revenue.toLocaleString()), change: '-2%', isPositive: false },
                        { label: 'Pending Tasks', value: tasksCount.toString(), change: '0%', isPositive: true },
                    ];
                }
                else {
                    return [
                        { label: 'My Leads', value: leadsCount.toString(), change: '+8%', isPositive: true },
                        { label: 'My Deals', value: dealsCount.toString(), change: '+3%', isPositive: true },
                        { label: 'My Revenue', value: "$".concat(revenue.toLocaleString()), change: '+5%', isPositive: true },
                        { label: 'My Tasks', value: tasksCount.toString(), change: '-1%', isPositive: false },
                    ];
                }
            });
            // Role-based recent activity
            this.recentActivity = (0, core_1.computed)(function () {
                var role = _this.currentRole();
                var currentUserEmail = _this.dataAccessService.getCurrentUserEmail();
                if (role === 'admin') {
                    // Admin sees system-wide activity
                    return [
                        { id: 1, title: 'New lead added', description: 'Jenny Wilson joined as a new lead', time: '2 hours ago', icon: 'User' },
                        { id: 2, title: 'Deal closed', description: 'Tech Corp deal marked as won', time: '5 hours ago', icon: 'CheckCircle' },
                        { id: 3, title: 'Meeting scheduled', description: 'Demo with Product Team', time: '1 day ago', icon: 'Calendar' },
                        { id: 4, title: 'Email sent', description: 'Follow-up sent to Jacob Jones', time: '2 days ago', icon: 'Mail' },
                        { id: 5, title: 'User registered', description: 'New user account created', time: '3 days ago', icon: 'UserPlus' },
                    ];
                }
                else {
                    // Regular user sees their own activity
                    return [
                        { id: 1, title: 'Lead updated', description: 'Updated contact information for prospect', time: '1 hour ago', icon: 'User' },
                        { id: 2, title: 'Task completed', description: 'Finished follow-up call with client', time: '3 hours ago', icon: 'CheckCircle' },
                        { id: 3, title: 'Deal progressed', description: 'Moved deal to negotiation stage', time: '1 day ago', icon: 'TrendingUp' },
                        { id: 4, title: 'Meeting attended', description: 'Client presentation completed', time: '2 days ago', icon: 'Calendar' },
                    ];
                }
            });
            // Check if user can manage all data (admin only)
            this.canManageAllData = (0, core_1.computed)(function () {
                var currentUserEmail = _this.dataAccessService.getCurrentUserEmail();
                return _this.dataAccessService.canManageAllData(currentUserEmail);
            });
        }
        return OverviewComponent_1;
    }());
    __setFunctionName(_classThis, "OverviewComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OverviewComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OverviewComponent = _classThis;
}();
exports.OverviewComponent = OverviewComponent;
