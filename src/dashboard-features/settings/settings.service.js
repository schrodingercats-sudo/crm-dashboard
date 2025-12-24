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
exports.SettingsService = void 0;
var core_1 = require("@angular/core");
var SettingsService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SettingsService = _classThis = /** @class */ (function () {
        function SettingsService_1() {
            var _this = this;
            this.STORAGE_KEY = 'zyptenix_settings';
            this.settings = (0, core_1.signal)({
                profile: {
                    name: 'Prathamesh',
                    email: 'prath@example.com',
                    bio: 'Full Stack Developer | Angular Enthusiast'
                },
                notifications: {
                    email: true,
                    sms: false,
                    push: true
                },
                appearance: {
                    theme: 'light'
                }
            });
            this.loadSettings();
            // Effect to apply theme whenever it changes
            (0, core_1.effect)(function () {
                var theme = _this.settings().appearance.theme;
                _this.applyTheme(theme);
            });
            // Effect to save settings whenever they change
            (0, core_1.effect)(function () {
                localStorage.setItem(_this.STORAGE_KEY, JSON.stringify(_this.settings()));
            });
        }
        SettingsService_1.prototype.loadSettings = function () {
            var saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved) {
                try {
                    var parsed = JSON.parse(saved);
                    this.settings.set(__assign(__assign({}, this.settings()), parsed));
                }
                catch (e) {
                    console.error('Failed to parse settings', e);
                }
            }
        };
        SettingsService_1.prototype.applyTheme = function (theme) {
            var htmlElement = document.documentElement;
            if (theme === 'dark') {
                htmlElement.classList.add('dark');
            }
            else {
                htmlElement.classList.remove('dark');
            }
        };
        SettingsService_1.prototype.updateProfile = function (partialProfile) {
            this.settings.update(function (s) { return (__assign(__assign({}, s), { profile: __assign(__assign({}, s.profile), partialProfile) })); });
        };
        SettingsService_1.prototype.updateNotifications = function (partialNotif) {
            this.settings.update(function (s) { return (__assign(__assign({}, s), { notifications: __assign(__assign({}, s.notifications), partialNotif) })); });
        };
        SettingsService_1.prototype.updateAppearance = function (partialAppearance) {
            this.settings.update(function (s) { return (__assign(__assign({}, s), { appearance: __assign(__assign({}, s.appearance), partialAppearance) })); });
        };
        return SettingsService_1;
    }());
    __setFunctionName(_classThis, "SettingsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SettingsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SettingsService = _classThis;
}();
exports.SettingsService = SettingsService;
