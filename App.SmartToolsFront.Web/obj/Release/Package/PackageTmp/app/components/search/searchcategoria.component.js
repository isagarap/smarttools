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
var cliente_service_1 = require("../../services/cliente.service");
var notify_service_1 = require("../../services/notify.service");
var carrito_service_1 = require("../../services/carrito.service");
var loader_service_1 = require("../../services/loader.service");
var productos_service_1 = require("../../services/productos.service");
var categorias_service_1 = require("../../services/categorias.service");
var router_1 = require("@angular/router");
var SearchCategoriaComponent = /** @class */ (function () {
    function SearchCategoriaComponent(clienteService, notifyService, router, carritoService, loaderService, activatedRoute, productosService, categoriasService) {
        this.clienteService = clienteService;
        this.notifyService = notifyService;
        this.router = router;
        this.carritoService = carritoService;
        this.loaderService = loaderService;
        this.activatedRoute = activatedRoute;
        this.productosService = productosService;
        this.categoriasService = categoriasService;
        this.productos = [];
        this.categorias = [];
        this.pagination = [];
        this.currentPage = 1;
        this.itemsByPage = 6;
        this.showXfromX = 1;
        this.orderBy = 1;
        this.searchValue = '';
        this.loadProducts();
    }
    SearchCategoriaComponent.prototype.loadProducts = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            if (params['categoria'] != undefined && params['categoria'] != "") {
                _this.loaderService.display(true);
                var filtersCate = [];
                if (_this.categorias.length > 0) {
                    for (var i = 0; i <= _this.categorias.length - 1; i++) {
                        _this.categorias[i].selected = false;
                    }
                }
                _this.searchValue = params['categoria'];
                if (params['categoria'] != 'all') {
                    filtersCate.push({
                        Id: 0,
                        CodGrupo: params['categoria'],
                        DesGrupo: '',
                        Imagen: '',
                        Estado: 1
                    });
                }
                var filters = {
                    filterValue: 'categoriasAllSearch',
                    OrderBy: _this.orderBy,
                    Categorias: (params['categoria'] != 'all' ? filtersCate : []),
                    Email: ''
                };
                var user = localStorage.getItem('currentUser');
                if (user != null) {
                    var vm = JSON.parse(user);
                    filters.Email = vm.Email;
                }
                _this.productosService.getProductsFromSearchWithFilters(filters).subscribe(function (res) {
                    _this.productos = res;
                    var pagina = 1;
                    _this.currentPage = 1;
                    _this.pagination = [];
                    _this.pagination.push({ pag: 1 });
                    if (_this.productos.length > _this.itemsByPage) {
                        for (var i = 0; i <= _this.productos.length - 1; i++) {
                            if (i > 0 && _this.isMultiplo(i, _this.itemsByPage)) {
                                pagina = pagina + 1;
                                _this.pagination.push({ pag: pagina });
                            }
                            _this.productos[i].Pagina = pagina;
                        }
                        _this.showXfromX = _this.itemsByPage;
                    }
                    else {
                        for (var i = 0; i <= _this.productos.length - 1; i++) {
                            _this.productos[i].Pagina = 1;
                        }
                        _this.showXfromX = _this.productos.length;
                    }
                    if (_this.searchValue != '' && _this.searchValue != 'all') {
                        for (var i = 0; i <= _this.categorias.length - 1; i++) {
                            if (_this.categorias[i].CodGrupo == _this.searchValue) {
                                _this.categorias[i].selected = true;
                            }
                        }
                    }
                    _this.loaderService.display(false);
                }, function (err) { _this.notifyService.danger('Error al obtener resultados'); _this.loaderService.display(false); });
            }
        });
    };
    SearchCategoriaComponent.prototype.ngOnInit = function () {
        this.loadInitialData();
    };
    SearchCategoriaComponent.prototype.loadInitialData = function () {
        var _this = this;
        this.loaderService.display(true);
        this.categoriasService.getAll().subscribe(function (res) {
            _this.categorias = res;
            if (_this.searchValue != '') {
                for (var i = 0; i <= _this.categorias.length - 1; i++) {
                    if (_this.categorias[i].CodGrupo == _this.searchValue) {
                        _this.categorias[i].selected = true;
                    }
                }
            }
            _this.loaderService.display(false);
        }, function (err) { _this.notifyService.danger('Error al obtener categorias'); _this.loaderService.display(false); });
    };
    SearchCategoriaComponent.prototype.isMultiplo = function (valor, multiple) {
        var resto = valor % multiple;
        if (resto == 0)
            return true;
        else
            return false;
    };
    SearchCategoriaComponent.prototype.changePage = function (page) {
        this.currentPage = page;
    };
    SearchCategoriaComponent.prototype.changeItemsByPages = function () {
        var x = $("#selectItemsByPage").val();
        this.itemsByPage = parseInt(x);
        this.search();
    };
    SearchCategoriaComponent.prototype.changeOrder = function () {
        var order = $("#selectOrder").val();
        this.orderBy = parseInt(order);
        this.search();
    };
    SearchCategoriaComponent.prototype.addToCart = function (p) {
        this.carritoService.addProduct(p);
        //let user = localStorage.getItem('currentUser');
        //if (user != null) {
        //    this.carritoService.addProduct(p);
        //}
        //else {
        //    this.notifyService.warning('Debe iniciar sesión para agregar productos.');
        //}
    };
    SearchCategoriaComponent.prototype.changeFilter = function (c, e) {
        for (var i = 0; i <= this.categorias.length - 1; i++) {
            if (this.categorias[i].CodGrupo == c.CodGrupo) {
                this.categorias[i].selected = e.srcElement.checked;
            }
        }
    };
    SearchCategoriaComponent.prototype.cleanFilters = function () {
        for (var i = 0; i <= this.categorias.length - 1; i++) {
            this.categorias[i].selected = false;
        }
        this.search();
    };
    SearchCategoriaComponent.prototype.search = function () {
        var _this = this;
        this.loaderService.display(true);
        var filtersCate = [];
        if (this.categorias.length > 0) {
            for (var i = 0; i <= this.categorias.length - 1; i++) {
                if (this.categorias[i].selected != undefined && this.categorias[i].selected == true) {
                    filtersCate.push(this.categorias[i]);
                }
            }
        }
        var filters = {
            filterValue: 'categoriasAllSearch',
            OrderBy: this.orderBy,
            Categorias: filtersCate
        };
        this.productosService.getProductsFromSearchWithFilters(filters).subscribe(function (res) {
            _this.productos = res;
            var pagina = 1;
            _this.currentPage = 1;
            _this.pagination = [];
            _this.pagination.push({ pag: 1 });
            if (_this.productos.length > _this.itemsByPage) {
                for (var i = 0; i <= _this.productos.length - 1; i++) {
                    if (i > 0 && _this.isMultiplo(i, _this.itemsByPage)) {
                        pagina = pagina + 1;
                        _this.pagination.push({ pag: pagina });
                    }
                    _this.productos[i].Pagina = pagina;
                }
                _this.showXfromX = _this.itemsByPage;
            }
            else {
                for (var i = 0; i <= _this.productos.length - 1; i++) {
                    _this.productos[i].Pagina = 1;
                }
                _this.showXfromX = _this.productos.length;
            }
            _this.loaderService.display(false);
        }, function (err) { _this.notifyService.danger('Error al obtener resultados'); _this.loaderService.display(false); });
    };
    SearchCategoriaComponent.prototype.goToProduct = function (item) {
        this.router.navigate(['/details', item.CodProd]);
    };
    SearchCategoriaComponent.prototype.verStock = function (item) {
        var _this = this;
        this.loaderService.display(true);
        this.productosService.getStockProducto(item.CodProd).subscribe(function (res2) {
            var stock = res2["PrecioVta"];
            _this.loaderService.display(false);
            if (stock > 0) {
                $.notify({
                    title: '<strong>Producto con Stock</strong><br />',
                    message: 'Producto con un stock actual de: ' + stock + '.'
                });
            }
            else {
                $.notify({
                    title: '<strong>Producto sin Stock</strong><br />',
                    message: 'Actualmente no poseemos stock para este producto.'
                }, {
                    type: 'danger'
                });
            }
        }, function (err) { _this.notifyService.warning('Problemas al obtener Stock'); _this.loaderService.display(false); });
    };
    SearchCategoriaComponent = __decorate([
        core_1.Component({
            selector: 'app-searchcategoria',
            templateUrl: './searchcategoria.component.html',
            styleUrls: ['./styles.css']
        }),
        __metadata("design:paramtypes", [cliente_service_1.ClienteService, notify_service_1.NotifyService,
            router_1.Router, carrito_service_1.CarritoService, loader_service_1.LoaderService,
            router_1.ActivatedRoute, productos_service_1.ProductosService,
            categorias_service_1.CategoriasService])
    ], SearchCategoriaComponent);
    return SearchCategoriaComponent;
}());
exports.SearchCategoriaComponent = SearchCategoriaComponent;
//# sourceMappingURL=searchcategoria.component.js.map