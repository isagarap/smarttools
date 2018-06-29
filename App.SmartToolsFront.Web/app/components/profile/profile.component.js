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
var cliente_service_1 = require("../../services/cliente.service");
var loader_service_1 = require("../../services/loader.service");
var notify_service_1 = require("../../services/notify.service");
var ubicacion_service_1 = require("../../services/ubicacion.service");
var venta_service_1 = require("../../services/venta.service");
var mail_service_1 = require("../../services/mail.service");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(clienteService, loaderService, activatedRoute, notifyService, ubicacionService, ventaService, mailService) {
        var _this = this;
        this.clienteService = clienteService;
        this.loaderService = loaderService;
        this.activatedRoute = activatedRoute;
        this.notifyService = notifyService;
        this.ubicacionService = ubicacionService;
        this.ventaService = ventaService;
        this.mailService = mailService;
        this.user = {
            Rut: '',
            CodAux: '',
            NomAux: '',
            Email: '',
            Clave: '',
            CodGiro: '',
            CiuCod: '',
            ComCod: '',
            IdRegion: 0,
            DirAux: '',
            DirNum: '',
            Telefono: '',
            UserName: '',
            Password: '',
            EmailDTE: '',
            EsReceptorDTE: '',
            Estado: 0,
            Fecha_Carga_Soft: new Date(),
            CodLista: '',
            CodCondVta: '',
            EsJuridico: 0
        };
        this.nombreShow = '';
        this.TelefonoShow = '';
        this.EmailShow = '';
        this.regiones = [];
        this.ciudades = [];
        this.comuna = [];
        this.comprasCliente = [];
        this.saldosCliente = [];
        this.activatedRoute.params.subscribe(function (params) {
            if (params['user'] != undefined && params['user'] != "") {
                try {
                    _this.loaderService.display(true);
                    var decryptedEmail = atob(params['user']);
                    var userVM_1 = {
                        Email: decryptedEmail,
                        Clave: '', Msg: '', Nombre: ''
                    };
                    _this.clienteService.getClientByEmail(userVM_1).subscribe(function (res) {
                        _this.user = res;
                        _this.nombreShow = res.NomAux;
                        _this.TelefonoShow = res.Telefono;
                        _this.EmailShow = res.Email;
                        var userResp = res;
                        userVM_1.Nombre = res.CodAux;
                        _this.clienteService.getClienteComprasFromSoftland(userVM_1).subscribe(function (resC) {
                            _this.comprasCliente = resC;
                            _this.clienteService.getClienteEstadoComprasFromSoftland(userVM_1).subscribe(function (resE) {
                                _this.saldosCliente = resE;
                                _this.ubicacionService.getAllRegiones().subscribe(function (res) {
                                    _this.regiones = res;
                                    $('#selReg').select2({
                                        placeholder: "Seleccione una Región",
                                        allowClear: true,
                                        width: '100%'
                                    });
                                    var options = $('#selReg');
                                    $.each(_this.regiones, function () {
                                        options.append($("<option />").val(this.IdRegion).text(this.Descripcion));
                                    });
                                    $('#selReg').val(_this.user.IdRegion).trigger('change');
                                    var idregion = _this.user.IdRegion;
                                    _this.loaderService.display(true);
                                    _this.ubicacionService.getAllCiudades().subscribe(function (resCiu) {
                                        var r = resCiu.filter(function (x) { return x.IdRegion == idregion; });
                                        var options = $('#selCiu');
                                        $.each(r, function () {
                                            options.append($("<option />").val(this.CiuCod).text(this.Descripcion));
                                        });
                                        var sCiudad = resCiu.filter(function (x) { return x.CiuCod == userResp.CiuCod; });
                                        if (sCiudad.length > 0)
                                            $('#selCiu').val(sCiudad[0].CiuCod).trigger('change');
                                        //$('#selCom').html('');
                                        _this.ubicacionService.getAllComunas().subscribe(function (resCom) {
                                            var r = resCom.filter(function (x) { return x.Id_Region == idregion; });
                                            var options2 = $('#selCom');
                                            $.each(r, function () {
                                                options2.append($("<option />").val(this.ComCod).text(this.Descripcion));
                                            });
                                            var sComuna = resCom.filter(function (x) { return x.ComCod == res.ComCod; });
                                            if (sComuna.length > 0)
                                                $('#selCom').val(sComuna[0].ComCod).trigger('change');
                                            _this.loaderService.display(false);
                                        }, function (err) { _this.notifyService.danger('Error al obtener comunas'); _this.loaderService.display(false); });
                                    }, function (err) { _this.notifyService.danger('Error al obtener ciudades'); _this.loaderService.display(false); });
                                }, function (err) { _this.notifyService.danger('Error al obtener regiones'); _this.loaderService.display(false); });
                            }, function (errE) { _this.notifyService.danger('Problemas al obtener saldos del cliente'); _this.loaderService.display(false); });
                        }, function (err) { _this.loaderService.display(false); _this.notifyService.danger('Problemas al obtener compras de usuario.'); });
                    }, function (err) { _this.loaderService.display(false); _this.notifyService.danger('No se encuentra usuario.'); _this.user = {}; });
                }
                catch (err) {
                    _this.loaderService.display(false);
                    _this.notifyService.danger('No se encuentra usuario.');
                    _this.user = {};
                }
            }
        });
    }
    ProfileComponent.prototype.ngOnInit = function () {
        $("#selCiu").select2({
            placeholder: "Seleccione una Ciudad",
            allowClear: true,
            width: '100%'
        });
        $("#selCom").select2({
            placeholder: "Seleccione una Comuna",
            allowClear: true,
            width: '100%'
        });
        var ls = this.loaderService;
        var us = this.ubicacionService;
        var ns = this.notifyService;
        $('#selReg').on('select2:select', function (e) {
            $('#selCiu').html('');
            var id = e.params.data.id;
            ls.display(true);
            us.getAllCiudades().subscribe(function (res) {
                var r = res.filter(function (x) { return x.IdRegion == id; });
                var options = $('#selCiu');
                $.each(r, function () {
                    options.append($("<option />").val(this.CiuCod).text(this.Descripcion));
                });
                $('#selCiu').val(null).trigger('change');
                $('#selCom').html('');
                us.getAllComunas().subscribe(function (res) {
                    var r = res.filter(function (x) { return x.Id_Region == id; });
                    var options2 = $('#selCom');
                    $.each(r, function () {
                        options2.append($("<option />").val(this.ComCod).text(this.Descripcion));
                    });
                    $('#selCom').val(null).trigger('change');
                    ls.display(false);
                }, function (err) { ns.danger('Error al obtener comunas'); ls.display(false); });
            }, function (err) { ns.danger('Error al obtener ciudades'); ls.display(false); });
        });
    };
    ProfileComponent.prototype.cargaVentas = function () {
        //this.ventaService.getAll().subscribe(
        //    res => { },
        //    err => { }
        //);
    };
    ProfileComponent.prototype.cambiarPassword = function () {
        var passOld = $('#pass1').val();
        var passNew = $('#pass2').val();
        var passNew2 = $('#pass3').val();
        if (passOld == "" || passNew == "" || passNew2 == "") {
            $('#lblMsg').text("* Debe completar todos los datos.");
            return;
        }
        if (passNew != passNew2) {
            $('#lblMsg').text("* Nuevas contraseñas no coindicen.");
            return;
        }
        $('#lblMsg').text("");
        var user = localStorage.getItem('currentUser');
        if (user != null) {
            var ls_1 = this.loaderService;
            var cs_1 = this.clienteService;
            var ns_1 = this.notifyService;
            var cliente = JSON.parse(user);
            var obj_1 = { Email: cliente.Email, Clave: passOld, Msg: '', Nombre: '' };
            bootbox.confirm({
                title: 'Confirmación',
                message: "¿Confirma cambiar su contraseña?",
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-round'
                    },
                    cancel: {
                        label: 'Cancelar',
                        className: 'btn-round'
                    }
                },
                callback: function (result) {
                    if (result) {
                        ls_1.display(true);
                        cs_1.getClienteLogin(obj_1).subscribe(function (res) {
                            if (res.Msg == "OK") {
                                obj_1.Clave = passNew;
                                cs_1.updatePassword(obj_1).subscribe(function (res2) {
                                    ns_1.success('Correcto');
                                    ls_1.display(false);
                                    $('#myModal').modal('toggle');
                                }, function (err2) { ns_1.danger('Problemas al actualizar contraseña'); ls_1.display(false); });
                            }
                            else {
                                $('#lblMsg').text("* " + res.Msg);
                                ls_1.display(false);
                            }
                        }, function (err) {
                            ns_1.danger('Problemas al validar usuario');
                            ls_1.display(false);
                        });
                    }
                }
            });
        }
    };
    ProfileComponent.prototype.downloadPDF = function (compra) {
        this.notifyService.warning('En construcción...');
    };
    ProfileComponent.prototype.sendMail = function () {
        var _this = this;
        var vm = {
            nombres: 'Victor',
            apellidos: 'Miranda',
            asunto: 'Prueba Victor',
            mensaje: 'xxx',
            email_destinatario: 'isagarap@gmail.com',
        };
        this.mailService.send(vm).subscribe(function (res) {
            _this.notifyService.success('Correcto');
        }, function (err) { _this.notifyService.danger('Error'); });
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styles: [
                "\n            .ng-valid[required], .ng-valid.required {\n                border-right: 2px solid #42A948;\n            }\n\n            .ng-invalid:not(form) {\n                border-right: 2px solid #a94442;\n            }\n\n            .starv {\n                color: red;\n            }\n\n            .disabledbutton {\n                pointer-events: none;\n                opacity: 0.4;\n            }\n        "
            ]
        }),
        __metadata("design:paramtypes", [cliente_service_1.ClienteService, loader_service_1.LoaderService,
            router_1.ActivatedRoute, notify_service_1.NotifyService,
            ubicacion_service_1.UbicacionService, venta_service_1.VentaService, mail_service_1.MailService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map