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
exports.HeroSectionComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var HeroSectionComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-hero-section',
            templateUrl: './hero-section.component.html',
            imports: [common_1.NgOptimizedImage, router_1.RouterLink, common_1.CommonModule],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var HeroSectionComponent = _classThis = /** @class */ (function () {
        function HeroSectionComponent_1() {
            this.isMobileMenuOpen = (0, core_1.signal)(false);
            this.titleNumber = (0, core_1.signal)(0);
            this.titles = ["amazing", "new", "wonderful", "beautiful", "smart"];
            this.logos = [
                'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/asana.svg',
                'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/slack.svg',
                'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/webflow.svg',
                'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/atlassian.svg',
                'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/jira.svg',
            ];
        }
        HeroSectionComponent_1.prototype.ngOnInit = function () {
            this.startAnimationLoop();
        };
        HeroSectionComponent_1.prototype.ngOnDestroy = function () {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }
        };
        HeroSectionComponent_1.prototype.startAnimationLoop = function () {
            var _this = this;
            this.timeoutId = setTimeout(function () {
                if (_this.titleNumber() === _this.titles.length - 1) {
                    _this.titleNumber.set(0);
                }
                else {
                    _this.titleNumber.update(function (n) { return n + 1; });
                }
                _this.startAnimationLoop();
            }, 2000);
        };
        HeroSectionComponent_1.prototype.toggleMobileMenu = function () {
            this.isMobileMenuOpen.update(function (isOpen) { return !isOpen; });
        };
        return HeroSectionComponent_1;
    }());
    __setFunctionName(_classThis, "HeroSectionComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HeroSectionComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HeroSectionComponent = _classThis;
}();
exports.HeroSectionComponent = HeroSectionComponent;
