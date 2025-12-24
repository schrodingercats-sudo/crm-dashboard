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
exports.TasksComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var task_service_1 = require("../../task.service");
var data_access_service_1 = require("../../data-access.service");
var navigation_service_1 = require("../../navigation.service");
var add_task_dialog_component_1 = require("../../components/add-task-dialog/add-task-dialog.component");
var TasksComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-tasks',
            templateUrl: './tasks.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            imports: [common_1.CommonModule, add_task_dialog_component_1.AddTaskDialogComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TasksComponent = _classThis = /** @class */ (function () {
        function TasksComponent_1() {
            var _this = this;
            this.taskService = (0, core_1.inject)(task_service_1.TaskService);
            this.dataAccessService = (0, core_1.inject)(data_access_service_1.DataAccessService);
            this.navigationService = (0, core_1.inject)(navigation_service_1.NavigationService);
            this.showAddTaskDialog = (0, core_1.signal)(false);
            // Get role-appropriate data
            this.currentRole = this.navigationService.currentRole;
            this.tasks = this.taskService.getTasks();
            // Check if user can manage all data (admin only)
            this.canManageAllData = (0, core_1.computed)(function () {
                var currentUserEmail = _this.dataAccessService.getCurrentUserEmail();
                return _this.dataAccessService.canManageAllData(currentUserEmail);
            });
            // Role-based page title
            this.pageTitle = (0, core_1.computed)(function () {
                var role = _this.currentRole();
                return role === 'admin' ? 'All Tasks' : 'My Tasks';
            });
            // Task statistics
            this.taskStats = (0, core_1.computed)(function () {
                var allTasks = _this.tasks();
                var pending = allTasks.filter(function (task) { return task.status === 'Pending'; }).length;
                var inProgress = allTasks.filter(function (task) { return task.status === 'In Progress'; }).length;
                var completed = allTasks.filter(function (task) { return task.status === 'Completed'; }).length;
                var overdue = allTasks.filter(function (task) {
                    var dueDate = new Date(task.dueDate);
                    var today = new Date();
                    return task.status !== 'Completed' && dueDate < today;
                }).length;
                return {
                    total: allTasks.length,
                    pending: pending,
                    inProgress: inProgress,
                    completed: completed,
                    overdue: overdue
                };
            });
            // Tasks grouped by status
            this.tasksByStatus = (0, core_1.computed)(function () {
                var allTasks = _this.tasks();
                return {
                    'Pending': allTasks.filter(function (task) { return task.status === 'Pending'; }),
                    'In Progress': allTasks.filter(function (task) { return task.status === 'In Progress'; }),
                    'Completed': allTasks.filter(function (task) { return task.status === 'Completed'; })
                };
            });
        }
        // Get priority styling
        TasksComponent_1.prototype.getPriorityColor = function (priority) {
            var colors = {
                'High': 'bg-red-100 text-red-800',
                'Medium': 'bg-yellow-100 text-yellow-800',
                'Low': 'bg-green-100 text-green-800'
            };
            return colors[priority] || 'bg-gray-100 text-gray-800';
        };
        // Get status styling
        TasksComponent_1.prototype.getStatusColor = function (status) {
            var colors = {
                'Pending': 'bg-gray-100 text-gray-800',
                'In Progress': 'bg-blue-100 text-blue-800',
                'Completed': 'bg-green-100 text-green-800'
            };
            return colors[status] || 'bg-gray-100 text-gray-800';
        };
        // Check if task is overdue
        TasksComponent_1.prototype.isOverdue = function (task) {
            var dueDate = new Date(task.dueDate);
            var today = new Date();
            return task.status !== 'Completed' && dueDate < today;
        };
        return TasksComponent_1;
    }());
    __setFunctionName(_classThis, "TasksComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TasksComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TasksComponent = _classThis;
}();
exports.TasksComponent = TasksComponent;
