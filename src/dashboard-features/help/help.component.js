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
exports.HelpComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var HelpComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-help',
            templateUrl: './help.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            imports: [common_1.CommonModule, forms_1.FormsModule],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var HelpComponent = _classThis = /** @class */ (function () {
        function HelpComponent_1() {
            this.faqs = (0, core_1.signal)([
                {
                    question: 'How do I add a new lead?',
                    answer: 'Go to the Leads page and click the "Add Lead" button in the top right corner.',
                    isOpen: false
                },
                {
                    question: 'Can I change my password?',
                    answer: 'Yes, go to Settings > Security to update your password.',
                    isOpen: false
                },
                {
                    question: 'How do I integrate with Slack?',
                    answer: 'Navigate to the Integration page, find Slack in the list, and click "Connect".',
                    isOpen: false
                }
            ]);
            this.contactForm = (0, core_1.signal)({
                subject: '',
                message: ''
            });
        }
        HelpComponent_1.prototype.toggleFaq = function (index) {
            this.faqs.update(function (items) {
                return items.map(function (item, i) { return i === index ? __assign(__assign({}, item), { isOpen: !item.isOpen }) : item; });
            });
        };
        HelpComponent_1.prototype.submitSupportRequest = function () {
            console.log('Sending support request:', this.contactForm());
            alert('Support request sent! We will get back to you shortly.');
            this.contactForm.set({ subject: '', message: '' });
        };
        HelpComponent_1.prototype.updateSubject = function (subject) {
            this.contactForm.update(function (f) { return (__assign(__assign({}, f), { subject: subject })); });
        };
        HelpComponent_1.prototype.updateMessage = function (message) {
            this.contactForm.update(function (f) { return (__assign(__assign({}, f), { message: message })); });
        };
        return HelpComponent_1;
    }());
    __setFunctionName(_classThis, "HelpComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HelpComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HelpComponent = _classThis;
}();
exports.HelpComponent = HelpComponent;
