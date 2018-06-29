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
var cliente_service_1 = require("../../services/cliente.service");
var giro_services_1 = require("../../services/giro.services");
var condicionventa_service_1 = require("../../services/condicionventa.service");
var ubicacion_service_1 = require("../../services/ubicacion.service");
var parametros_service_1 = require("../../services/parametros.service");
var carrito_service_1 = require("../../services/carrito.service");
var app_constants_1 = require("../../app.constants");
var mail_service_1 = require("../../services/mail.service");
var router_1 = require("@angular/router");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(router, notifyService, ubicacionService, loaderService, clienteService, configuration, giroService, condicionVentaService, parametrosService, carritoService, mailService) {
        var _this = this;
        this.router = router;
        this.notifyService = notifyService;
        this.ubicacionService = ubicacionService;
        this.loaderService = loaderService;
        this.clienteService = clienteService;
        this.configuration = configuration;
        this.giroService = giroService;
        this.condicionVentaService = condicionVentaService;
        this.parametrosService = parametrosService;
        this.carritoService = carritoService;
        this.mailService = mailService;
        this.nombreText = 'Nombres';
        this.RepitaClave = '';
        this.clienteSoftland = [];
        this.cliente = {
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
            Estado: 0
        };
        this.regiones = [];
        this.ciudades = [];
        this.comunas = [];
        this.selectedRegion = [];
        this.selectedCiudad = [];
        this.selectedComuna = [];
        this.tipos = [];
        this.giros = [];
        this.selectedTipo = [];
        this.showNames = true;
        this.showRZ = true;
        this.giroEnabled = true;
        this.existeEnSoftland = false;
        this.tipoEnabled = true;
        this.ocupaNumeroEnDireccion = false;
        this.loaderService.display(true);
        this.tipos.push({ Id: 1, Nombre: 'Jurídico' });
        this.tipos.push({ Id: 2, Nombre: 'Natural' });
        this.giroService.getAll().subscribe(function (res) {
            _this.giros = res;
            $('#selGiro').select2({
                placeholder: "Seleccione un Giro",
                allowClear: true,
                width: '100%'
            });
            var options = $('#selGiro');
            $.each(_this.giros, function () {
                options.append($("<option />").val(this.IdGiro).text(this.Nombre));
            });
            $('#selGiro').val(null).trigger('change');
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
                $('#selReg').val(null).trigger('change');
                _this.loaderService.display(false);
            }, function (err) { _this.notifyService.danger('Error al obtener regiones'); _this.loaderService.display(false); });
        }, function (err) { _this.notifyService.danger('Error al obtener giros'); _this.loaderService.display(false); });
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parametrosService.getByNombre('OcupaNumeroDir').subscribe(function (res) {
            if (res != null && res.Valor != null && res.Valor == 1) {
                _this.ocupaNumeroEnDireccion = true;
            }
        }, function (err) { });
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
    RegisterComponent.prototype.registrar = function (cliente) {
        var _this = this;
        if (this.selectedTipo.Id == 1 && $("#selGiro").val() == null) {
            this.notifyService.warning('Debe seleccionar un Giro.');
            return;
        }
        if ($("#selReg").val() == null) {
            this.notifyService.warning('Debe seleccionar una Región.');
            return;
        }
        if ($("#selCiu").val() == null) {
            this.notifyService.warning('Debe seleccionar una Ciudad.');
            return;
        }
        if ($("#selCom").val() == null) {
            this.notifyService.warning('Debe seleccionar una Comuna.');
            return;
        }
        if (cliente.Clave != this.RepitaClave) {
            this.notifyService.warning('Claves no coinciden.');
            return;
        }
        if ($("#selGiro").val() == null || $("#selGiro").val() == undefined) {
            cliente.CodGiro = 1;
        }
        else {
            var giro = $("#selGiro").val();
            cliente.CodGiro = giro;
        }
        cliente.Estado = 1;
        cliente.CiuCod = $("#selCiu").val();
        cliente.ComCod = $("#selCom").val();
        cliente.IdRegion = $("#selReg").val();
        cliente.CodAux = cliente.Rut;
        cliente.CodLista = '';
        cliente.CodCondVta = '';
        cliente.ExisteEnSoftland = this.existeEnSoftland;
        cliente.EsJuridico = (this.selectedTipo.Id == 1) ? 1 : 0;
        var ls = this.loaderService;
        var ms = this.mailService;
        var ns = this.notifyService;
        var rs = this.router;
        ls.display(true);
        var vm = { Email: cliente.Email, Clave: '', Msg: '', Nombre: cliente.Rut };
        //valida que rut no exista
        this.clienteService.getClientByRut(vm).subscribe(function (res) {
            if (res.Email == null) {
                //valida que email no este en uso
                _this.clienteService.getClientByEmail(vm).subscribe(function (res) {
                    if (res.Email == null) {
                        _this.clienteService.saveCliente(cliente).subscribe(function (res) {
                            var user = { Email: cliente.Email, Nombre: cliente.NomAux };
                            localStorage.setItem('currentUser', JSON.stringify(user));
                            _this.carritoService.setUserLogin(user.Nombre);
                            ns.success('Correcto');
                            setTimeout(function (x) {
                                //Envia Correo
                                var vm = {
                                    tipo: 2,
                                    nombre: cliente.NomAux,
                                    asunto: 'Registro Web - Smart Tools',
                                    mensaje: cliente.Email,
                                    email_destinatario: cliente.Email,
                                };
                                ms.send(vm).subscribe(function (res3) {
                                    ls.display(false);
                                    rs.navigate(['\home']);
                                    $('html,body').scrollTop(0);
                                }, function (err3) {
                                    ns.danger('Problemas al enviar correo');
                                    ls.display(false);
                                    rs.navigate(['\home']);
                                    $('html,body').scrollTop(0);
                                });
                            }, 1500);
                            //Insertar condicion de venta por defecto
                            //let cv = {
                            //    CodCondVta: '1',
                            //    Nombre: 'Condición de venta web',
                            //    Descripcion: 'Condición de venta web',
                            //    Estado: 1,
                            //    RutCliente: cliente.Rut
                            //};
                            //this.condicionVentaService.save(cv).subscribe(
                            //    res => {
                            //        this.notifyService.success('Correcto');
                            //        setTimeout(function (x) {
                            //            ls.display(false);
                            //            rs.navigate(['\home']);
                            //            $('html,body').scrollTop(0);
                            //        }, 1500);
                            //    },
                            //    err => { this.notifyService.danger('Error al grabar'); ls.display(false); }
                            //);
                        }, function (err) { _this.notifyService.danger('Error al grabar'); ls.display(false); });
                    }
                    else {
                        _this.notifyService.danger('Email ingresado ya está en uso');
                        ls.display(false);
                    }
                }, function (err) { _this.notifyService.danger('Error al validar Email'); ls.display(false); });
            }
            else {
                _this.notifyService.danger('Rut ingresado ya está en uso');
                ls.display(false);
            }
        }, function (err) { _this.notifyService.danger('Error al validar rut'); ls.display(false); });
    };
    RegisterComponent.prototype.isValidRUT = function (rut) {
        var _this = this;
        if (!rut || typeof rut !== 'string')
            return false;
        var regexp = /^\d{7,8}-[k|K|\d]{1}$/;
        var res = regexp.test(rut);
        if (res == false) {
            this.notifyService.danger('Rut invalido');
            this.cliente.Rut = '';
        }
        else {
            this.cliente.Rut = this.configuration.formateaRut(rut);
            this.loaderService.display(true);
            var vm = { Email: '', Clave: '', Msg: '', Nombre: this.cliente.Rut };
            this.clienteService.getClientFromSoftland(vm).subscribe(function (res) {
                _this.clienteSoftland = res;
                _this.loaderService.display(false);
                if (res.length == 1) {
                    _this.existeEnSoftland = true;
                    _this.nombreText = 'Nombre / Razón Social';
                    //setea informacion desde softland
                    _this.cliente.Rut = res[0].Rut;
                    _this.cliente.CodAux = res[0].CodAux;
                    _this.cliente.NomAux = res[0].Cliente;
                    _this.cliente.Nombre = res[0].Cliente;
                    _this.cliente.Apellidos = res[0].Cliente;
                    _this.cliente.Email = res[0].Email;
                    _this.cliente.DirAux = res[0].Direccion;
                    _this.cliente.DirNum = res[0].DirNum;
                    _this.cliente.Telefono = res[0].Fono;
                    _this.cliente.EmailDTE = res[0].eMailDTE;
                    _this.cliente.EsReceptorDTE = res[0].esReceptorDTE;
                    _this.cliente.Estado = res[0].Bloqueado;
                    try {
                        var v = parseFloat(_this.cliente.CodAux);
                        if (v >= 60000000) {
                            var t = _this.tipos.filter(function (x) { return x.Id == 1; });
                            if (t.length > 0) {
                                //Juridico
                                _this.selectedTipo = t[0];
                                _this.tipoEnabled = false;
                                _this.giroEnabled = true;
                                _this.showRZ = true;
                                _this.showNames = false;
                                _this.nombreText = 'Razón Social';
                            }
                        }
                        else {
                            var t = _this.tipos.filter(function (x) { return x.Id == 2; });
                            if (t.length > 0) {
                                //Natural
                                _this.selectedTipo = t[0];
                                _this.tipoEnabled = false;
                                _this.nombreText = 'Nombre';
                                _this.showRZ = false;
                                _this.showNames = true;
                                _this.giroEnabled = false;
                                $('#selGiro').val('PAR').trigger('change');
                            }
                        }
                    }
                    catch (err) {
                        console.log(err);
                    }
                    //setea combos
                    var sGiro = _this.giros.filter(function (x) { return x.IdGiro == res[0].GirAux; });
                    if (sGiro.length > 0)
                        $('#selGiro').val(sGiro[0].IdGiro).trigger('change');
                    var sRegion_1 = _this.regiones.filter(function (x) { return x.Descripcion == res[0].Region; });
                    if (sRegion_1.length > 0)
                        $('#selReg').val(sRegion_1[0].IdRegion).trigger('change');
                    _this.loaderService.display(true);
                    _this.ubicacionService.getAllCiudades().subscribe(function (resCiu) {
                        var r = resCiu;
                        if (sRegion_1.length > 0)
                            r = resCiu.filter(function (x) { return x.IdRegion == sRegion_1[0].IdRegion; });
                        var options = $('#selCiu');
                        $.each(r, function () {
                            options.append($("<option />").val(this.CiuCod).text(this.Descripcion));
                        });
                        var sCiudad = resCiu.filter(function (x) { return x.Descripcion == res[0].Ciudad; });
                        if (sCiudad.length > 0)
                            $('#selCiu').val(sCiudad[0].CiuCod).trigger('change');
                        else
                            $('#selCiu').val(null).trigger('change');
                        //$('#selCom').html('');
                        _this.ubicacionService.getAllComunas().subscribe(function (resCom) {
                            var r = resCom;
                            if (sRegion_1.length > 0)
                                r = resCom.filter(function (x) { return x.Id_Region == sRegion_1[0].IdRegion; });
                            var options2 = $('#selCom');
                            $.each(r, function () {
                                options2.append($("<option />").val(this.ComCod).text(this.Descripcion));
                            });
                            var sComuna = resCom.filter(function (x) { return x.Descripcion == res[0].Comuna; });
                            if (sComuna.length > 0)
                                $('#selCom').val(sComuna[0].ComCod).trigger('change');
                            else
                                $('#selCom').val(null).trigger('change');
                            _this.loaderService.display(false);
                        }, function (err) { _this.notifyService.danger('Error al obtener comunas'); _this.loaderService.display(false); });
                    }, function (err) { _this.notifyService.danger('Error al obtener ciudades'); _this.loaderService.display(false); });
                }
                else if (res.length > 1) {
                    _this.existeEnSoftland = true;
                    _this.nombreText = 'Nombre / Razón Social';
                    //cliente debe seleccionar un registro
                    var options = _this.createObject(res);
                    swal({
                        title: 'Rut con más de un cliente registrado',
                        input: 'select',
                        inputOptions: options,
                        inputPlaceholder: 'Seleccione un registro',
                        showCancelButton: true,
                        inputValidator: function (value) {
                            return new Promise(function (resolve) {
                                if (value == null || value == undefined || value == "") {
                                    resolve('Debe seleccionar un registro');
                                }
                                else {
                                    resolve();
                                    alert(value);
                                }
                            });
                        }
                    });
                }
                else {
                    _this.existeEnSoftland = false;
                    try {
                        var splited = _this.cliente.Rut.replace('.', '').split('-');
                        var v = parseFloat(splited[0].replace('.', ''));
                        if (v >= 60000000) {
                            var t = _this.tipos.filter(function (x) { return x.Id == 1; });
                            if (t.length > 0) {
                                //Juridico
                                _this.selectedTipo = t[0];
                                _this.tipoEnabled = false;
                                _this.giroEnabled = true;
                                _this.showRZ = true;
                                _this.showNames = false;
                                _this.nombreText = 'Razón Social';
                            }
                        }
                        else {
                            var t = _this.tipos.filter(function (x) { return x.Id == 2; });
                            if (t.length > 0) {
                                //Natural
                                _this.selectedTipo = t[0];
                                _this.tipoEnabled = false;
                                _this.nombreText = 'Nombre';
                                _this.showRZ = false;
                                _this.showNames = true;
                                _this.giroEnabled = false;
                                $('#selGiro').val('PAR').trigger('change');
                            }
                        }
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
            }, function (err) { _this.notifyService.danger('No es posible obtener datos del cliente desde Softland'); _this.loaderService.display(false); });
        }
    };
    RegisterComponent.prototype.changeTipo = function (selectedTipo) {
        $('#selGiro').val(null).trigger('change');
        if (selectedTipo.Id == 1) {
            this.giroEnabled = true;
            this.showRZ = true;
            this.showNames = false;
            this.nombreText = 'Razón Social';
        }
        else {
            this.nombreText = 'Nombre';
            this.showRZ = false;
            this.showNames = true;
            this.giroEnabled = false;
            //for (let i = 0; i <= this.giros.length - 1; i++) {
            //    if (this.giros[i].IdGiro == 2) {
            //        this.selectedGiro = this.giros[i];
            //        return;
            //    }
            //}
            $('#selGiro').val('PAR').trigger('change');
            //$('#selGiro').val(2).trigger('change');
        }
    };
    RegisterComponent.prototype.createObject = function (res) {
        var outObj;
        switch (res.length) {
            case 2:
                outObj = { '0': res[0].Cliente, '1': res[1].Cliente };
                break;
            case 3:
                outObj = { '0': res[0].Cliente, '1': res[1].Cliente, '2': res[2].Cliente };
                break;
            case 4:
                outObj = { '0': res[0].Cliente, '1': res[1].Cliente, '2': res[2].Cliente, '3': res[3].Cliente };
                break;
            case 5:
                outObj = { '0': res[0].Cliente, '1': res[1].Cliente, '2': res[2].Cliente, '3': res[3].Cliente, '4': res[4].Cliente };
                break;
            case 6:
                outObj = { '0': res[0].Cliente, '1': res[1].Cliente, '2': res[2].Cliente, '3': res[3].Cliente, '4': res[4].Cliente, '5': res[5].Cliente };
                break;
            case 7:
                outObj = { '0': res[0].Cliente, '1': res[1].Cliente, '2': res[2].Cliente, '3': res[3].Cliente, '4': res[4].Cliente, '5': res[5].Cliente, '6': res[6].Cliente };
                break;
            case 8:
                outObj = { '0': res[0].Cliente, '1': res[1].Cliente, '2': res[2].Cliente, '3': res[3].Cliente, '4': res[4].Cliente, '5': res[5].Cliente, '6': res[6].Cliente, '7': res[7].Cliente };
                break;
            case 9:
                outObj = { '0': res[0].Cliente, '1': res[1].Cliente, '2': res[2].Cliente, '3': res[3].Cliente, '4': res[4].Cliente, '5': res[5].Cliente, '6': res[6].Cliente, '7': res[7].Cliente, '8': res[8].Cliente };
                break;
            case 10:
                outObj = { '0': res[0].Cliente, '1': res[1].Cliente, '2': res[2].Cliente, '3': res[3].Cliente, '4': res[4].Cliente, '5': res[5].Cliente, '6': res[6].Cliente, '7': res[7].Cliente, '8': res[8].Cliente, '9': res[9].Cliente };
                break;
        }
        return outObj;
    };
    ;
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styles: [
                "\n            .ng-valid[required], .ng-valid.required {\n                border-right: 2px solid #42A948;\n            }\n\n            .ng-invalid:not(form) {\n                border-right: 2px solid #a94442;\n            }\n\n            .starv {\n                color: red;\n            }\n\n            .disabledbutton {\n                pointer-events: none;\n                opacity: 0.4;\n            }\n\n            .lowerText {\n                text-transform: lowercase;\n            }\n        "
            ]
        }),
        __metadata("design:paramtypes", [router_1.Router, notify_service_1.NotifyService, ubicacion_service_1.UbicacionService,
            loader_service_1.LoaderService, cliente_service_1.ClienteService, app_constants_1.Configuration,
            giro_services_1.GiroService, condicionventa_service_1.CondicionVentaService, parametros_service_1.ParametrosService,
            carrito_service_1.CarritoService, mail_service_1.MailService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map