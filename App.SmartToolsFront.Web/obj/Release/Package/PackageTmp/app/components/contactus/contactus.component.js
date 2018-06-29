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
var notify_service_1 = require("../../services/notify.service");
var loader_service_1 = require("../../services/loader.service");
var mail_service_1 = require("../../services/mail.service");
var ContactUsComponent = /** @class */ (function () {
    function ContactUsComponent(notifyService, loaderService, mailService) {
        this.notifyService = notifyService;
        this.loaderService = loaderService;
        this.mailService = mailService;
        this.contacto = {
            nombres: '',
            apellidos: '',
            email: '',
            mensaje: ''
        };
    }
    ContactUsComponent.prototype.ngOnInit = function () {
    };
    ContactUsComponent.prototype.sendMessaje = function () {
        var _this = this;
        this.loaderService.display(true);
        var vm = {
            tipo: 4,
            nombre: this.contacto.nombres,
            asunto: 'Contacto Cliente',
            mensaje: this.contacto.mensaje + '<br /><br /><br />' +
                'Remitente: (' + this.contacto.email + ')',
            email_destinatario: 'soporte@smart-tools.cl'
        };
        this.mailService.send(vm).subscribe(function (res) {
            _this.notifyService.success('Mensaje enviado correctamente');
            _this.loaderService.display(false);
        }, function (err) { _this.notifyService.danger('Problemas al enviar email'); _this.loaderService.display(false); });
    };
    ContactUsComponent = __decorate([
        core_1.Component({
            selector: 'app-contactus',
            templateUrl: './contactus.component.html',
            styles: [
                "\n            .ng-valid[required], .ng-valid.required {\n                border-right: 2px solid #42A948;\n            }\n\n            .ng-invalid:not(form) {\n                border-right: 2px solid #a94442;\n            }\n\n            .starv {\n                color: red;\n            }\n        "
            ]
        }),
        __metadata("design:paramtypes", [notify_service_1.NotifyService, loader_service_1.LoaderService,
            mail_service_1.MailService])
    ], ContactUsComponent);
    return ContactUsComponent;
}());
exports.ContactUsComponent = ContactUsComponent;
//# sourceMappingURL=contactus.component.js.map