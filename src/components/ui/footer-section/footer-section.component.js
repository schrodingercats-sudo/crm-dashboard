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
exports.FooterSectionComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var lucide_angular_1 = require("lucide-angular");
var FooterSectionComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-footer-section',
            standalone: true,
            imports: [common_1.CommonModule, lucide_angular_1.LucideAngularModule],
            template: "\n    <footer class=\"md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t bg-cover bg-center bg-no-repeat px-6 py-12 lg:py-16\" style=\"background-image: url('/assets/desktop-background.webp');\">\n      <div class=\"bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur\"></div>\n\n      <div class=\"grid w-full gap-8 xl:grid-cols-3 xl:gap-8\">\n        <div class=\"space-y-4 flex flex-col items-center text-center\">\n          <img src=\"https://quintessential-green-9mgcmipg8x-xl5fiw49na.edgeone.dev/zyptenix%20logo.png\" alt=\"Asme Logo\" class=\"h-8 w-auto\">\n          <p class=\"text-muted-foreground mt-8 text-sm md:mt-0\">\n            \u00A9 {{ currentYear }} Asme. All rights reserved.\n          </p>\n        </div>\n\n        <div class=\"mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0\">\n          <div *ngFor=\"let section of footerLinks\" class=\"mb-10 md:mb-0 flex flex-col items-center text-center\">\n            <h3 class=\"text-xs font-semibold\">{{ section.label }}</h3>\n            <ul class=\"text-muted-foreground mt-4 space-y-2 text-sm flex flex-col items-center\">\n              <li *ngFor=\"let link of section.links\">\n                <a\n                  [href]=\"link.href\"\n                  class=\"hover:text-foreground inline-flex items-center transition-all duration-300\"\n                >\n                  <lucide-icon *ngIf=\"link.icon\" [name]=\"link.icon\" class=\"me-1 size-4\"></lucide-icon>\n                  {{ link.title }}\n                </a>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </footer>\n  "
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FooterSectionComponent = _classThis = /** @class */ (function () {
        function FooterSectionComponent_1() {
            this.currentYear = new Date().getFullYear();
            this.FrameIcon = lucide_angular_1.Frame;
            this.footerLinks = [
                {
                    label: 'Product',
                    links: [
                        { title: 'Features', href: '#features' },
                        { title: 'Pricing', href: '#pricing' },
                        { title: 'Testimonials', href: '#testimonials' },
                        { title: 'Integration', href: '/' },
                    ],
                },
                {
                    label: 'Company',
                    links: [
                        { title: 'FAQs', href: '/faqs' },
                        { title: 'About Us', href: '/about' },
                        { title: 'Privacy Policy', href: '/privacy' },
                        { title: 'Terms of Services', href: '/terms' },
                    ],
                },
                {
                    label: 'Resources',
                    links: [
                        { title: 'Blog', href: '/blog' },
                        { title: 'Changelog', href: '/changelog' },
                        { title: 'Brand', href: '/brand' },
                        { title: 'Help', href: '/help' },
                    ],
                },
                {
                    label: 'Social Links',
                    links: [
                        { title: 'Facebook', href: '#', icon: lucide_angular_1.Facebook },
                        { title: 'Instagram', href: '#', icon: lucide_angular_1.Instagram },
                        { title: 'Youtube', href: '#', icon: lucide_angular_1.Youtube },
                        { title: 'LinkedIn', href: '#', icon: lucide_angular_1.Linkedin },
                    ],
                },
            ];
        }
        return FooterSectionComponent_1;
    }());
    __setFunctionName(_classThis, "FooterSectionComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FooterSectionComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FooterSectionComponent = _classThis;
}();
exports.FooterSectionComponent = FooterSectionComponent;
