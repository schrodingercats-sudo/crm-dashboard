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
exports.AddDealDialogComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var deal_service_1 = require("../../deal.service");
var toast_service_1 = require("../../toast.service");
var AddDealDialogComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-add-deal-dialog',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.FormsModule],
            template: "\n    <div class=\"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm\">\n      <div class=\"bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden\">\n        <div class=\"p-6 border-b border-gray-100 flex justify-between items-center\">\n          <h3 class=\"text-lg font-bold text-gray-900\">Add New Deal</h3>\n          <button (click)=\"close()\" class=\"text-gray-400 hover:text-gray-600\">\n            <svg class=\"w-5 h-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M6 18L18 6M6 6l12 12\" /></svg>\n          </button>\n        </div>\n        \n        <form (ngSubmit)=\"onSubmit()\" class=\"p-6 space-y-4\">\n          <div>\n            <label class=\"block text-sm font-medium text-gray-700 mb-1\">Deal Title</label>\n            <input [(ngModel)]=\"deal.title\" name=\"title\" type=\"text\" required class=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all\">\n          </div>\n          \n          <div>\n            <label class=\"block text-sm font-medium text-gray-700 mb-1\">Company</label>\n            <input [(ngModel)]=\"deal.company\" name=\"company\" type=\"text\" required class=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all\">\n          </div>\n\n          <div>\n             <label class=\"block text-sm font-medium text-gray-700 mb-1\">Value</label>\n             <input [(ngModel)]=\"deal.value\" name=\"value\" type=\"number\" required class=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all\">\n          </div>\n\n          <div>\n             <label class=\"block text-sm font-medium text-gray-700 mb-1\">Stage</label>\n             <select [(ngModel)]=\"deal.stage\" name=\"stage\" class=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all\">\n                <option value=\"New\">New</option>\n                <option value=\"Qualification\">Qualification</option>\n                <option value=\"Negotiation\">Negotiation</option>\n                <option value=\"Won\">Won</option>\n                <option value=\"Lost\">Lost</option>\n             </select>\n          </div>\n\n          <div>\n             <label class=\"block text-sm font-medium text-gray-700 mb-1\">Type</label>\n             <select [(ngModel)]=\"deal.type\" name=\"type\" class=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all\">\n                <option value=\"Software\">Software</option>\n                <option value=\"Service\">Service</option>\n                <option value=\"Consulting\">Consulting</option>\n                <option value=\"Training\">Training</option>\n             </select>\n          </div>\n\n          <div class=\"pt-4 flex justify-end space-x-3\">\n            <button type=\"button\" (click)=\"close()\" class=\"px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors\">Cancel</button>\n            <button type=\"submit\" [disabled]=\"loading\" class=\"px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors\">\n                {{ loading ? 'Saving...' : 'Save Deal' }}\n            </button>\n          </div>\n        </form>\n      </div>\n    </div>\n  "
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _closed_decorators;
    var _closed_initializers = [];
    var _closed_extraInitializers = [];
    var AddDealDialogComponent = _classThis = /** @class */ (function () {
        function AddDealDialogComponent_1() {
            this.closed = __runInitializers(this, _closed_initializers, new core_1.EventEmitter());
            this.dealService = (__runInitializers(this, _closed_extraInitializers), (0, core_1.inject)(deal_service_1.DealService));
            this.toastService = (0, core_1.inject)(toast_service_1.ToastService);
            this.loading = false;
            this.deal = {
                title: '',
                company: '',
                value: 0,
                stage: 'New',
                ownerAvatar: 'https://i.pravatar.cc/150?u=' + Math.random(),
                type: 'Software',
                typeColor: 'bg-blue-100 text-blue-800'
            };
        }
        AddDealDialogComponent_1.prototype.close = function () {
            this.closed.emit();
        };
        AddDealDialogComponent_1.prototype.onSubmit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.loading = true;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, this.dealService.addDeal(this.deal)];
                        case 2:
                            _a.sent();
                            this.toastService.show('Deal added successfully', 'success');
                            this.close();
                            return [3 /*break*/, 5];
                        case 3:
                            e_1 = _a.sent();
                            console.error(e_1);
                            this.toastService.show('Failed to add deal', 'error');
                            return [3 /*break*/, 5];
                        case 4:
                            this.loading = false;
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        return AddDealDialogComponent_1;
    }());
    __setFunctionName(_classThis, "AddDealDialogComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _closed_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _closed_decorators, { kind: "field", name: "closed", static: false, private: false, access: { has: function (obj) { return "closed" in obj; }, get: function (obj) { return obj.closed; }, set: function (obj, value) { obj.closed = value; } }, metadata: _metadata }, _closed_initializers, _closed_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AddDealDialogComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AddDealDialogComponent = _classThis;
}();
exports.AddDealDialogComponent = AddDealDialogComponent;
