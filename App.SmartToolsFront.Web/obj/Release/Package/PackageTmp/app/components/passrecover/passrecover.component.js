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
var loader_service_1 = require("../../services/loader.service");
var notify_service_1 = require("../../services/notify.service");
var mail_service_1 = require("../../services/mail.service");
var cliente_service_1 = require("../../services/cliente.service");
var PassRecoverComponent = /** @class */ (function () {
    function PassRecoverComponent(pouter, mailService, loaderService, notifyService, clienteService) {
        this.pouter = pouter;
        this.mailService = mailService;
        this.loaderService = loaderService;
        this.notifyService = notifyService;
        this.clienteService = clienteService;
        this.userEmail = '';
    }
    PassRecoverComponent.prototype.ngOnInit = function () {
    };
    PassRecoverComponent.prototype.enviar = function () {
        var _this = this;
        if (this.userEmail != "") {
            var userVM_1 = {
                Email: this.userEmail,
                Clave: '', Msg: '', Nombre: ''
            };
            this.loaderService.display(true);
            this.clienteService.getClientByEmail(userVM_1).subscribe(function (res) {
                if (res.Rut != undefined) {
                    userVM_1.Msg = res.Rut;
                    _this.clienteService.getTemporalPasswordToUpdate(userVM_1).subscribe(function (res2) {
                        var vm = {
                            tipo: 1,
                            nombre: res.NomAux,
                            asunto: 'Recuperar Contraseña - Smart Tools',
                            mensaje: 'Hola' + '<br />' +
                                'Recibimos una solicitud para restablecer tu contraseña de Smart Tools.' +
                                'Tu nueva contraseña es: ' + res2.Clave + '<br /><br />' +
                                'Podrás utilizar esta contraseña o cambiarla en tu perfil.',
                            email_destinatario: res.Email,
                        };
                        _this.mailService.send(vm).subscribe(function (res3) {
                            _this.notifyService.success('Correcto. Se ha enviando un mail a su casilla actual.');
                            _this.loaderService.display(false);
                        }, function (err3) { _this.notifyService.danger('Problemas al enviar correo'); _this.loaderService.display(false); });
                    }, function (err2) { _this.notifyService.danger('Problemas al generar password temporal'); _this.loaderService.display(false); });
                }
                else {
                    _this.notifyService.warning("Email no existe en el sistema");
                    _this.loaderService.display(false);
                }
            }, function (err) { _this.loaderService.display(false); _this.notifyService.danger('No se encuentra usuario.'); });
        }
        else {
            this.notifyService.warning('Debe ingresar su Email');
        }
    };
    PassRecoverComponent = __decorate([
        core_1.Component({
            selector: 'app-passrecover',
            templateUrl: './passrecover.component.html',
            styles: [
                "\n            .ng-valid[required], .ng-valid.required {\n                border-right: 2px solid #42A948;\n            }\n\n            .ng-invalid:not(form) {\n                border-right: 2px solid #a94442;\n            }\n        "
            ]
        }),
        __metadata("design:paramtypes", [router_1.Router, mail_service_1.MailService, loader_service_1.LoaderService,
            notify_service_1.NotifyService, cliente_service_1.ClienteService])
    ], PassRecoverComponent);
    return PassRecoverComponent;
}());
exports.PassRecoverComponent = PassRecoverComponent;
//# sourceMappingURL=passrecover.component.js.map