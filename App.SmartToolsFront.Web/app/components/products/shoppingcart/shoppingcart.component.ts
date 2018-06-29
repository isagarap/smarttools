import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../../services/carrito.service';
import { ProductosService } from '../../../services/productos.service';
import { LoaderService } from '../../../services/loader.service';
import { NotifyService } from '../../../services/notify.service';
import { CondicionVentaService } from '../../../services/condicionventa.service';
import { CondicionVentaTipoPagoService } from '../../../services/condicionventatipopago.service';
import { VentaService } from '../../../services/venta.service';
import { ClienteService } from '../../../services/cliente.service';
import { CuponesService } from '../../../services/cupones.service';
import { UbicacionService } from '../../../services/ubicacion.service';
import { TipoDespachoService } from '../../../services/tipodespacho.service';
import { ParametrosService } from '../../../services/parametros.service';
import { MailService } from '../../../services/mail.service';
import { Configuration } from '../../../app.constants';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';

declare var $: any;
declare var bootbox: any;

@Component({
    selector: 'app-shoppingcart',
    templateUrl: './shoppingcart.component.html',
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
export class ShoppingCartComponent implements OnInit {

    public productos: any = [];
    public tiposPago: any = [];
    public tiposDespacho: any = [];
    public totalPagar: number = 0;
    public subTotal: number = 0;
    public step: number = 0;
    public selectedTP: number = 0;
    public selectedTPNombre: string = '';
    public selectedTPDesc: string = '';
    public selectedTD: number = 0;
    public selectedTDNombre: string = '';
    public selectedTDDesc: string = '';
    public selectedCupon: string = '';
    public IdCupon: number = 0;
    public cuponObj: any = [];
    public descuento: number = 0;

    public regiones: any = [];
    public ciudades: any = [];
    public comunas: any = [];

    public despachoEmail: string = '';
    public despachoTelefono: string = '';
    public despachoDireccion: string = '';
    public despachoNumero: string = '';

    public regionNombre: string = '';
    public ciudadNombre: string = '';
    public comunaNombre: string = '';
    public regionId: number = 0;
    public ciudadId: string = '';
    public comunaId: string = '';
    public valorIva: number = 19;
    ocupaNumeroEnDireccion: boolean = false;

    constructor(private carritoService: CarritoService, private productosService: ProductosService,
                private loaderService: LoaderService, private notifyService: NotifyService,
                private condicionVentaService: CondicionVentaService, private router: Router,
                private ventaService: VentaService, private clienteService: ClienteService,
                private cuponesService: CuponesService, private cookieService: CookieService,
                private tipoDespachoService: TipoDespachoService, private condicionVentaTipoPagoService: CondicionVentaTipoPagoService,
        private ubicacionService: UbicacionService, private parametrosService: ParametrosService,
        private mailService: MailService, private configuration: Configuration) {

        this.loadInitialData();
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

        var products = localStorage.getItem('productsCart');
        if (products != null) {
            var parseProds = JSON.parse(products);
            for (let i = 0; i <= parseProds.length - 1; i++) {
                parseProds[i].PrecioTotal = parseProds[i].PrecioVta;
                parseProds[i].Cantidad = 1;
                this.productos.push(parseProds[i]);
                this.totalPagar = this.totalPagar + parseInt(parseProds[i].PrecioVta);
            }
            this.subTotal = this.totalPagar;
        }
    }

    loadInitialData() {
        this.loaderService.display(true);

        var user = localStorage.getItem('currentUser');
        if (user != null) {

            let parseUser = JSON.parse(user);
            let userModel = { Email: parseUser.Email, Clave: '', Msg: '', Nombre: '' };          

            this.clienteService.getClientByEmail(userModel).subscribe(
                res1 => {
                    let x = res1.CodCondVta;
                    this.condicionVentaTipoPagoService.getAllByCondVta(x).subscribe(
                        res2 => {
                            this.tiposPago = res2;

                            this.tipoDespachoService.getAll().subscribe(
                                res3 => {
                                    this.tiposDespacho = res3;
                                    this.loaderService.display(false);
                                },
                                err => { this.notifyService.danger('Problemas al cargar tipos de despacho'); }
                            );

                        },
                        err => { this.notifyService.danger('Problemas al cargar condiciones de venta'); }
                    );
                },
                err => { this.notifyService.danger('Problemas al cargar datos del usuario'); }
            );
        }
        else {
            this.condicionVentaTipoPagoService.getAll().subscribe(
                res => {
                    this.tiposPago = res;
                    this.loaderService.display(false);
                },
                err => { this.notifyService.danger('Problemas al cargar condiciones de venta'); }
            );
        }
    }    

    changeCantidad(p: any) {
        let idCant = '#C' + p.CodProd;
        let cant = $(idCant).val();

        this.loaderService.display(true);
        this.productosService.getStockProducto(p.CodProd).subscribe(
            res => {
                let stock = parseInt(res["PrecioVta"]);

                if (cant > stock) { }

                for (let i = 0; i <= this.productos.length - 1; i++) {
                    if (this.productos[i].CodProd == p.CodProd) {
                        let newVal = parseInt(p.PrecioVta) * parseInt(cant);
                        this.productos[i].PrecioTotal = newVal;
                        this.productos[i].Cantidad = cant;
                        break;
                    }
                }
                this.calculaTotal();
                this.totalPagar = this.totalPagar - this.descuento;

                this.loaderService.display(false);
            },
            err => { }
        );
    }

    removeItem(p: any) {
        //remueve de la grilla
        for (let i = 0; i <= this.productos.length - 1; i++) {
            if (this.productos[i].CodProd == p.CodProd) {
                this.productos.splice(i, 1);
                break;
            }
        }
        //remueve del local storage
        var products = localStorage.getItem('productsCart');
        var parseProds = JSON.parse(products);
        for (let i = 0; i <= parseProds.length - 1; i++) {
            if (parseProds[i].CodProd == p.CodProd) {
                parseProds.splice(i, 1);
                break;
            }
        }
        localStorage.setItem('productsCart', JSON.stringify(parseProds));

        //remueve de la tabla

        this.calculaTotal();
    }

    calculaTotal() {
        this.totalPagar = 0;
        this.subTotal = 0;
        for (let i = 0; i <= this.productos.length - 1; i++) {
            this.totalPagar = this.totalPagar + (parseInt(this.productos[i].PrecioTotal));
        }
        this.subTotal = this.totalPagar;
        this.totalPagar = this.totalPagar - this.descuento;
    }

    nextStep(id: number) {
        // -1: Atrás
        //  0: Paso 1 - Carrito de Compras
        //  1: Paso 2 - Metodos de Pago
        //  2: Paso 3 - Despacho
        //  3: Paso 4 - Confirmación

        switch (id) {
            case 0:
                this.step = 0;
                $('html,body').scrollTop(0);
                break;
            case 1:
                this.step = 1;
                if (this.productos.length == 0) {
                    this.notifyService.warning('No existen productos agregados al carrito.');
                    this.step = 0;
                    return;
                }
                if (this.selectedCupon != "") {
                    this.loaderService.display(true);
                    this.cuponesService.getByCodigo(this.selectedCupon).subscribe(
                        res => {
                            if (res.IdCupon == 0) {
                                this.loaderService.display(false);
                                this.notifyService.warning('Código de cupón no es válido.');
                                this.step = 0;
                                return;
                            }
                            else { $('html,body').scrollTop(0); }
                        },
                        err => { }
                    );
                }
                $('html,body').scrollTop(0);

                break;
            case 2:
                this.step = 2;
                if (this.selectedTP == 0) {
                    this.notifyService.warning('Debe seleccionar un Método de Pago.');
                    this.step = 1;
                    return;
                }

                this.loaderService.display(true);
                this.ubicacionService.getAllRegiones().subscribe(
                    res1 => {
                        this.regiones = res1;

                        $('#selReg').select2({
                            placeholder: "Seleccione una Región",
                            allowClear: true,
                            width: '100%'
                        });

                        $('#selCiu').select2({
                            placeholder: "Seleccione una Ciudad",
                            allowClear: true,
                            width: '100%'
                        });
                        $('#selCom').select2({
                            placeholder: "Seleccione una Comuna",
                            allowClear: true,
                            width: '100%'
                        });

                        var options = $('#selReg');

                        $.each(this.regiones, function () {
                            options.append($("<option />").val(this.IdRegion).text(this.Descripcion));
                        });

                        $('#selReg').val(null).trigger('change');

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

                        this.loaderService.display(false);

                    },
                    err => { this.notifyService.danger('Problemas al cargar regiones'); this.loaderService.display(false); }
                );
                $('html,body').scrollTop(0);
                break;
            case 3:

                var x = $('#cate1').is(':checked');
                if (x == false) {
                    if ($("#selReg").val() == null || $("#selCiu").val() == null || $("#selCom").val() == null) {
                        this.notifyService.warning('Debe ingresar todos los campos requeridos');
                        this.step = 2;
                        return;
                    }
                    if (this.despachoDireccion == '' || this.despachoEmail == '' || this.despachoNumero == '' || this.despachoTelefono == '') {
                        this.notifyService.warning('Debe ingresar todos los campos requeridos');
                        this.step = 2;
                        return;
                    }
                    if (this.ocupaNumeroEnDireccion && this.despachoNumero == '') {
                        this.notifyService.warning('Debe ingresar todos los campos requeridos');
                        this.step = 2;
                        return;
                    }
                    if (this.selectedTD == 0) {
                        this.notifyService.warning('Debe seleccionar un Tipo de Despacho');
                        this.step = 2;
                        return;
                    }

                    this.regionId = $("#selReg").val();
                    this.ciudadId = $("#selCiu").val()
                    this.comunaId = $("#selCom").val()
                    this.regionNombre = $("#selReg option:selected").text();
                    this.ciudadNombre = $("#selCiu option:selected").text();
                    this.comunaNombre = $("#selCom option:selected").text();
                }                
                
                var regexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
                let res = regexp.test(this.despachoEmail);
                if (res == false) {
                    this.notifyService.warning('Email invalido');
                    this.step = 2;
                    return;
                }

                $('html,body').scrollTop(0);
                this.step = 3;
                break;
            case -1:
                $('html,body').scrollTop(0);
                this.step = this.step - 1;

                if (this.step == 2) {
                    //vuelve a cargar combos
                    this.loaderService.display(true);
                    this.ubicacionService.getAllRegiones().subscribe(
                        res1 => {
                            this.regiones = res1;

                            $('#selReg').select2({
                                placeholder: "Seleccione una Región",
                                allowClear: true,
                                width: '100%'
                            });

                            $('#selCiu').select2({
                                placeholder: "Seleccione una Ciudad",
                                allowClear: true,
                                width: '100%'
                            });
                            $('#selCom').select2({
                                placeholder: "Seleccione una Comuna",
                                allowClear: true,
                                width: '100%'
                            });

                            var options = $('#selReg');

                            $.each(this.regiones, function () {
                                options.append($("<option />").val(this.IdRegion).text(this.Descripcion));
                            });

                            $('#selReg').val(null).trigger('change');

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

                            this.loaderService.display(false);

                        },
                        err => { this.notifyService.danger('Problemas al cargar regiones'); this.loaderService.display(false); }
                    );
                }

                break;
        }

    }

    selectTipoPago(tp: any) {
        this.selectedTP = tp.IdTipoPago;
        this.selectedTPNombre = tp.Nombre;
        this.selectedTPDesc = tp.Descripcion;
    }

    selectTipoDespacho(td: any) {
        this.selectedTD = td.IdTipoDespacho;
        this.selectedTDNombre = td.Nombre;
        this.selectedTDDesc = td.Descripcion;
    }

    applyCupon() {
        if (this.selectedCupon == "") {
            this.notifyService.warning('Debe ingresar un Cupón.');
            return;
        }

        this.loaderService.display(true);
        this.cuponesService.getByCodigo(this.selectedCupon).subscribe(
            res => {
                this.cuponObj = res;

                if (res.IdCupon == 0) {
                    this.loaderService.display(false);
                    this.notifyService.warning('Código de cupón no es válido.');
                    return;
                }

                this.IdCupon = res.IdCupon;

                //recalcula
                if (res.IdTipoDescuento == 1) {
                    //decuento por monto
                    this.descuento = res.Descuento;
                    this.totalPagar = this.totalPagar - this.descuento;
                }
                else if (res.IdTipoDescuento == 2) {
                    //descuento por porcentaje
                    if (res.CodProd == "") {
                        //descuento general
                        let montoDescuento = (this.totalPagar * res.Descuento) / 100;
                        this.descuento = montoDescuento;
                        this.totalPagar = this.totalPagar - montoDescuento;
                    }
                    else {
                        //descuento solo un producto
                        let producto = this.productos.filter(function (x: any) { return x.CodProd == res.CodProd });
                        if (producto.length > 0) {
                            let montoDescuento = (this.totalPagar * producto[0].Descuento) / 100;
                            this.descuento = montoDescuento;
                            this.totalPagar = this.totalPagar - montoDescuento;
                        }
                    }
                }

                this.loaderService.display(false);
            },
            err => { this.notifyService.danger('Error al obtener cupones'); this.loaderService.display(false); }
        );
    }

    changeMisDatos() {
        var x = $('#cate1').is(':checked');
        if (x == true) {
            var user = localStorage.getItem('currentUser');
            if (user != null) {

                this.loaderService.display(true);
                let parseUser = JSON.parse(user);
                let userModel = { Email: parseUser.Email, Clave: '', Msg: '', Nombre: '' };

                this.clienteService.getClientByEmail(userModel).subscribe(
                    res => {

                        this.despachoDireccion = res.DirAux;
                        this.despachoNumero = res.DirNum;
                        this.despachoEmail = res.Email;
                        this.despachoTelefono = res.Telefono;

                        this.ubicacionService.getUbicacion(userModel).subscribe(
                            res1 => {

                                this.regionId = res1.Region.IdRegion;
                                this.ciudadId = res1.Ciudad.CiuCod;
                                this.comunaId = res1.Comuna.ComCod;

                                this.regionNombre = res1.Region.Descripcion;
                                this.ciudadNombre = res1.Ciudad.Descripcion;
                                this.comunaNombre = res1.Comuna.Descripcion;
                            },
                            err1 => { }
                        );
                        

                        $("#divCombos").css("display", "none");
                        $("#divNoCombos").css("display", "inline");

                        this.loaderService.display(false);
                    },
                    err => { this.notifyService.danger('Problemas al obtener usuario'); this.loaderService.display(false); }
                );
            }
            else { this.notifyService.danger('No es posible obtener los datos del usuario'); }
        }
        else {
            $("#divNoCombos").css("display", "none");
            $("#divCombos").css("display", "inline");
        }
    }

    grabar() {
        var user = localStorage.getItem('currentUser');
        if (user != null) {

            let _router = this.router;
            let _ventaService = this.ventaService;
            let _clienteService = this.clienteService;
            let _loaderService = this.loaderService;
            let _productos = this.productos;
            let _selectedTP = this.selectedTP;
            let _selectedTD = this.selectedTD;
            let _totalPagar = this.totalPagar;
            let _notifyService = this.notifyService;
            let _carritoService = this.carritoService;
            let _cookieService = this.cookieService;
            let _ms = this.mailService;
            let _configuration = this.configuration;

            let _region = this.regionId;
            let _ciudad = this.ciudadId;
            let _comuna = this.comunaId;
            let _direccion = this.despachoDireccion;
            let _numero = this.despachoNumero;
            let _email = this.despachoEmail;
            let _fono = this.despachoTelefono
            let _cupon = this.selectedCupon;
            let _idCupon = this.IdCupon;

            bootbox.confirm({
                title: 'Confirmación',
                message: "¿Confirma generar la compra de los productos seleccionados?",
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

                        //grabacion
                        _loaderService.display(true);

                        let parseUser = JSON.parse(user);

                        let userModel = {
                            Email: parseUser.Email, Clave: '', Msg: '', Nombre: ''
                        };

                        _clienteService.getClientByEmail(userModel).subscribe(
                            res => {

                                if (res.Email == null) {
                                    //email no existe
                                    _notifyService.warning('Datos inválidos de Usuario, usted será redirigido al Inicio de Sesión.');
                                    setTimeout(function (x) {
                                        _loaderService.display(false);
                                        _router.navigate(['\login']);
                                    }, 1500);
                                }
                                else {
                                    let detalles = [];
                                    for (let i = 0; i <= _productos.length - 1; i++) {
                                        detalles.push({
                                            IdDetalle: 0,
                                            IdVenta: 0,
                                            CodProducto: _productos[i].CodProd,
                                            Correlativo: i + 1,
                                            Cantidad: _productos[i].Cantidad,
                                            Precio: _productos[i].PrecioVta,
                                            SubTotal: _productos[i].PrecioTotal,
                                            Descuento: 0,
                                            Total: _productos[i].PrecioTotal,
                                            Fecha: new Date()
                                        });
                                    }

                                    let despacho = [];
                                    despacho.push({
                                        IdDespacho: 0,
                                        IdVenta: 0,
                                        IdTipoDespacho: _selectedTD,
                                        Direccion: _direccion,
                                        Numero: _numero,
                                        Telefono: _numero,
                                        Email: _email,
                                        IdEstadoDespacho: 1,
                                        IdRegion: _region,
                                        CiuCom: _ciudad,
                                        ComCod: _comuna,
                                        FechaDespacho: new Date()
                                    });

                                    let venta = {
                                        IdVenta: 0,
                                        FechaVenta: new Date(),
                                        RutCliente: res.Rut,
                                        IdCupon: _idCupon,
                                        CodVendedor: '07',
                                        CodEstadoVenta: 1,
                                        CodCondVta: res.CodCondVta,
                                        SubTotal: _totalPagar,
                                        Descuento: 0,
                                        PorcDescuento: 0,
                                        TotalDescuento: 0,
                                        Iva: _totalPagar * 0.19,
                                        Total: _totalPagar + (_totalPagar * 0.19),
                                        NVNumeroSoft: 0,
                                        EstadoSoft: 0,
                                        CodAuxSoft: 0,
                                        NvObserSoft: 0,
                                        IdTipoPago: _selectedTP,
                                        Detalles: detalles,
                                        Despacho: despacho[0]
                                    };

                                    _ventaService.save(venta).subscribe(
                                        res2 => {

                                            if (_selectedTP.toString() == '1') {

                                                localStorage.removeItem('productsCart');
                                                _carritoService.cleanProduct({});
                                                _notifyService.success('Correcto, procesando pago...');
                                                _loaderService.display(false);

                                                _cookieService.put('amount', _totalPagar.toString());
                                                _cookieService.put('IdVenta', res2.IdVenta);
                                                _cookieService.put('horaProceso', new Date().getHours().toString());
                                                _cookieService.put('minProceso', new Date().getMinutes().toString());
                                                _cookieService.put('secProceso', new Date().getSeconds().toString());
                                                _cookieService.put('clientName', res.NomAux);
                                                _router.navigate(['\pagotbk']);
                                                return;
                                            }
                                            else {
                                                _notifyService.success('Compra realizada correctamente.');
                                                _notifyService.success('Generando Nota de Venta...');

                                                _ventaService.generaNotaVenta(res2.IdVenta).subscribe(
                                                    resNV => {
                                                        localStorage.setItem('numNotaVenta', resNV.EstadoSoft);
                                                        localStorage.removeItem('productsCart');
                                                        _carritoService.cleanProduct({});
                                                        setTimeout(function (x) {


                                                            //Envio de correo cliente
                                                            let vm = {
                                                                tipo: 3,
                                                                nombre: res.NomAux,
                                                                asunto: 'Compra Exitosa - Berrylion',
                                                                mensaje: _configuration.createTableProducts(venta.Detalles),
                                                                email_destinatario: res.Email,
                                                            };

                                                            _ms.send(vm).subscribe(
                                                                res4 => {
                                                                    _loaderService.display(false);
                                                                    _router.navigate(['\successfull']);
                                                                },
                                                                err4 => {
                                                                    _notifyService.danger('Problemas al enviar correo');
                                                                    _loaderService.display(false);
                                                                    _router.navigate(['\successfull']);
                                                                }
                                                            );    

                                                            //Envio de correo operador berrylion
                                                         
                                                            let vm2 = {
                                                                tipo: 5,
                                                                nombre: res.NomAux,
                                                                asunto: 'Nueva venta realizada nro:' + resNV.EstadoSoft ,
                                                                mensaje: resNV.EstadoSoft + '|' + res.NomAux + '|' + res.Rut,
                                                                email_destinatario: '',
                                                            };

                                                            _ms.send(vm2).subscribe(
                                                                res5 => {
                                                                    _loaderService.display(false);
                                                                    _router.navigate(['\successfull']);
                                                                },
                                                                err5 => {
                                                                    _notifyService.danger('Problemas al enviar correo');
                                                                    _loaderService.display(false);
                                                                    _router.navigate(['\successfull']);
                                                                }
                                                            );                        

                                                        }, 1500);
                                                    },
                                                    errNV => {
                                                        _notifyService.danger('Problemas al generar nota de venta.');
                                                        _loaderService.display(false);
                                                        localStorage.removeItem('productsCart');
                                                        _carritoService.cleanProduct({});
                                                        setTimeout(function (x) {
                                                            _loaderService.display(false);
                                                            _router.navigate(['\successfull']);
                                                        }, 1500);
                                                    }
                                                );                                                
                                            }
                                        },
                                        err => { }
                                    );
                                }

                            },
                            err => { _notifyService.danger('Error al obtener usuario'); _loaderService.display(false); }
                        );
                    }
                }
            });
        }
        else {
            let _router = this.router;
            bootbox.confirm({
                message: "Para finalizar su compra debe Iniciar Sesión, seleccione una opción para continuar.",
                buttons: {
                    confirm: {
                        label: 'Iniciar Sesión',
                        className: 'btn-round'
                    },
                    cancel: {
                        label: 'Registrarse',
                        className: 'btn-round'
                    }
                },
                callback: function (result: boolean) {
                    if (result) {
                        _router.navigate(['\login']);
                    }
                    else {
                        _router.navigate(['\register']);
                    }
                }
            });
        }
    }

}

