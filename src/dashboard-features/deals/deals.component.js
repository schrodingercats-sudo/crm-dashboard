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
exports.DealsComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var deal_service_1 = require("../../deal.service");
var data_access_service_1 = require("../../data-access.service");
var navigation_service_1 = require("../../navigation.service");
var add_deal_dialog_component_1 = require("../../components/add-deal-dialog/add-deal-dialog.component");
var DealsComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-deals',
            templateUrl: './deals.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            imports: [common_1.CommonModule, add_deal_dialog_component_1.AddDealDialogComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DealsComponent = _classThis = /** @class */ (function () {
        function DealsComponent_1() {
            var _this = this;
            this.dealService = (0, core_1.inject)(deal_service_1.DealService);
            this.dataAccessService = (0, core_1.inject)(data_access_service_1.DataAccessService);
            this.navigationService = (0, core_1.inject)(navigation_service_1.NavigationService);
            this.stages = ['New', 'Qualification', 'Negotiation', 'Won'];
            this.showAddDealDialog = (0, core_1.signal)(false);
            // Get role-appropriate data
            this.currentRole = this.navigationService.currentRole;
            this.deals = this.dealService.getDeals();
            this.dealsByStage = (0, core_1.computed)(function () {
                var grouped = {};
                _this.stages.forEach(function (stage) { return grouped[stage] = []; });
                _this.deals().forEach(function (deal) {
                    // Handle case sensitivity or mismatch if DB uses different case
                    var stage = deal.stage;
                    if (grouped[stage]) {
                        grouped[stage].push(deal);
                    }
                    else if (stage === 'New Deal') { // Example mapping if needed
                        grouped['New'].push(deal);
                    }
                    else {
                        // Fallback or ignore
                        console.warn("Unknown stage: ".concat(stage));
                    }
                });
                return grouped;
            });
            // Check if user can manage all data (admin only)
            this.canManageAllData = (0, core_1.computed)(function () {
                var currentUserEmail = _this.dataAccessService.getCurrentUserEmail();
                return _this.dataAccessService.canManageAllData(currentUserEmail);
            });
            // Role-based page title
            this.pageTitle = (0, core_1.computed)(function () {
                var role = _this.currentRole();
                return role === 'admin' ? 'All Deals' : 'My Deals';
            });
            // Role-based statistics
            this.dealStats = (0, core_1.computed)(function () {
                var allDeals = _this.deals();
                var totalValue = allDeals.reduce(function (sum, deal) { return sum + (deal.value || 0); }, 0);
                var wonDeals = allDeals.filter(function (deal) { return deal.stage === 'Won'; });
                var wonValue = wonDeals.reduce(function (sum, deal) { return sum + (deal.value || 0); }, 0);
                return {
                    total: allDeals.length,
                    totalValue: totalValue,
                    won: wonDeals.length,
                    wonValue: wonValue,
                    winRate: allDeals.length > 0 ? Math.round((wonDeals.length / allDeals.length) * 100) : 0
                };
            });
        }
        // Get stage-specific styling
        DealsComponent_1.prototype.getStageColor = function (stage) {
            var colors = {
                'New': 'bg-blue-100 text-blue-800',
                'Qualification': 'bg-yellow-100 text-yellow-800',
                'Negotiation': 'bg-orange-100 text-orange-800',
                'Won': 'bg-green-100 text-green-800'
            };
            return colors[stage] || 'bg-gray-100 text-gray-800';
        };
        return DealsComponent_1;
    }());
    __setFunctionName(_classThis, "DealsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DealsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DealsComponent = _classThis;
}();
exports.DealsComponent = DealsComponent;
