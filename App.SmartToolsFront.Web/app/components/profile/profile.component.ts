import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { LoaderService } from '../../services/loader.service';
import { NotifyService } from '../../services/notify.service';
import { UbicacionService } from '../../services/ubicacion.service';
import { VentaService } from '../../services/venta.service';
import { MailService } from '../../services/mail.service';

declare var $: any;
declare var bootbox: any;

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
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
        `
    ]
})
export class ProfileComponent implements OnInit {

    user: any = {
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

    nombreShow: string = '';
    TelefonoShow: string = '';
    EmailShow: string = '';
    regiones: any = [];
    ciudades: any = [];
    comuna: any = [];
    comprasCliente: any = [];
    saldosCliente: any = [];

    constructor(private clienteService: ClienteService, private loaderService: LoaderService,
        private activatedRoute: ActivatedRoute, private notifyService: NotifyService,
        private ubicacionService: UbicacionService, private ventaService: VentaService, private mailService: MailService) {

        this.activatedRoute.params.subscribe(params => {
            if (params['user'] != undefined && params['user'] != "") {

                try {
                    this.loaderService.display(true);
                    let decryptedEmail = atob(params['user']);

                    let userVM = {
                        Email: decryptedEmail,
                        Clave: '', Msg: '', Nombre: ''
                    };

                    this.clienteService.getClientByEmail(userVM).subscribe(
                        res => {
                            this.user = res;
                            this.nombreShow = res.NomAux;
                            this.TelefonoShow = res.Telefono;
                            this.EmailShow = res.Email;

                            let userResp = res;

                            userVM.Nombre = res.CodAux;

                            this.clienteService.getClienteComprasFromSoftland(userVM).subscribe(
                                resC => {

                                    this.comprasCliente = resC;

                                    this.clienteService.getClienteEstadoComprasFromSoftland(userVM).subscribe(
                                        resE => {
                                            this.saldosCliente = resE;

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

                                                    $('#selReg').val(this.user.IdRegion).trigger('change');

                                                    let idregion = this.user.IdRegion;

                                                    this.loaderService.display(true);
                                                    this.ubicacionService.getAllCiudades().subscribe(
                                                        resCiu => {
                                                            let r = resCiu.filter(function (x: any) { return x.IdRegion == idregion });

                                                            var options = $('#selCiu');

                                                            $.each(r, function () {
                                                                options.append($("<option />").val(this.CiuCod).text(this.Descripcion));
                                                            });

                                                            let sCiudad = resCiu.filter(function (x: any) { return x.CiuCod == userResp.CiuCod });
                                                            if (sCiudad.length > 0)
                                                                $('#selCiu').val(sCiudad[0].CiuCod).trigger('change');

                                                            //$('#selCom').html('');

                                                            this.ubicacionService.getAllComunas().subscribe(
                                                                resCom => {
                                                                    let r = resCom.filter(function (x: any) { return x.Id_Region == idregion });

                                                                    var options2 = $('#selCom');

                                                                    $.each(r, function () {
                                                                        options2.append($("<option />").val(this.ComCod).text(this.Descripcion));
                                                                    });

                                                                    let sComuna = resCom.filter(function (x: any) { return x.ComCod == res.ComCod });
                                                                    if (sComuna.length > 0)
                                                                        $('#selCom').val(sComuna[0].ComCod).trigger('change');

                                                                    this.loaderService.display(false);
                                                                },
                                                                err => { this.notifyService.danger('Error al obtener comunas'); this.loaderService.display(false); }
                                                            );

                                                        },
                                                        err => { this.notifyService.danger('Error al obtener ciudades'); this.loaderService.display(false); }
                                                    );
                                                },
                                                err => { this.notifyService.danger('Error al obtener regiones'); this.loaderService.display(false); }
                                            );

                                        },
                                        errE => { this.notifyService.danger('Problemas al obtener saldos del cliente'); this.loaderService.display(false); }
                                    );

                                },
                                err => { this.loaderService.display(false); this.notifyService.danger('Problemas al obtener compras de usuario.'); }
                            );

                        },
                        err => { this.loaderService.display(false); this.notifyService.danger('No se encuentra usuario.'); this.user = {}; }
                    );
                }
                catch (err) {
                    this.loaderService.display(false); this.notifyService.danger('No se encuentra usuario.'); this.user = {};
                }

                
            }
        });

    }

    ngOnInit() {
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

    cargaVentas() {
        //this.ventaService.getAll().subscribe(
        //    res => { },
        //    err => { }
        //);
    }

    cambiarPassword() {
        var passOld = $('#pass1').val();
        var passNew = $('#pass2').val();
        var passNew2 = $('#pass3').val();

        if (passOld == "" || passNew == "" || passNew2 == "") {
            $('#lblMsg').text("* Debe completar todos los datos."); return;
        }
        if (passNew != passNew2) {
            $('#lblMsg').text("* Nuevas contraseñas no coindicen."); return;
        }

        $('#lblMsg').text("");
        var user = localStorage.getItem('currentUser');

        if (user != null) {

            let ls = this.loaderService;
            let cs = this.clienteService;
            let ns = this.notifyService;
            let cliente = JSON.parse(user);

            let obj = { Email: cliente.Email, Clave: passOld, Msg: '', Nombre: '' };

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
                callback: function (result: boolean) {
                    if (result) {
                        ls.display(true);

                        cs.getClienteLogin(obj).subscribe(
                            res => {
                                if (res.Msg == "OK") {

                                    obj.Clave = passNew;

                                    cs.updatePassword(obj).subscribe(
                                        res2 => {
                                            ns.success('Correcto');
                                            ls.display(false);
                                            $('#myModal').modal('toggle');
                                        },
                                        err2 => { ns.danger('Problemas al actualizar contraseña'); ls.display(false); }
                                    );

                                }
                                else {
                                    $('#lblMsg').text("* " + res.Msg);
                                    ls.display(false);
                                }
                            },
                            err => {
                                ns.danger('Problemas al validar usuario'); ls.display(false);
                            }
                        );
                    }
                }
            });
        }
        
    }

    downloadPDF(compra: any) {
        this.notifyService.warning('En construcción...');
    }

    sendMail() {
        let vm = {
            nombres: 'Victor',
            apellidos: 'Miranda',
            asunto: 'Prueba Victor',
            mensaje: 'xxx',
            email_destinatario: 'isagarap@gmail.com',
        };
        this.mailService.send(vm).subscribe(
            res => {
                this.notifyService.success('Correcto');
            },
            err => { this.notifyService.danger('Error'); }
        );
    }
}
