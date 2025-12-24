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
exports.LeadsComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var contact_service_1 = require("../../contact.service");
var data_access_service_1 = require("../../data-access.service");
var navigation_service_1 = require("../../navigation.service");
var add_contact_dialog_component_1 = require("../../components/add-contact-dialog/add-contact-dialog.component");
var LeadsComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-leads',
            templateUrl: './leads.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            imports: [common_1.CommonModule, add_contact_dialog_component_1.AddContactDialogComponent],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var LeadsComponent = _classThis = /** @class */ (function () {
        function LeadsComponent_1() {
            var _this = this;
            this.contactService = (0, core_1.inject)(contact_service_1.ContactService);
            this.dataAccessService = (0, core_1.inject)(data_access_service_1.DataAccessService);
            this.navigationService = (0, core_1.inject)(navigation_service_1.NavigationService);
            this.activeTab = (0, core_1.signal)('leads');
            this.showAddContactDialog = (0, core_1.signal)(false);
            // Get role-appropriate data
            this.currentRole = this.navigationService.currentRole;
            this.leads = this.contactService.getLeads();
            // Role-based referrals data (admin sees all, users see their own)
            this.referrals = (0, core_1.computed)(function () {
                var role = _this.currentRole();
                var currentUserEmail = _this.dataAccessService.getCurrentUserEmail();
                var allReferrals = [
                    { id: 1, name: 'Esther Howard', email: 'esther.howard@gmail.com', type: 'Real Estate Agent', referred: 12, commission: '$4,500', status: 'Active', ownerEmail: 'pratham.solanki30@gmail.com' },
                    { id: 2, name: 'Cameron Williamson', email: 'cameron.williamson@gmail.com', type: 'Financial Advisor', referred: 8, commission: '$3,200', status: 'Active', ownerEmail: 'user@example.com' },
                    { id: 3, name: 'Brooklyn Simmons', email: 'brooklyn.simmons@gmail.com', type: 'Lawyer', referred: 3, commission: '$1,100', status: 'Pending', ownerEmail: 'pratham.solanki30@gmail.com' },
                    { id: 4, name: 'Guy Hawkins', email: 'guy.hawkins@gmail.com', type: 'Mortgage Broker', referred: 25, commission: '$12,000', status: 'Active', ownerEmail: 'user@example.com' },
                    { id: 5, name: 'Robert Fox', email: 'robert.fox@gmail.com', type: 'Accountant', referred: 5, commission: '$1,800', status: 'Inactive', ownerEmail: currentUserEmail || 'user@example.com' },
                ];
                // Filter referrals based on user role
                return _this.dataAccessService.filterDataForUser(allReferrals, currentUserEmail);
            });
            this.itemsPerPage = (0, core_1.signal)(5);
            this.currentPage = (0, core_1.signal)(1);
            this.paginatedLeads = (0, core_1.computed)(function () {
                var startIndex = (_this.currentPage() - 1) * _this.itemsPerPage();
                return _this.leads().slice(startIndex, startIndex + _this.itemsPerPage());
            });
            this.totalPages = (0, core_1.computed)(function () { return Math.ceil(_this.leads().length / _this.itemsPerPage()); });
            this.visiblePages = (0, core_1.computed)(function () {
                var total = _this.totalPages();
                var current = _this.currentPage();
                var pages = [];
                // Simple pagination logic for now (all pages if small count, else ellipsis logic could be added)
                // Given the small dataset, we'll just show all pages for simplicity, or a simple window.
                // Let's implement a simple version that shows all pages since the dataset is small.
                for (var i = 1; i <= total; i++) {
                    pages.push(i);
                }
                return pages;
            });
            this.stageClasses = (0, core_1.computed)(function () {
                return function (stage) {
                    switch (stage) {
                        case 'New':
                            return 'bg-purple-100 text-purple-800';
                        case 'In progress':
                            return 'bg-green-100 text-green-800';
                        case 'Loan Granted':
                            return 'bg-yellow-100 text-yellow-800';
                        default:
                            return 'bg-gray-100 text-gray-800';
                    }
                };
            });
            // Check if user can manage all data (admin only)
            this.canManageAllData = (0, core_1.computed)(function () {
                var currentUserEmail = _this.dataAccessService.getCurrentUserEmail();
                return _this.dataAccessService.canManageAllData(currentUserEmail);
            });
            // Role-based page title
            this.pageTitle = (0, core_1.computed)(function () {
                var role = _this.currentRole();
                return role === 'admin' ? 'All Leads' : 'My Leads';
            });
        }
        LeadsComponent_1.prototype.goToPage = function (page) {
            if (page >= 1 && page <= this.totalPages()) {
                this.currentPage.set(page);
            }
        };
        LeadsComponent_1.prototype.nextPage = function () {
            if (this.currentPage() < this.totalPages()) {
                this.currentPage.update(function (p) { return p + 1; });
            }
        };
        LeadsComponent_1.prototype.prevPage = function () {
            if (this.currentPage() > 1) {
                this.currentPage.update(function (p) { return p - 1; });
            }
        };
        return LeadsComponent_1;
    }());
    __setFunctionName(_classThis, "LeadsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LeadsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LeadsComponent = _classThis;
}();
exports.LeadsComponent = LeadsComponent;
