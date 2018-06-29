"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var LumioComponent = /** @class */ (function () {
    function LumioComponent(pouter) {
        this.pouter = pouter;
        this.codigo = '';
    }
    LumioComponent.prototype.ngOnInit = function () {
    };
    LumioComponent.prototype.enviar = function () {
        if (this.codigo != "") { }
    };
    LumioComponent = __decorate([
        core_1.Component({
            selector: 'app-lumio',
            templateUrl: './lumio.component.html',
            styles: [
                "\n            .ng-valid[required], .ng-valid.required {\n                border-right: 2px solid #42A948;\n            }\n\n            .ng-invalid:not(form) {\n                border-right: 2px solid #a94442;\n            }\n        "
            ]
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], LumioComponent);
    return LumioComponent;
}());
exports.LumioComponent = LumioComponent;
//# sourceMappingURL=lumio.component.js.map