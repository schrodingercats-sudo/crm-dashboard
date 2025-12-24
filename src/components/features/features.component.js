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
exports.FeaturesComponent = exports.CircularUIComponent = exports.DualModeImageComponent = exports.CardDecoratorComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var lucide_angular_1 = require("lucide-angular");
var card_component_1 = require("../ui/card/card.component");
var utils_1 = require("../../lib/utils");
var CardDecoratorComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-card-decorator',
            standalone: true,
            template: "\n    <span class=\"border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2\"></span>\n    <span class=\"border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2\"></span>\n    <span class=\"border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2\"></span>\n    <span class=\"border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2\"></span>\n  "
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CardDecoratorComponent = _classThis = /** @class */ (function () {
        function CardDecoratorComponent_1() {
        }
        return CardDecoratorComponent_1;
    }());
    __setFunctionName(_classThis, "CardDecoratorComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CardDecoratorComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CardDecoratorComponent = _classThis;
}();
exports.CardDecoratorComponent = CardDecoratorComponent;
var DualModeImageComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-dual-mode-image',
            standalone: true,
            imports: [common_1.CommonModule, common_1.NgOptimizedImage],
            template: "\n    <img\n        [ngSrc]=\"darkSrc\"\n        [class]=\"cn('hidden dark:block', className)\"\n        [alt]=\"alt + ' dark'\"\n        [width]=\"width\"\n        [height]=\"height\"\n    />\n    <img\n        [ngSrc]=\"lightSrc\"\n        [class]=\"cn('shadow dark:hidden', className)\"\n        [alt]=\"alt + ' light'\"\n        [width]=\"width\"\n        [height]=\"height\"\n    />\n  "
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _darkSrc_decorators;
    var _darkSrc_initializers = [];
    var _darkSrc_extraInitializers = [];
    var _lightSrc_decorators;
    var _lightSrc_initializers = [];
    var _lightSrc_extraInitializers = [];
    var _alt_decorators;
    var _alt_initializers = [];
    var _alt_extraInitializers = [];
    var _width_decorators;
    var _width_initializers = [];
    var _width_extraInitializers = [];
    var _height_decorators;
    var _height_initializers = [];
    var _height_extraInitializers = [];
    var _className_decorators;
    var _className_initializers = [];
    var _className_extraInitializers = [];
    var DualModeImageComponent = _classThis = /** @class */ (function () {
        function DualModeImageComponent_1() {
            this.darkSrc = __runInitializers(this, _darkSrc_initializers, void 0);
            this.lightSrc = (__runInitializers(this, _darkSrc_extraInitializers), __runInitializers(this, _lightSrc_initializers, void 0));
            this.alt = (__runInitializers(this, _lightSrc_extraInitializers), __runInitializers(this, _alt_initializers, void 0));
            this.width = (__runInitializers(this, _alt_extraInitializers), __runInitializers(this, _width_initializers, void 0));
            this.height = (__runInitializers(this, _width_extraInitializers), __runInitializers(this, _height_initializers, void 0));
            this.className = (__runInitializers(this, _height_extraInitializers), __runInitializers(this, _className_initializers, ''));
            this.cn = (__runInitializers(this, _className_extraInitializers), utils_1.cn);
        }
        return DualModeImageComponent_1;
    }());
    __setFunctionName(_classThis, "DualModeImageComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _darkSrc_decorators = [(0, core_1.Input)()];
        _lightSrc_decorators = [(0, core_1.Input)()];
        _alt_decorators = [(0, core_1.Input)()];
        _width_decorators = [(0, core_1.Input)()];
        _height_decorators = [(0, core_1.Input)()];
        _className_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _darkSrc_decorators, { kind: "field", name: "darkSrc", static: false, private: false, access: { has: function (obj) { return "darkSrc" in obj; }, get: function (obj) { return obj.darkSrc; }, set: function (obj, value) { obj.darkSrc = value; } }, metadata: _metadata }, _darkSrc_initializers, _darkSrc_extraInitializers);
        __esDecorate(null, null, _lightSrc_decorators, { kind: "field", name: "lightSrc", static: false, private: false, access: { has: function (obj) { return "lightSrc" in obj; }, get: function (obj) { return obj.lightSrc; }, set: function (obj, value) { obj.lightSrc = value; } }, metadata: _metadata }, _lightSrc_initializers, _lightSrc_extraInitializers);
        __esDecorate(null, null, _alt_decorators, { kind: "field", name: "alt", static: false, private: false, access: { has: function (obj) { return "alt" in obj; }, get: function (obj) { return obj.alt; }, set: function (obj, value) { obj.alt = value; } }, metadata: _metadata }, _alt_initializers, _alt_extraInitializers);
        __esDecorate(null, null, _width_decorators, { kind: "field", name: "width", static: false, private: false, access: { has: function (obj) { return "width" in obj; }, get: function (obj) { return obj.width; }, set: function (obj, value) { obj.width = value; } }, metadata: _metadata }, _width_initializers, _width_extraInitializers);
        __esDecorate(null, null, _height_decorators, { kind: "field", name: "height", static: false, private: false, access: { has: function (obj) { return "height" in obj; }, get: function (obj) { return obj.height; }, set: function (obj, value) { obj.height = value; } }, metadata: _metadata }, _height_initializers, _height_extraInitializers);
        __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: function (obj) { return "className" in obj; }, get: function (obj) { return obj.className; }, set: function (obj, value) { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DualModeImageComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DualModeImageComponent = _classThis;
}();
exports.DualModeImageComponent = DualModeImageComponent;
var CircularUIComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-circular-ui',
            standalone: true,
            imports: [common_1.CommonModule],
            template: "\n    <div [class]=\"className\">\n        <div class=\"bg-gradient-to-b from-border size-fit rounded-2xl to-transparent p-px\">\n            <div class=\"bg-gradient-to-b from-background to-muted/25 relative flex aspect-square w-fit items-center -space-x-4 rounded-[15px] p-4\">\n                <div *ngFor=\"let circle of circles\"\n                    [class]=\"getCircleClasses(circle)\"\n                ></div>\n            </div>\n        </div>\n        <span class=\"text-muted-foreground mt-1.5 block text-center text-sm\">{{ label }}</span>\n    </div>\n  "
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _label_decorators;
    var _label_initializers = [];
    var _label_extraInitializers = [];
    var _circles_decorators;
    var _circles_initializers = [];
    var _circles_extraInitializers = [];
    var _className_decorators;
    var _className_initializers = [];
    var _className_extraInitializers = [];
    var CircularUIComponent = _classThis = /** @class */ (function () {
        function CircularUIComponent_1() {
            this.label = __runInitializers(this, _label_initializers, void 0);
            this.circles = (__runInitializers(this, _label_extraInitializers), __runInitializers(this, _circles_initializers, []));
            this.className = (__runInitializers(this, _circles_extraInitializers), __runInitializers(this, _className_initializers, ''));
            __runInitializers(this, _className_extraInitializers);
        }
        CircularUIComponent_1.prototype.getCircleClasses = function (circle) {
            return (0, utils_1.cn)('size-7 rounded-full border sm:size-8', {
                'border-primary': circle.pattern === 'none',
                'border-primary bg-[repeating-linear-gradient(-45deg,hsl(var(--border)),hsl(var(--border))_1px,transparent_1px,transparent_4px)]': circle.pattern === 'border',
                'border-primary bg-background bg-[repeating-linear-gradient(-45deg,hsl(var(--primary)),hsl(var(--primary))_1px,transparent_1px,transparent_4px)]': circle.pattern === 'primary',
                'bg-background z-1 border-blue-500 bg-[repeating-linear-gradient(-45deg,theme(colors.blue.500),theme(colors.blue.500)_1px,transparent_1px,transparent_4px)]': circle.pattern === 'blue',
            });
        };
        return CircularUIComponent_1;
    }());
    __setFunctionName(_classThis, "CircularUIComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _label_decorators = [(0, core_1.Input)()];
        _circles_decorators = [(0, core_1.Input)()];
        _className_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _label_decorators, { kind: "field", name: "label", static: false, private: false, access: { has: function (obj) { return "label" in obj; }, get: function (obj) { return obj.label; }, set: function (obj, value) { obj.label = value; } }, metadata: _metadata }, _label_initializers, _label_extraInitializers);
        __esDecorate(null, null, _circles_decorators, { kind: "field", name: "circles", static: false, private: false, access: { has: function (obj) { return "circles" in obj; }, get: function (obj) { return obj.circles; }, set: function (obj, value) { obj.circles = value; } }, metadata: _metadata }, _circles_initializers, _circles_extraInitializers);
        __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: function (obj) { return "className" in obj; }, get: function (obj) { return obj.className; }, set: function (obj, value) { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CircularUIComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CircularUIComponent = _classThis;
}();
exports.CircularUIComponent = CircularUIComponent;
var FeaturesComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-features',
            standalone: true,
            imports: [
                common_1.CommonModule,
                lucide_angular_1.LucideAngularModule,
                card_component_1.CardComponent,
                card_component_1.CardHeaderComponent,
                card_component_1.CardContentComponent,
                CardDecoratorComponent,
                DualModeImageComponent,
                CircularUIComponent
            ],
            template: "\n    <section class=\"bg-zinc-50 py-16 md:py-32 dark:bg-transparent\">\n      <div class=\"mx-auto max-w-2xl px-6 lg:max-w-5xl\">\n        <div class=\"mx-auto grid gap-4 lg:grid-cols-2\">\n          \n          <!-- Feature 1 -->\n          <app-card class=\"group relative rounded-none shadow-zinc-950/5\">\n            <app-card-decorator></app-card-decorator>\n            <app-card-header class=\"pb-3\">\n              <div class=\"p-6 flex flex-col items-center text-center\">\n                <span class=\"text-muted-foreground flex items-center gap-2 justify-center\">\n                  <lucide-icon [name]=\"MapIcon\" class=\"size-4\"></lucide-icon>\n                  Real time location tracking\n                </span>\n                <p class=\"mt-8 text-2xl font-semibold\">Advanced tracking system, Instantly locate all your assets.</p>\n              </div>\n            </app-card-header>\n\n            <div class=\"relative mb-6 border-t border-dashed sm:mb-0\">\n              <div class=\"absolute inset-0 [background:radial-gradient(125%_125%_at_50%_0%,transparent_40%,hsl(var(--muted)),white_125%)]\"></div>\n              <div class=\"aspect-[76/59] p-1 px-6\">\n                 <app-dual-mode-image\n                    darkSrc=\"https://tailark.com/_next/image?url=%2Fpayments.png&w=3840&q=75\"\n                    lightSrc=\"https://tailark.com/_next/image?url=%2Fpayments-light.png&w=3840&q=75\"\n                    alt=\"payments illustration\"\n                    [width]=\"1207\"\n                    [height]=\"929\"\n                ></app-dual-mode-image>\n              </div>\n            </div>\n          </app-card>\n\n          <!-- Feature 2 -->\n          <app-card class=\"group relative rounded-none shadow-zinc-950/5\">\n            <app-card-decorator></app-card-decorator>\n            <app-card-header class=\"pb-3\">\n               <div class=\"p-6 flex flex-col items-center text-center\">\n                <span class=\"text-muted-foreground flex items-center gap-2 justify-center\">\n                  <lucide-icon [name]=\"CalendarIcon\" class=\"size-4\"></lucide-icon>\n                  Advanced Scheduling\n                </span>\n                <p class=\"mt-8 text-2xl font-semibold\">Scheduling system, Instantly locate all your assets.</p>\n              </div>\n            </app-card-header>\n\n            <app-card-content>\n              <div class=\"relative mb-6 sm:mb-0\">\n                <div class=\"absolute -inset-6 [background:radial-gradient(50%_50%_at_75%_50%,transparent,hsl(var(--background))_100%)]\"></div>\n                <div class=\"aspect-[76/59] border\">\n                  <app-dual-mode-image\n                        darkSrc=\"https://tailark.com/_next/image?url=%2Forigin-cal-dark.png&w=3840&q=75\"\n                        lightSrc=\"https://tailark.com/_next/image?url=%2Forigin-cal.png&w=3840&q=75\"\n                        alt=\"calendar illustration\"\n                        [width]=\"1207\"\n                        [height]=\"929\"\n                    ></app-dual-mode-image>\n                </div>\n              </div>\n            </app-card-content>\n          </app-card>\n\n          <!-- Feature 3 -->\n          <app-card class=\"group relative rounded-none shadow-zinc-950/5 p-6 lg:col-span-2\">\n            <app-card-decorator></app-card-decorator>\n            <p class=\"mx-auto my-6 max-w-md text-balance text-center text-2xl font-semibold\">Smart scheduling with automated reminders for maintenance.</p>\n\n            <div class=\"flex justify-center gap-6 overflow-hidden\">\n               <app-circular-ui\n                    label=\"Inclusion\"\n                    [circles]=\"[{ pattern: 'border' }, { pattern: 'border' }]\"\n                ></app-circular-ui>\n\n                <app-circular-ui\n                    label=\"Inclusion\"\n                    [circles]=\"[{ pattern: 'none' }, { pattern: 'primary' }]\"\n                ></app-circular-ui>\n\n                <app-circular-ui\n                    label=\"Join\"\n                    [circles]=\"[{ pattern: 'blue' }, { pattern: 'none' }]\"\n                ></app-circular-ui>\n\n                <app-circular-ui\n                    label=\"Exclusion\"\n                    [circles]=\"[{ pattern: 'primary' }, { pattern: 'none' }]\"\n                    class=\"hidden sm:block\"\n                ></app-circular-ui>\n            </div>\n          </app-card>\n\n        </div>\n      </div>\n    </section>\n  "
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FeaturesComponent = _classThis = /** @class */ (function () {
        function FeaturesComponent_1() {
            this.MapIcon = lucide_angular_1.Map;
            this.CalendarIcon = lucide_angular_1.Calendar;
        }
        return FeaturesComponent_1;
    }());
    __setFunctionName(_classThis, "FeaturesComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FeaturesComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FeaturesComponent = _classThis;
}();
exports.FeaturesComponent = FeaturesComponent;
