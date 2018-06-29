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
var carrito_service_1 = require("../../../services/carrito.service");
var productos_service_1 = require("../../../services/productos.service");
var loader_service_1 = require("../../../services/loader.service");
var notify_service_1 = require("../../../services/notify.service");
var condicionventa_service_1 = require("../../../services/condicionventa.service");
var condicionventatipopago_service_1 = require("../../../services/condicionventatipopago.service");
var venta_service_1 = require("../../../services/venta.service");
var cliente_service_1 = require("../../../services/cliente.service");
var cupones_service_1 = require("../../../services/cupones.service");
var ubicacion_service_1 = require("../../../services/ubicacion.service");
var tipodespacho_service_1 = require("../../../services/tipodespacho.service");
var parametros_service_1 = require("../../../services/parametros.service");
var mail_service_1 = require("../../../services/mail.service");
var app_constants_1 = require("../../../app.constants");
var core_2 = require("angular2-cookie/core");
var router_1 = require("@angular/router");
var ShoppingCartComponent = /** @class */ (function () {
    function ShoppingCartComponent(carritoService, productosService, loaderService, notifyService, condicionVentaService, router, ventaService, clienteService, cuponesService, cookieService, tipoDespachoService, condicionVentaTipoPagoService, ubicacionService, parametrosService, mailService, configuration) {
        this.carritoService = carritoService;
        this.productosService = productosService;
        this.loaderService = loaderService;
        this.notifyService = notifyService;
        this.condicionVentaService = condicionVentaService;
        this.router = router;
        this.ventaService = ventaService;
        this.clienteService = clienteService;
        this.cuponesService = cuponesService;
        this.cookieService = cookieService;
        this.tipoDespachoService = tipoDespachoService;
        this.condicionVentaTipoPagoService = condicionVentaTipoPagoService;
        this.ubicacionService = ubicacionService;
        this.parametrosService = parametrosService;
        this.mailService = mailService;
        this.configuration = configuration;
        this.productos = [];
        this.tiposPago = [];
        this.tiposDespacho = [];
        this.totalPagar = 0;
        this.subTotal = 0;
        this.step = 0;
        this.selectedTP = 0;
        this.selectedTPNombre = '';
        this.selectedTPDesc = '';
        this.selectedTD = 0;
        this.selectedTDNombre = '';
        this.selectedTDDesc = '';
        this.selectedCupon = '';
        this.IdCupon = 0;
        this.cuponObj = [];
        this.descuento = 0;
        this.regiones = [];
        this.ciudades = [];
        this.comunas = [];
        this.despachoEmail = '';
        this.despachoTelefono = '';
        this.despachoDireccion = '';
        this.despachoNumero = '';
        this.regionNombre = '';
        this.ciudadNombre = '';
        this.comunaNombre = '';
        this.regionId = 0;
        this.ciudadId = '';
        this.comunaId = '';
        this.valorIva = 19;
        this.ocupaNumeroEnDireccion = false;
        this.loadInitialData();
    }
    ShoppingCartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parametrosService.getByNombre('OcupaNumeroDir').subscribe(function (res) {
            if (res != null && res.Valor != null && res.Valor == 1) {
                _this.ocupaNumeroEnDireccion = true;
            }
        }, function (err) { });
        var products = localStorage.getItem('productsCart');
        if (products != null) {
            var parseProds = JSON.parse(products);
            for (var i = 0; i <= parseProds.length - 1; i++) {
                parseProds[i].PrecioTotal = parseProds[i].PrecioVta;
                parseProds[i].Cantidad = 1;
                this.productos.push(parseProds[i]);
                this.totalPagar = this.totalPagar + parseInt(parseProds[i].PrecioVta);
            }
            this.subTotal = this.totalPagar;
        }
    };
    ShoppingCartComponent.prototype.loadInitialData = function () {
        var _this = this;
        this.loaderService.display(true);
        var user = localStorage.getItem('currentUser');
        if (user != null) {
            var parseUser = JSON.parse(user);
            var userModel = { Email: parseUser.Email, Clave: '', Msg: '', Nombre: '' };
            this.clienteService.getClientByEmail(userModel).subscribe(function (res1) {
                var x = res1.CodCondVta;
                _this.condicionVentaTipoPagoService.getAllByCondVta(x).subscribe(function (res2) {
                    _this.tiposPago = res2;
                    _this.tipoDespachoService.getAll().subscribe(function (res3) {
                        _this.tiposDespacho = res3;
                        _this.loaderService.display(false);
                    }, function (err) { _this.notifyService.danger('Problemas al cargar tipos de despacho'); });
                }, function (err) { _this.notifyService.danger('Problemas al cargar condiciones de venta'); });
            }, function (err) { _this.notifyService.danger('Problemas al cargar datos del usuario'); });
        }
        else {
            this.condicionVentaTipoPagoService.getAll().subscribe(function (res) {
                _this.tiposPago = res;
                _this.loaderService.display(false);
            }, function (err) { _this.notifyService.danger('Problemas al cargar condiciones de venta'); });
        }
    };
    ShoppingCartComponent.prototype.changeCantidad = function (p) {
        var _this = this;
        var idCant = '#C' + p.CodProd;
        var cant = $(idCant).val();
        this.loaderService.display(true);
        this.productosService.getStockProducto(p.CodProd).subscribe(function (res) {
            var stock = parseInt(res["PrecioVta"]);
            if (cant > stock) { }
            for (var i = 0; i <= _this.productos.length - 1; i++) {
                if (_this.productos[i].CodProd == p.CodProd) {
                    var newVal = parseInt(p.PrecioVta) * parseInt(cant);
                    _this.productos[i].PrecioTotal = newVal;
                    _this.productos[i].Cantidad = cant;
                    break;
                }
            }
            _this.calculaTotal();
            _this.totalPagar = _this.totalPagar - _this.descuento;
            _this.loaderService.display(false);
        }, function (err) { });
    };
    ShoppingCartComponent.prototype.removeItem = function (p) {
        //remueve de la grilla
        for (var i = 0; i <= this.productos.length - 1; i++) {
            if (this.productos[i].CodProd == p.CodProd) {
                this.productos.splice(i, 1);
                break;
            }
        }
        //remueve del local storage
        var products = localStorage.getItem('productsCart');
        var parseProds = JSON.parse(products);
        for (var i = 0; i <= parseProds.length - 1; i++) {
            if (parseProds[i].CodProd == p.CodProd) {
                parseProds.splice(i, 1);
                break;
            }
        }
        localStorage.setItem('productsCart', JSON.stringify(parseProds));
        //remueve de la tabla
        this.calculaTotal();
    };
    ShoppingCartComponent.prototype.calculaTotal = function () {
        this.totalPagar = 0;
        this.subTotal = 0;
        for (var i = 0; i <= this.productos.length - 1; i++) {
            this.totalPagar = this.totalPagar + (parseInt(this.productos[i].PrecioTotal));
        }
        this.subTotal = this.totalPagar;
        this.totalPagar = this.totalPagar - this.descuento;
    };
    ShoppingCartComponent.prototype.nextStep = function (id) {
        // -1: Atrás
        //  0: Paso 1 - Carrito de Compras
        //  1: Paso 2 - Metodos de Pago
        //  2: Paso 3 - Despacho
        //  3: Paso 4 - Confirmación
        var _this = this;
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
                    this.cuponesService.getByCodigo(this.selectedCupon).subscribe(function (res) {
                        if (res.IdCupon == 0) {
                            _this.loaderService.display(false);
                            _this.notifyService.warning('Código de cupón no es válido.');
                            _this.step = 0;
                            return;
                        }
                        else {
                            $('html,body').scrollTop(0);
                        }
                    }, function (err) { });
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
                this.ubicacionService.getAllRegiones().subscribe(function (res1) {
                    _this.regiones = res1;
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
                    $.each(_this.regiones, function () {
                        options.append($("<option />").val(this.IdRegion).text(this.Descripcion));
                    });
                    $('#selReg').val(null).trigger('change');
                    var ls = _this.loaderService;
                    var us = _this.ubicacionService;
                    var ns = _this.notifyService;
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
                    _this.loaderService.display(false);
                }, function (err) { _this.notifyService.danger('Problemas al cargar regiones'); _this.loaderService.display(false); });
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
                    this.ciudadId = $("#selCiu").val();
                    this.comunaId = $("#selCom").val();
                    this.regionNombre = $("#selReg option:selected").text();
                    this.ciudadNombre = $("#selCiu option:selected").text();
                    this.comunaNombre = $("#selCom option:selected").text();
                }
                var regexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
                var res = regexp.test(this.despachoEmail);
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
                    this.ubicacionService.getAllRegiones().subscribe(function (res1) {
                        _this.regiones = res1;
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
                        $.each(_this.regiones, function () {
                            options.append($("<option />").val(this.IdRegion).text(this.Descripcion));
                        });
                        $('#selReg').val(null).trigger('change');
                        var ls = _this.loaderService;
                        var us = _this.ubicacionService;
                        var ns = _this.notifyService;
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
                        _this.loaderService.display(false);
                    }, function (err) { _this.notifyService.danger('Problemas al cargar regiones'); _this.loaderService.display(false); });
                }
                break;
        }
    };
    ShoppingCartComponent.prototype.selectTipoPago = function (tp) {
        this.selectedTP = tp.IdTipoPago;
        this.selectedTPNombre = tp.Nombre;
        this.selectedTPDesc = tp.Descripcion;
    };
    ShoppingCartComponent.prototype.selectTipoDespacho = function (td) {
        this.selectedTD = td.IdTipoDespacho;
        this.selectedTDNombre = td.Nombre;
        this.selectedTDDesc = td.Descripcion;
    };
    ShoppingCartComponent.prototype.applyCupon = function () {
        var _this = this;
        if (this.selectedCupon == "") {
            this.notifyService.warning('Debe ingresar un Cupón.');
            return;
        }
        this.loaderService.display(true);
        this.cuponesService.getByCodigo(this.selectedCupon).subscribe(function (res) {
            _this.cuponObj = res;
            if (res.IdCupon == 0) {
                _this.loaderService.display(false);
                _this.notifyService.warning('Código de cupón no es válido.');
                return;
            }
            _this.IdCupon = res.IdCupon;
            //recalcula
            if (res.IdTipoDescuento == 1) {
                //decuento por monto
                _this.descuento = res.Descuento;
                _this.totalPagar = _this.totalPagar - _this.descuento;
            }
            else if (res.IdTipoDescuento == 2) {
                //descuento por porcentaje
                if (res.CodProd == "") {
                    //descuento general
                    var montoDescuento = (_this.totalPagar * res.Descuento) / 100;
                    _this.descuento = montoDescuento;
                    _this.totalPagar = _this.totalPagar - montoDescuento;
                }
                else {
                    //descuento solo un producto
                    var producto = _this.productos.filter(function (x) { return x.CodProd == res.CodProd; });
                    if (producto.length > 0) {
                        var montoDescuento = (_this.totalPagar * producto[0].Descuento) / 100;
                        _this.descuento = montoDescuento;
                        _this.totalPagar = _this.totalPagar - montoDescuento;
                    }
                }
            }
            _this.loaderService.display(false);
        }, function (err) { _this.notifyService.danger('Error al obtener cupones'); _this.loaderService.display(false); });
    };
    ShoppingCartComponent.prototype.changeMisDatos = function () {
        var _this = this;
        var x = $('#cate1').is(':checked');
        if (x == true) {
            var user = localStorage.getItem('currentUser');
            if (user != null) {
                this.loaderService.display(true);
                var parseUser = JSON.parse(user);
                var userModel_1 = { Email: parseUser.Email, Clave: '', Msg: '', Nombre: '' };
                this.clienteService.getClientByEmail(userModel_1).subscribe(function (res) {
                    _this.despachoDireccion = res.DirAux;
                    _this.despachoNumero = res.DirNum;
                    _this.despachoEmail = res.Email;
                    _this.despachoTelefono = res.Telefono;
                    _this.ubicacionService.getUbicacion(userModel_1).subscribe(function (res1) {
                        _this.regionId = res1.Region.IdRegion;
                        _this.ciudadId = res1.Ciudad.CiuCod;
                        _this.comunaId = res1.Comuna.ComCod;
                        _this.regionNombre = res1.Region.Descripcion;
                        _this.ciudadNombre = res1.Ciudad.Descripcion;
                        _this.comunaNombre = res1.Comuna.Descripcion;
                    }, function (err1) { });
                    $("#divCombos").css("display", "none");
                    $("#divNoCombos").css("display", "inline");
                    _this.loaderService.display(false);
                }, function (err) { _this.notifyService.danger('Problemas al obtener usuario'); _this.loaderService.display(false); });
            }
            else {
                this.notifyService.danger('No es posible obtener los datos del usuario');
            }
        }
        else {
            $("#divNoCombos").css("display", "none");
            $("#divCombos").css("display", "inline");
        }
    };
    ShoppingCartComponent.prototype.grabar = function () {
        var user = localStorage.getItem('currentUser');
        if (user != null) {
            var _router_1 = this.router;
            var _ventaService_1 = this.ventaService;
            var _clienteService_1 = this.clienteService;
            var _loaderService_1 = this.loaderService;
            var _productos_1 = this.productos;
            var _selectedTP_1 = this.selectedTP;
            var _selectedTD_1 = this.selectedTD;
            var _totalPagar_1 = this.totalPagar;
            var _notifyService_1 = this.notifyService;
            var _carritoService_1 = this.carritoService;
            var _cookieService_1 = this.cookieService;
            var _ms_1 = this.mailService;
            var _configuration_1 = this.configuration;
            var _region_1 = this.regionId;
            var _ciudad_1 = this.ciudadId;
            var _comuna_1 = this.comunaId;
            var _direccion_1 = this.despachoDireccion;
            var _numero_1 = this.despachoNumero;
            var _email_1 = this.despachoEmail;
            var _fono = this.despachoTelefono;
            var _cupon = this.selectedCupon;
            var _idCupon_1 = this.IdCupon;
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
                callback: function (result) {
                    if (result) {
                        //grabacion
                        _loaderService_1.display(true);
                        var parseUser = JSON.parse(user);
                        var userModel = {
                            Email: parseUser.Email, Clave: '', Msg: '', Nombre: ''
                        };
                        _clienteService_1.getClientByEmail(userModel).subscribe(function (res) {
                            if (res.Email == null) {
                                //email no existe
                                _notifyService_1.warning('Datos inválidos de Usuario, usted será redirigido al Inicio de Sesión.');
                                setTimeout(function (x) {
                                    _loaderService_1.display(false);
                                    _router_1.navigate(['\login']);
                                }, 1500);
                            }
                            else {
                                var detalles = [];
                                for (var i = 0; i <= _productos_1.length - 1; i++) {
                                    detalles.push({
                                        IdDetalle: 0,
                                        IdVenta: 0,
                                        CodProducto: _productos_1[i].CodProd,
                                        Correlativo: i + 1,
                                        Cantidad: _productos_1[i].Cantidad,
                                        Precio: _productos_1[i].PrecioVta,
                                        SubTotal: _productos_1[i].PrecioTotal,
                                        Descuento: 0,
                                        Total: _productos_1[i].PrecioTotal,
                                        Fecha: new Date()
                                    });
                                }
                                var despacho = [];
                                despacho.push({
                                    IdDespacho: 0,
                                    IdVenta: 0,
                                    IdTipoDespacho: _selectedTD_1,
                                    Direccion: _direccion_1,
                                    Numero: _numero_1,
                                    Telefono: _numero_1,
                                    Email: _email_1,
                                    IdEstadoDespacho: 1,
                                    IdRegion: _region_1,
                                    CiuCom: _ciudad_1,
                                    ComCod: _comuna_1,
                                    FechaDespacho: new Date()
                                });
                                var venta_1 = {
                                    IdVenta: 0,
                                    FechaVenta: new Date(),
                                    RutCliente: res.Rut,
                                    IdCupon: _idCupon_1,
                                    CodVendedor: '07',
                                    CodEstadoVenta: 1,
                                    CodCondVta: res.CodCondVta,
                                    SubTotal: _totalPagar_1,
                                    Descuento: 0,
                                    PorcDescuento: 0,
                                    TotalDescuento: 0,
                                    Iva: _totalPagar_1 * 0.19,
                                    Total: _totalPagar_1 + (_totalPagar_1 * 0.19),
                                    NVNumeroSoft: 0,
                                    EstadoSoft: 0,
                                    CodAuxSoft: 0,
                                    NvObserSoft: 0,
                                    IdTipoPago: _selectedTP_1,
                                    Detalles: detalles,
                                    Despacho: despacho[0]
                                };
                                _ventaService_1.save(venta_1).subscribe(function (res2) {
                                    if (_selectedTP_1.toString() == '1') {
                                        localStorage.removeItem('productsCart');
                                        _carritoService_1.cleanProduct({});
                                        _notifyService_1.success('Correcto, procesando pago...');
                                        _loaderService_1.display(false);
                                        _cookieService_1.put('amount', _totalPagar_1.toString());
                                        _cookieService_1.put('IdVenta', res2.IdVenta);
                                        _cookieService_1.put('horaProceso', new Date().getHours().toString());
                                        _cookieService_1.put('minProceso', new Date().getMinutes().toString());
                                        _cookieService_1.put('secProceso', new Date().getSeconds().toString());
                                        _cookieService_1.put('clientName', res.NomAux);
                                        _router_1.navigate(['\pagotbk']);
                                        return;
                                    }
                                    else {
                                        _notifyService_1.success('Compra realizada correctamente.');
                                        _notifyService_1.success('Generando Nota de Venta...');
                                        _ventaService_1.generaNotaVenta(res2.IdVenta).subscribe(function (resNV) {
                                            localStorage.setItem('numNotaVenta', resNV.EstadoSoft);
                                            localStorage.removeItem('productsCart');
                                            _carritoService_1.cleanProduct({});
                                            setTimeout(function (x) {
                                                //Envio de correo
                                                var vm = {
                                                    tipo: 3,
                                                    nombre: res.NomAux,
                                                    asunto: 'Compra Exitosa - Smart Tools',
                                                    mensaje: _configuration_1.createTableProducts(venta_1.Detalles),
                                                    email_destinatario: res.Email,
                                                };
                                                _ms_1.send(vm).subscribe(function (res4) {
                                                    _loaderService_1.display(false);
                                                    _router_1.navigate(['\successfull']);
                                                }, function (err4) {
                                                    _notifyService_1.danger('Problemas al enviar correo');
                                                    _loaderService_1.display(false);
                                                    _router_1.navigate(['\successfull']);
                                                });
                                            }, 1500);
                                        }, function (errNV) {
                                            _notifyService_1.danger('Problemas al generar nota de venta.');
                                            _loaderService_1.display(false);
                                            localStorage.removeItem('productsCart');
                                            _carritoService_1.cleanProduct({});
                                            setTimeout(function (x) {
                                                _loaderService_1.display(false);
                                                _router_1.navigate(['\successfull']);
                                            }, 1500);
                                        });
                                    }
                                }, function (err) { });
                            }
                        }, function (err) { _notifyService_1.danger('Error al obtener usuario'); _loaderService_1.display(false); });
                    }
                }
            });
        }
        else {
            var _router_2 = this.router;
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
                callback: function (result) {
                    if (result) {
                        _router_2.navigate(['\login']);
                    }
                    else {
                        _router_2.navigate(['\register']);
                    }
                }
            });
        }
    };
    ShoppingCartComponent = __decorate([
        core_1.Component({
            selector: 'app-shoppingcart',
            templateUrl: './shoppingcart.component.html',
            styles: [
                "\n            .ng-valid[required], .ng-valid.required {\n                border-right: 2px solid #42A948;\n            }\n\n            .ng-invalid:not(form) {\n                border-right: 2px solid #a94442;\n            }\n\n            .starv {\n                color: red;\n            }\n\n            .disabledbutton {\n                pointer-events: none;\n                opacity: 0.4;\n            }\n        "
            ]
        }),
        __metadata("design:paramtypes", [carrito_service_1.CarritoService, productos_service_1.ProductosService,
            loader_service_1.LoaderService, notify_service_1.NotifyService,
            condicionventa_service_1.CondicionVentaService, router_1.Router,
            venta_service_1.VentaService, cliente_service_1.ClienteService,
            cupones_service_1.CuponesService, core_2.CookieService,
            tipodespacho_service_1.TipoDespachoService, condicionventatipopago_service_1.CondicionVentaTipoPagoService,
            ubicacion_service_1.UbicacionService, parametros_service_1.ParametrosService,
            mail_service_1.MailService, app_constants_1.Configuration])
    ], ShoppingCartComponent);
    return ShoppingCartComponent;
}());
exports.ShoppingCartComponent = ShoppingCartComponent;
//# sourceMappingURL=shoppingcart.component.js.map