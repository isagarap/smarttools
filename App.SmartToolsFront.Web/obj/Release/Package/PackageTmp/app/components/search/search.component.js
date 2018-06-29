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
var SearchComponent = /** @class */ (function () {
    function SearchComponent(clienteService, notifyService, router, carritoService, loaderService, activatedRoute, productosService, categoriasService) {
        this.clienteService = clienteService;
        this.notifyService = notifyService;
        this.router = router;
        this.carritoService = carritoService;
        this.loaderService = loaderService;
        this.activatedRoute = activatedRoute;
        this.productosService = productosService;
        this.categoriasService = categoriasService;
        this.selectedValue = [];
        this.productos = [];
        this.categorias = [];
        this.pagination = [];
        this.currentPage = 1;
        this.itemsByPage = 6;
        this.showXfromX = 1;
        this.orderBy = 1;
        this.loadProducts();
    }
    SearchComponent.prototype.loadProducts = function () {
        var _this = this;
        var filtersCate = [];
        for (var i = 0; i <= this.categorias.length - 1; i++) {
            if (this.categorias[i].selected != undefined && this.categorias[i].selected == true) {
                filtersCate.push(this.categorias[i]);
            }
        }
        this.activatedRoute.params.subscribe(function (params) {
            if (params['id'] != undefined && params['id'] != "") {
                _this.loaderService.display(true);
                var filters = {
                    filterValue: params['id'],
                    OrderBy: _this.orderBy,
                    Categorias: filtersCate,
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
                        $('#inputSearch').val('');
                    }
                    else {
                        for (var i = 0; i <= _this.productos.length - 1; i++) {
                            _this.productos[i].Pagina = 1;
                        }
                        _this.showXfromX = _this.productos.length;
                        $('#inputSearch').val('');
                    }
                    _this.loaderService.display(false);
                }, function (err) { _this.notifyService.danger('Error al obtener resultados'); _this.loaderService.display(false); });
            }
        });
    };
    SearchComponent.prototype.ngOnInit = function () {
        this.loadInitialData();
        $(".js-example-placeholder-single").select2({
            placeholder: "Seleccione o ingrese un Producto",
            allowClear: true,
            width: '100%'
        });
    };
    SearchComponent.prototype.loadInitialData = function () {
        var _this = this;
        this.loaderService.display(true);
        this.categoriasService.getAll().subscribe(function (res) {
            _this.categorias = res;
            _this.loaderService.display(false);
        }, function (err) { _this.notifyService.danger('Error al obtener categorias'); _this.loaderService.display(false); });
    };
    SearchComponent.prototype.isMultiplo = function (valor, multiple) {
        var resto = valor % multiple;
        if (resto == 0)
            return true;
        else
            return false;
    };
    SearchComponent.prototype.changePage = function (page) {
        this.currentPage = page;
    };
    SearchComponent.prototype.changeItemsByPages = function () {
        var x = $("#selectItemsByPage").val();
        this.itemsByPage = parseInt(x);
        this.loadProducts();
    };
    SearchComponent.prototype.changeOrder = function () {
        var order = $("#selectOrder").val();
        this.orderBy = parseInt(order);
        this.loadProducts();
    };
    SearchComponent.prototype.addToCart = function (p) {
        this.carritoService.addProduct(p);
        //let user = localStorage.getItem('currentUser');
        //if (user != null) {
        //    this.carritoService.addProduct(p);
        //}
        //else {
        //    this.notifyService.warning('Debe iniciar sesión para agregar productos.');
        //}
    };
    SearchComponent.prototype.changeFilter = function (c, e) {
        for (var i = 0; i <= this.categorias.length - 1; i++) {
            if (this.categorias[i].CodGrupo == c.CodGrupo) {
                this.categorias[i].selected = e.srcElement.checked;
            }
        }
    };
    SearchComponent.prototype.cleanFilters = function () {
        for (var i = 0; i <= this.categorias.length - 1; i++) {
            this.categorias[i].selected = false;
        }
        this.loadProducts();
    };
    SearchComponent.prototype.goToProduct = function (item) {
        this.router.navigate(['/details', item.CodProd]);
    };
    SearchComponent.prototype.verStock = function (item) {
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
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'app-search',
            templateUrl: './search.component.html',
            styleUrls: ['./styles.css']
        }),
        __metadata("design:paramtypes", [cliente_service_1.ClienteService, notify_service_1.NotifyService,
            router_1.Router, carrito_service_1.CarritoService, loader_service_1.LoaderService,
            router_1.ActivatedRoute, productos_service_1.ProductosService,
            categorias_service_1.CategoriasService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map