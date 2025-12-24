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
exports.FaqComponent = void 0;
var core_1 = require("@angular/core");
var FaqComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-faq',
            templateUrl: './faq.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FaqComponent = _classThis = /** @class */ (function () {
        function FaqComponent_1() {
            this.faqItems = (0, core_1.signal)([
                {
                    question: 'What is Pipeliner?',
                    answer: 'Designed for today\'s fast-moving teams, Pipeliner is a CRM that bends to your needs. Its flexible data model and easy-to-build workflows let you shape the platform around your GTM...',
                    isOpen: true,
                },
                {
                    question: 'Can Pipeliner in Dark Mode?',
                    answer: 'Yes! Pipeliner supports a sleek and easy-on-the-eyes dark mode. You can toggle it in your user settings.',
                    isOpen: false,
                },
                {
                    question: 'Manage Member, Workspace, and Billing',
                    answer: 'You can manage all aspects of your workspace, members, and billing from the "Settings" page in your Pipeliner dashboard.',
                    isOpen: false,
                },
                {
                    question: 'Import & Export My Data in Pipeliner',
                    answer: 'Pipeliner offers robust data import and export tools. You can easily import from CSV or other CRM systems, and export your data at any time.',
                    isOpen: false,
                },
                {
                    question: 'How to Navigate and Build Workflows?',
                    answer: 'Our intuitive drag-and-drop workflow builder makes it simple to create powerful automations. Check out our video tutorials in the "Resources" section to get started.',
                    isOpen: false,
                },
                {
                    question: 'Pipeliner Chrome Extension',
                    answer: 'Access and manage your workspace from anywhere on the web or Gmail with the Pipeliner Chrome extension. Add or update records and lists, view relationship data, discover useful...',
                    isOpen: false,
                },
            ]);
        }
        FaqComponent_1.prototype.toggle = function (index) {
            this.faqItems.update(function (items) {
                return items.map(function (item, i) {
                    if (i === index) {
                        return __assign(__assign({}, item), { isOpen: !item.isOpen });
                    }
                    // Optional: close other items when one is opened
                    // return { ...item, isOpen: false };
                    return item; // Keep others as they are
                });
            });
        };
        return FaqComponent_1;
    }());
    __setFunctionName(_classThis, "FaqComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FaqComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FaqComponent = _classThis;
}();
exports.FaqComponent = FaqComponent;
