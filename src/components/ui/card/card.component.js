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
exports.CardFooterComponent = exports.CardContentComponent = exports.CardDescriptionComponent = exports.CardTitleComponent = exports.CardHeaderComponent = exports.CardComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var utils_1 = require("../../../lib/utils");
var CardComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-card',
            standalone: true,
            imports: [common_1.CommonModule],
            template: "\n    <div [class]=\"classes\">\n      <ng-content></ng-content>\n    </div>\n  "
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _class_decorators;
    var _class_initializers = [];
    var _class_extraInitializers = [];
    var CardComponent = _classThis = /** @class */ (function () {
        function CardComponent_1() {
            this.class = __runInitializers(this, _class_initializers, '');
            __runInitializers(this, _class_extraInitializers);
        }
        Object.defineProperty(CardComponent_1.prototype, "classes", {
            get: function () {
                return (0, utils_1.cn)("rounded-lg border bg-card text-card-foreground shadow-sm", this.class);
            },
            enumerable: false,
            configurable: true
        });
        return CardComponent_1;
    }());
    __setFunctionName(_classThis, "CardComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _class_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _class_decorators, { kind: "field", name: "class", static: false, private: false, access: { has: function (obj) { return "class" in obj; }, get: function (obj) { return obj.class; }, set: function (obj, value) { obj.class = value; } }, metadata: _metadata }, _class_initializers, _class_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CardComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CardComponent = _classThis;
}();
exports.CardComponent = CardComponent;
var CardHeaderComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-card-header',
            standalone: true,
            imports: [common_1.CommonModule],
            template: "\n    <div [class]=\"classes\">\n      <ng-content></ng-content>\n    </div>\n  "
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _class_decorators;
    var _class_initializers = [];
    var _class_extraInitializers = [];
    var CardHeaderComponent = _classThis = /** @class */ (function () {
        function CardHeaderComponent_1() {
            this.class = __runInitializers(this, _class_initializers, '');
            __runInitializers(this, _class_extraInitializers);
        }
        Object.defineProperty(CardHeaderComponent_1.prototype, "classes", {
            get: function () {
                return (0, utils_1.cn)("flex flex-col space-y-1.5 p-6", this.class);
            },
            enumerable: false,
            configurable: true
        });
        return CardHeaderComponent_1;
    }());
    __setFunctionName(_classThis, "CardHeaderComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _class_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _class_decorators, { kind: "field", name: "class", static: false, private: false, access: { has: function (obj) { return "class" in obj; }, get: function (obj) { return obj.class; }, set: function (obj, value) { obj.class = value; } }, metadata: _metadata }, _class_initializers, _class_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CardHeaderComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CardHeaderComponent = _classThis;
}();
exports.CardHeaderComponent = CardHeaderComponent;
var CardTitleComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-card-title',
            standalone: true,
            imports: [common_1.CommonModule],
            template: "\n    <h3 [class]=\"classes\">\n      <ng-content></ng-content>\n    </h3>\n  "
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _class_decorators;
    var _class_initializers = [];
    var _class_extraInitializers = [];
    var CardTitleComponent = _classThis = /** @class */ (function () {
        function CardTitleComponent_1() {
            this.class = __runInitializers(this, _class_initializers, '');
            __runInitializers(this, _class_extraInitializers);
        }
        Object.defineProperty(CardTitleComponent_1.prototype, "classes", {
            get: function () {
                return (0, utils_1.cn)("text-2xl font-semibold leading-none tracking-tight", this.class);
            },
            enumerable: false,
            configurable: true
        });
        return CardTitleComponent_1;
    }());
    __setFunctionName(_classThis, "CardTitleComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _class_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _class_decorators, { kind: "field", name: "class", static: false, private: false, access: { has: function (obj) { return "class" in obj; }, get: function (obj) { return obj.class; }, set: function (obj, value) { obj.class = value; } }, metadata: _metadata }, _class_initializers, _class_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CardTitleComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CardTitleComponent = _classThis;
}();
exports.CardTitleComponent = CardTitleComponent;
var CardDescriptionComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-card-description',
            standalone: true,
            imports: [common_1.CommonModule],
            template: "\n    <p [class]=\"classes\">\n      <ng-content></ng-content>\n    </p>\n  "
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _class_decorators;
    var _class_initializers = [];
    var _class_extraInitializers = [];
    var CardDescriptionComponent = _classThis = /** @class */ (function () {
        function CardDescriptionComponent_1() {
            this.class = __runInitializers(this, _class_initializers, '');
            __runInitializers(this, _class_extraInitializers);
        }
        Object.defineProperty(CardDescriptionComponent_1.prototype, "classes", {
            get: function () {
                return (0, utils_1.cn)("text-sm text-muted-foreground", this.class);
            },
            enumerable: false,
            configurable: true
        });
        return CardDescriptionComponent_1;
    }());
    __setFunctionName(_classThis, "CardDescriptionComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _class_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _class_decorators, { kind: "field", name: "class", static: false, private: false, access: { has: function (obj) { return "class" in obj; }, get: function (obj) { return obj.class; }, set: function (obj, value) { obj.class = value; } }, metadata: _metadata }, _class_initializers, _class_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CardDescriptionComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CardDescriptionComponent = _classThis;
}();
exports.CardDescriptionComponent = CardDescriptionComponent;
var CardContentComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-card-content',
            standalone: true,
            imports: [common_1.CommonModule],
            template: "\n    <div [class]=\"classes\">\n      <ng-content></ng-content>\n    </div>\n  "
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _class_decorators;
    var _class_initializers = [];
    var _class_extraInitializers = [];
    var CardContentComponent = _classThis = /** @class */ (function () {
        function CardContentComponent_1() {
            this.class = __runInitializers(this, _class_initializers, '');
            __runInitializers(this, _class_extraInitializers);
        }
        Object.defineProperty(CardContentComponent_1.prototype, "classes", {
            get: function () {
                return (0, utils_1.cn)("p-6 pt-0", this.class);
            },
            enumerable: false,
            configurable: true
        });
        return CardContentComponent_1;
    }());
    __setFunctionName(_classThis, "CardContentComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _class_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _class_decorators, { kind: "field", name: "class", static: false, private: false, access: { has: function (obj) { return "class" in obj; }, get: function (obj) { return obj.class; }, set: function (obj, value) { obj.class = value; } }, metadata: _metadata }, _class_initializers, _class_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CardContentComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CardContentComponent = _classThis;
}();
exports.CardContentComponent = CardContentComponent;
var CardFooterComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-card-footer',
            standalone: true,
            imports: [common_1.CommonModule],
            template: "\n    <div [class]=\"classes\">\n      <ng-content></ng-content>\n    </div>\n  "
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _class_decorators;
    var _class_initializers = [];
    var _class_extraInitializers = [];
    var CardFooterComponent = _classThis = /** @class */ (function () {
        function CardFooterComponent_1() {
            this.class = __runInitializers(this, _class_initializers, '');
            __runInitializers(this, _class_extraInitializers);
        }
        Object.defineProperty(CardFooterComponent_1.prototype, "classes", {
            get: function () {
                return (0, utils_1.cn)("flex items-center p-6 pt-0", this.class);
            },
            enumerable: false,
            configurable: true
        });
        return CardFooterComponent_1;
    }());
    __setFunctionName(_classThis, "CardFooterComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _class_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _class_decorators, { kind: "field", name: "class", static: false, private: false, access: { has: function (obj) { return "class" in obj; }, get: function (obj) { return obj.class; }, set: function (obj, value) { obj.class = value; } }, metadata: _metadata }, _class_initializers, _class_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CardFooterComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CardFooterComponent = _classThis;
}();
exports.CardFooterComponent = CardFooterComponent;
