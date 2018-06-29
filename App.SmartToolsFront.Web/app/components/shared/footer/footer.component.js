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
var categorias_service_1 = require("../../../services/categorias.service");
var FooterComponent = /** @class */ (function () {
    function FooterComponent(router, categoriasService) {
        var _this = this;
        this.router = router;
        this.categoriasService = categoriasService;
        this.categorias = [];
        this.categoriasService.getAll().subscribe(function (res) {
            //this.categorias = res;
            if (res.length > 5) {
                while (_this.categorias.length < 5) {
                    var c = res[Math.floor(Math.random() * res.length)];
                    var e = _this.categorias.filter(function (x) { return x.CodGrupo == c.CodGrupo; });
                    if (e.length == 0) {
                        _this.categorias.push(c);
                    }
                }
            }
            else {
                _this.categorias = res;
            }
        }, function (err) { });
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        core_1.Component({
            selector: 'app-footer',
            templateUrl: './footer.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, categorias_service_1.CategoriasService])
    ], FooterComponent);
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;
//# sourceMappingURL=footer.component.js.map