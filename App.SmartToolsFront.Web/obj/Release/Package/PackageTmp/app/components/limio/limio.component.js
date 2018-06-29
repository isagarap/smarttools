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
var registralumio_service_1 = require("../../services/registralumio.service");
var notify_service_1 = require("../../services/notify.service");
var loader_service_1 = require("../../services/loader.service");
var app_constants_1 = require("../../app.constants");
var LimioComponent = /** @class */ (function () {
    function LimioComponent(pouter, registraLumioService, notifyService, loaderService, configuration) {
        this.pouter = pouter;
        this.registraLumioService = registraLumioService;
        this.notifyService = notifyService;
        this.loaderService = loaderService;
        this.configuration = configuration;
        this.registro = {
            fecha: null,
            codigo: '',
            numero: '',
            nroserie: '',
            nombrepropietario: '',
            rut: '',
            email: ''
        };
        this.selectedTipo = [];
        this.tipos = [];
        this.tipos.push({ Id: 1, Nombre: 'Boleta' });
        this.tipos.push({ Id: 2, Nombre: 'Factura' });
    }
    LimioComponent.prototype.ngOnInit = function () {
        $("#datepicker").datepicker({
            autoSize: true,
            changeMonth: true,
            changeYear: true,
            maxDate: new Date(),
            dateFormat: "dd-mm-yy",
            dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
            dayNames: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
            monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "Mar", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Maj", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        });
        $("#datepicker").datepicker().datepicker("setDate", new Date());
    };
    LimioComponent.prototype.isValidRUT = function (rut) {
        if (!rut || typeof rut !== 'string')
            return false;
        var regexp = /^\d{7,8}-[k|K|\d]{1}$/;
        var res = regexp.test(rut);
        if (res == false) {
            this.notifyService.danger('Rut invalido');
            this.registro.rut = '';
        }
        else
            this.registro.rut = this.configuration.formateaRut(rut);
    };
    LimioComponent.prototype.enviar = function () {
        var _this = this;
        var fecha = $("#datepicker").datepicker("getDate");
        if (fecha == null) {
            this.notifyService.warning('Debe seleccionar una fecha');
            return;
        }
        this.loaderService.display(true);
        var model = {
            IdRegistro: 0,
            FechaCompra: fecha,
            NombreEmpresaProveedora: this.registro.codigo,
            TipoDocumento: this.selectedTipo.Nombre,
            NotaVenta: this.registro.numero,
            NroSerie: this.registro.nroserie,
            NombrePropietario: this.registro.nombrepropietario,
            Rut: this.registro.rut,
            Correo: this.registro.email
        };
        this.registraLumioService.save(model).subscribe(function (res) {
            _this.notifyService.success('Correcto');
            _this.loaderService.display(false);
        }, function (err) { _this.notifyService.danger('Problemas al grabar registro lumio'); _this.loaderService.display(false); });
    };
    LimioComponent = __decorate([
        core_1.Component({
            selector: 'app-limio',
            templateUrl: './limio.component.html',
            styles: [
                "\n            .ng-valid[required], .ng-valid.required {\n                border-right: 2px solid #42A948;\n            }\n\n            .ng-invalid:not(form) {\n                border-right: 2px solid #a94442;\n            }\n        "
            ]
        }),
        __metadata("design:paramtypes", [router_1.Router, registralumio_service_1.RegistraLumioService,
            notify_service_1.NotifyService, loader_service_1.LoaderService, app_constants_1.Configuration])
    ], LimioComponent);
    return LimioComponent;
}());
exports.LimioComponent = LimioComponent;
//# sourceMappingURL=limio.component.js.map