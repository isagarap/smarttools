"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NotifyService = /** @class */ (function () {
    function NotifyService() {
    }
    NotifyService.prototype.success = function (message) {
        $.notify({
            icon: 'glyphicon glyphicon-ok',
            message: "  " + message
        }, {
            type: 'success'
        });
    };
    NotifyService.prototype.danger = function (message) {
        $.notify({
            icon: 'glyphicon glyphicon-remove',
            message: "  " + message
        }, {
            type: 'danger'
        });
    };
    NotifyService.prototype.warning = function (message) {
        $.notify({
            icon: 'glyphicon glyphicon-exclamation-sign',
            message: "  " + message
        }, {
            type: 'warning'
        });
    };
    NotifyService = __decorate([
        core_1.Injectable()
    ], NotifyService);
    return NotifyService;
}());
exports.NotifyService = NotifyService;
//# sourceMappingURL=notify.service.js.map