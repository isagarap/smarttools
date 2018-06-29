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
var parametros_service_1 = require("../../../services/parametros.service");
var loader_service_1 = require("../../../services/loader.service");
var notify_service_1 = require("../../../services/notify.service");
var router_1 = require("@angular/router");
var SuccessfullComponent = /** @class */ (function () {
    function SuccessfullComponent(pouter, parametrosService, loaderService, notifyService) {
        var _this = this;
        this.pouter = pouter;
        this.parametrosService = parametrosService;
        this.loaderService = loaderService;
        this.notifyService = notifyService;
        this.Nombre = 'Smart-Tools SPA';
        this.RutPago = '';
        this.CuentaCorriente1 = '';
        this.CuentaCorriente2 = '';
        this.EmailPago = '';
        this.NumNotaVenta = '';
        this.loaderService.display(true);
        this.parametrosService.getByNombre('RutPago').subscribe(function (res) {
            _this.RutPago = res.Valor;
            _this.parametrosService.getByNombre('CuentaCorriente1').subscribe(function (res1) {
                _this.CuentaCorriente1 = res1.Valor;
                _this.parametrosService.getByNombre('CuentaCorriente2').subscribe(function (res2) {
                    _this.CuentaCorriente2 = res2.Valor;
                    _this.parametrosService.getByNombre('EmailPago').subscribe(function (res3) {
                        _this.EmailPago = res3.Valor;
                        _this.loaderService.display(false);
                    }, function (err3) { _this.notifyService.danger('Problemas al obtener parametros'); _this.loaderService.display(false); });
                }, function (err2) { _this.notifyService.danger('Problemas al obtener parametros'); _this.loaderService.display(false); });
            }, function (err1) { _this.notifyService.danger('Problemas al obtener parametros'); _this.loaderService.display(false); });
        }, function (err) { _this.notifyService.danger('Problemas al obtener parametros'); _this.loaderService.display(false); });
    }
    SuccessfullComponent.prototype.ngOnInit = function () {
        $('html,body').scrollTop(0);
        var numNV = localStorage.getItem('numNotaVenta');
        if (numNV != null) {
            this.NumNotaVenta = numNV;
        }
        localStorage.removeItem('numNotaVenta');
    };
    SuccessfullComponent = __decorate([
        core_1.Component({
            selector: 'app-successfull',
            templateUrl: './successfull.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, parametros_service_1.ParametrosService,
            loader_service_1.LoaderService, notify_service_1.NotifyService])
    ], SuccessfullComponent);
    return SuccessfullComponent;
}());
exports.SuccessfullComponent = SuccessfullComponent;
//# sourceMappingURL=successfull.component.js.map