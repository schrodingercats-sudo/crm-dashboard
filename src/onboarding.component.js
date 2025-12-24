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
exports.OnboardingComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_service_1 = require("./auth.service");
var OnboardingComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-onboarding',
            templateUrl: './onboarding.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            imports: [router_1.RouterLink],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OnboardingComponent = _classThis = /** @class */ (function () {
        function OnboardingComponent_1() {
            var _this = this;
            this.state = (0, core_1.signal)({
                step: 1,
                fullName: '',
                email: '',
                password: '',
                teamSize: null,
                role: null,
                goal: null,
            });
            this.currentStep = (0, core_1.computed)(function () { return _this.state().step; });
            this.progress = (0, core_1.computed)(function () { return ((_this.state().step - 1) / 3) * 100; });
            this.teamSizeOptions = ['1-5', '6-20', '21-100', '101-500', '500+ members'];
            this.roleOptions = ['Founder / C-level', 'Sales', 'Marketing', 'Operations', 'Product / Engineering', 'Other'];
            this.goalOptions = [
                'Manage my pipeline',
                'Automate workflows',
                'Improve team productivity',
                'Get better reports',
                'Integrate with my tools',
                'Something else',
            ];
            this.router = (0, core_1.inject)(router_1.Router);
            this.authService = (0, core_1.inject)(auth_service_1.AuthService);
            this.isStep1Valid = (0, core_1.computed)(function () {
                var _a = _this.state(), fullName = _a.fullName, email = _a.email, password = _a.password;
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return (fullName.trim().length > 2 &&
                    emailRegex.test(email) &&
                    password.length >= 8);
            });
            this.isStep2Valid = (0, core_1.computed)(function () { return _this.state().teamSize !== null; });
            this.isStep3Valid = (0, core_1.computed)(function () { return _this.state().role !== null; });
            this.isStep4Valid = (0, core_1.computed)(function () { return _this.state().goal !== null; });
            this.isCurrentStepValid = (0, core_1.computed)(function () {
                switch (_this.state().step) {
                    case 1:
                        return _this.isStep1Valid();
                    case 2:
                        return _this.isStep2Valid();
                    case 3:
                        return _this.isStep3Valid();
                    case 4:
                        return _this.isStep4Valid();
                    default:
                        return false;
                }
            });
        }
        OnboardingComponent_1.prototype.nextStep = function () {
            if (!this.isCurrentStepValid())
                return;
            if (this.state().step < 4) {
                this.state.update(function (s) { return (__assign(__assign({}, s), { step: s.step + 1 })); });
            }
            else {
                // Finish onboarding and navigate to the main app dashboard
                this.signUp();
            }
        };
        OnboardingComponent_1.prototype.signUpWithGoogle = function () {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.authService.loginWithGoogle('signup')];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error(error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        OnboardingComponent_1.prototype.signUp = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, email, password, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.state(), email = _a.email, password = _a.password;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.authService.signUpWithEmail(email, password)];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _b.sent();
                            console.error(error_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        OnboardingComponent_1.prototype.prevStep = function () {
            if (this.state().step > 1) {
                this.state.update(function (s) { return (__assign(__assign({}, s), { step: s.step + 1 })); });
            }
        };
        OnboardingComponent_1.prototype.selectOption = function (field, value) {
            var _this = this;
            this.state.update(function (s) {
                var _a;
                return (__assign(__assign({}, s), (_a = {}, _a[field] = value, _a)));
            });
            // Automatically move to next step after selection for a smoother UX
            setTimeout(function () { return _this.nextStep(); }, 200);
        };
        OnboardingComponent_1.prototype.onInput = function (field, event) {
            var value = event.target.value;
            this.state.update(function (s) {
                var _a;
                return (__assign(__assign({}, s), (_a = {}, _a[field] = value, _a)));
            });
        };
        return OnboardingComponent_1;
    }());
    __setFunctionName(_classThis, "OnboardingComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OnboardingComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OnboardingComponent = _classThis;
}();
exports.OnboardingComponent = OnboardingComponent;
