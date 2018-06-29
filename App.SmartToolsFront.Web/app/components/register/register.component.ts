import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../services/notify.service';
import { LoaderService } from '../../services/loader.service';
import { ClienteService } from '../../services/cliente.service';
import { GiroService } from '../../services/giro.services';
import { CondicionVentaService } from '../../services/condicionventa.service';
import { UbicacionService } from '../../services/ubicacion.service';
import { ParametrosService } from '../../services/parametros.service';
import { CarritoService } from '../../services/carrito.service';
import { Configuration } from '../../app.constants';
import { MailService } from '../../services/mail.service';
import { Router } from '@angular/router';

declare var $: any;
declare var swal: any;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [
        `
            .ng-valid[required], .ng-valid.required {
                border-right: 2px solid #42A948;
            }

            .ng-invalid:not(form) {
                border-right: 2px solid #a94442;
            }

            .starv {
                color: red;
            }

            .disabledbutton {
                pointer-events: none;
                opacity: 0.4;
            }

            .lowerText {
                text-transform: lowercase;
            }
        `
    ]
})
export class RegisterComponent implements OnInit {

    nombreText: string = 'Nombres';
    RepitaClave: string = '';
    clienteSoftland: any = [];
    cliente: any = {
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

    regiones: any = [];
    ciudades: any = [];
    comunas: any = [];

    selectedRegion: any = [];
    selectedCiudad: any = [];
    selectedComuna: any = [];

    tipos: any = [];
    giros: any = [];
    selectedTipo: any = [];
    showNames: boolean = true;
    showRZ: boolean = true;
    giroEnabled: boolean = true;
    existeEnSoftland: boolean = false;
    tipoEnabled: boolean = true;
    ocupaNumeroEnDireccion: boolean = false;

    constructor(private router: Router, private notifyService: NotifyService, private ubicacionService: UbicacionService,
        private loaderService: LoaderService, private clienteService: ClienteService, private configuration: Configuration,
        private giroService: GiroService, private condicionVentaService: CondicionVentaService, private parametrosService: ParametrosService,
        private carritoService: CarritoService, private mailService: MailService) {

        this.loaderService.display(true);
        this.tipos.push({ Id: 1, Nombre: 'Jurídico' });
        this.tipos.push({ Id: 2, Nombre: 'Natural' });        

        this.giroService.getAll().subscribe(
            res => {
                this.giros = res;

                $('#selGiro').select2({
                    placeholder: "Seleccione un Giro",
                    allowClear: true,
                    width: '100%'
                });

                var options = $('#selGiro');

                $.each(this.giros, function () {
                    options.append($("<option />").val(this.IdGiro).text(this.Nombre));
                });

                $('#selGiro').val(null).trigger('change');

                this.ubicacionService.getAllRegiones().subscribe(
                    res => {
                        this.regiones = res;

                        $('#selReg').select2({
                            placeholder: "Seleccione una Región",
                            allowClear: true,
                            width: '100%'
                        });

                        var options = $('#selReg');

                        $.each(this.regiones, function () {
                            options.append($("<option />").val(this.IdRegion).text(this.Descripcion));
                        });

                        $('#selReg').val(null).trigger('change');

                        this.loaderService.display(false);
                    },
                    err => { this.notifyService.danger('Error al obtener regiones'); this.loaderService.display(false); }
                );
            },
            err => { this.notifyService.danger('Error al obtener giros'); this.loaderService.display(false); }
        );
    }

    ngOnInit() {

        this.parametrosService.getByNombre('OcupaNumeroDir').subscribe(
            res => {
                if (res != null && res.Valor != null && res.Valor == 1) {
                    this.ocupaNumeroEnDireccion = true;
                }
            },
            err => { }
        );

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

        let ls = this.loaderService;
        let us = this.ubicacionService;
        let ns = this.notifyService;

        $('#selReg').on('select2:select', function (e: any) {
            $('#selCiu').html('');
            let id = e.params.data.id;
            
            ls.display(true);
            us.getAllCiudades().subscribe(
                res => {
                    let r = res.filter(function (x: any) { return x.IdRegion == id });

                    var options = $('#selCiu');

                    $.each(r, function () {
                        options.append($("<option />").val(this.CiuCod).text(this.Descripcion));
                    });

                    $('#selCiu').val(null).trigger('change');


                    $('#selCom').html('');

                    us.getAllComunas().subscribe(
                        res => {
                            let r = res.filter(function (x: any) { return x.Id_Region == id });

                            var options2 = $('#selCom');

                            $.each(r, function () {
                                options2.append($("<option />").val(this.ComCod).text(this.Descripcion));
                            });

                            $('#selCom').val(null).trigger('change');

                            ls.display(false);
                        },
                        err => { ns.danger('Error al obtener comunas'); ls.display(false); }
                    );
                                     
                },
                err => { ns.danger('Error al obtener ciudades'); ls.display(false); }
            );            
        });
    }

    registrar(cliente: any) {

        if (this.selectedTipo.Id == 1 && $("#selGiro").val() == null) {
            this.notifyService.warning('Debe seleccionar un Giro.'); return;
        }
        if ($("#selReg").val() == null) {
            this.notifyService.warning('Debe seleccionar una Región.'); return;
        }
        if ($("#selCiu").val() == null) {
            this.notifyService.warning('Debe seleccionar una Ciudad.'); return;
        }
        if ($("#selCom").val() == null) {
            this.notifyService.warning('Debe seleccionar una Comuna.'); return;
        }
        if (cliente.Clave != this.RepitaClave) {
            this.notifyService.warning('Claves no coinciden.'); return;
        }

        if ($("#selGiro").val() == null || $("#selGiro").val() == undefined) { //Natural
            cliente.CodGiro = 1;
        }
        else {
            let giro = $("#selGiro").val();
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

        let ls = this.loaderService;
        let ms = this.mailService;
        let ns = this.notifyService;
        let rs = this.router;
        ls.display(true);

        let vm = { Email: cliente.Email, Clave: '', Msg: '', Nombre: cliente.Rut };

        //valida que rut no exista
        this.clienteService.getClientByRut(vm).subscribe(
            res => {
                if (res.Email == null) {
                    //valida que email no este en uso
                    this.clienteService.getClientByEmail(vm).subscribe(
                        res => {
                            if (res.Email == null) {
                                this.clienteService.saveCliente(cliente).subscribe(
                                    res => {

                                        let user = { Email: cliente.Email, Nombre: cliente.NomAux };

                                        localStorage.setItem('currentUser', JSON.stringify(user));
                                        this.carritoService.setUserLogin(user.Nombre);

                                        ns.success('Correcto');
                                        
                                        setTimeout(function (x) {

                                            //Envia Correo
                                            let vm = {
                                                tipo: 2,
                                                nombre: cliente.NomAux,
                                                asunto: 'Registro Web - Smart Tools',
                                                mensaje: cliente.Email,
                                                email_destinatario: cliente.Email,
                                            };

                                            ms.send(vm).subscribe(
                                                res3 => {
                                                    ls.display(false);
                                                    rs.navigate(['\home']);
                                                    $('html,body').scrollTop(0);
                                                },
                                                err3 => {
                                                    ns.danger('Problemas al enviar correo');
                                                    ls.display(false);
                                                    rs.navigate(['\home']);
                                                    $('html,body').scrollTop(0);
                                                }
                                            );

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
                                    },
                                    err => { this.notifyService.danger('Error al grabar'); ls.display(false); }
                                );
                            }
                            else { this.notifyService.danger('Email ingresado ya está en uso'); ls.display(false); }
                        },
                        err => { this.notifyService.danger('Error al validar Email'); ls.display(false); }
                    );
                }
                else { this.notifyService.danger('Rut ingresado ya está en uso'); ls.display(false); }
            },
            err => { this.notifyService.danger('Error al validar rut'); ls.display(false); }
        );

    }

    isValidRUT(rut: string) {

        if (!rut || typeof rut !== 'string') return false;

        var regexp = /^\d{7,8}-[k|K|\d]{1}$/;
        let res = regexp.test(rut);
        if (res == false) {
            this.notifyService.danger('Rut invalido');
            this.cliente.Rut = '';
        }
        else {
            this.cliente.Rut = this.configuration.formateaRut(rut);
            this.loaderService.display(true);
            let vm = { Email: '', Clave: '', Msg: '', Nombre: this.cliente.Rut };

            this.clienteService.getClientFromSoftland(vm).subscribe(
                res => {
                    this.clienteSoftland = res;
                    this.loaderService.display(false);

                    if (res.length == 1) {
                        this.existeEnSoftland = true;
                        this.nombreText = 'Nombre / Razón Social';

                        //setea informacion desde softland
                        this.cliente.Rut = res[0].Rut;
                        this.cliente.CodAux = res[0].CodAux;
                        this.cliente.NomAux = res[0].Cliente;
                        this.cliente.Nombre = res[0].Cliente;
                        this.cliente.Apellidos = res[0].Cliente;
                        this.cliente.Email = res[0].Email;
                        this.cliente.DirAux = res[0].Direccion;
                        this.cliente.DirNum = res[0].DirNum;
                        this.cliente.Telefono = res[0].Fono;
                        this.cliente.EmailDTE = res[0].eMailDTE;
                        this.cliente.EsReceptorDTE = res[0].esReceptorDTE;
                        this.cliente.Estado = res[0].Bloqueado;

                        try {
                            let v = parseFloat(this.cliente.CodAux);
                            if (v >= 60000000) {
                                let t = this.tipos.filter(function (x: any) { return x.Id == 1 });
                                if (t.length > 0) {
                                    //Juridico
                                    this.selectedTipo = t[0];
                                    this.tipoEnabled = false;

                                    this.giroEnabled = true;
                                    this.showRZ = true;
                                    this.showNames = false;
                                    this.nombreText = 'Razón Social';
                                }
                            }
                            else {
                                let t = this.tipos.filter(function (x: any) { return x.Id == 2 });
                                if (t.length > 0) {
                                    //Natural
                                    this.selectedTipo = t[0];
                                    this.tipoEnabled = false;

                                    this.nombreText = 'Nombre';
                                    this.showRZ = false;
                                    this.showNames = true;
                                    this.giroEnabled = false;

                                    $('#selGiro').val('PAR').trigger('change');
                                }
                            }
                        }
                        catch (err) {
                            console.log(err);
                        }                        

                        //setea combos
                        let sGiro = this.giros.filter(function (x: any) { return x.IdGiro == res[0].GirAux });
                        if (sGiro.length > 0)
                            $('#selGiro').val(sGiro[0].IdGiro).trigger('change');

                        let sRegion = this.regiones.filter(function (x: any) { return x.Descripcion == res[0].Region });
                        if (sRegion.length > 0)
                            $('#selReg').val(sRegion[0].IdRegion).trigger('change');

                        this.loaderService.display(true);
                        this.ubicacionService.getAllCiudades().subscribe(
                            resCiu => {

                                let r = resCiu;
                                if (sRegion.length > 0)
                                    r = resCiu.filter(function (x: any) { return x.IdRegion == sRegion[0].IdRegion });                              

                                var options = $('#selCiu');

                                $.each(r, function () {
                                    options.append($("<option />").val(this.CiuCod).text(this.Descripcion));
                                });

                                let sCiudad = resCiu.filter(function (x: any) { return x.Descripcion == res[0].Ciudad });
                                if (sCiudad.length > 0)
                                    $('#selCiu').val(sCiudad[0].CiuCod).trigger('change');
                                else
                                    $('#selCiu').val(null).trigger('change');

                                //$('#selCom').html('');

                                this.ubicacionService.getAllComunas().subscribe(
                                    resCom => {

                                        let r = resCom;
                                        if (sRegion.length > 0)
                                            r = resCom.filter(function (x: any) { return x.Id_Region == sRegion[0].IdRegion });                                        

                                        var options2 = $('#selCom');

                                        $.each(r, function () {
                                            options2.append($("<option />").val(this.ComCod).text(this.Descripcion));
                                        });

                                        let sComuna = resCom.filter(function (x: any) { return x.Descripcion == res[0].Comuna });
                                        if (sComuna.length > 0)
                                            $('#selCom').val(sComuna[0].ComCod).trigger('change');
                                        else
                                            $('#selCom').val(null).trigger('change');

                                        this.loaderService.display(false);
                                    },
                                    err => { this.notifyService.danger('Error al obtener comunas'); this.loaderService.display(false); }
                                );

                            },
                            err => { this.notifyService.danger('Error al obtener ciudades'); this.loaderService.display(false); }
                        );        

                    }
                    else if (res.length > 1) {
                        this.existeEnSoftland = true;
                        this.nombreText = 'Nombre / Razón Social';

                        //cliente debe seleccionar un registro
                        let options = this.createObject(res);
                        
                        swal({
                            title: 'Rut con más de un cliente registrado',
                            input: 'select',
                            inputOptions: options,
                            inputPlaceholder: 'Seleccione un registro',
                            showCancelButton: true,
                            inputValidator: (value: any) => {
                                return new Promise((resolve) => {
                                    if (value == null || value == undefined || value == "") {
                                        resolve('Debe seleccionar un registro')
                                    }
                                    else {
                                        resolve()
                                        alert(value);
                                    }
                                })
                            }
                        });
                    }
                    else {
                        this.existeEnSoftland = false;

                        try {
                            let splited = this.cliente.Rut.replace('.', '').split('-');
                            let v = parseFloat(splited[0].replace('.', ''));
                            if (v >= 60000000) {
                                let t = this.tipos.filter(function (x: any) { return x.Id == 1 });
                                if (t.length > 0) {
                                    //Juridico
                                    this.selectedTipo = t[0];
                                    this.tipoEnabled = false;

                                    this.giroEnabled = true;
                                    this.showRZ = true;
                                    this.showNames = false;
                                    this.nombreText = 'Razón Social';
                                }
                            }
                            else {
                                let t = this.tipos.filter(function (x: any) { return x.Id == 2 });
                                if (t.length > 0) {
                                    //Natural
                                    this.selectedTipo = t[0];
                                    this.tipoEnabled = false;

                                    this.nombreText = 'Nombre';
                                    this.showRZ = false;
                                    this.showNames = true;
                                    this.giroEnabled = false;

                                    $('#selGiro').val('PAR').trigger('change');
                                }
                            }
                        }
                        catch (err) {
                            console.log(err);
                        } 

                    }
                },
                err => { this.notifyService.danger('No es posible obtener datos del cliente desde Softland'); this.loaderService.display(false); }
            );
        }
    }

    changeTipo(selectedTipo: any) {

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
    }

    createObject(res: any) {
        let outObj: any;
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

}
