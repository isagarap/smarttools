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
var carrito_service_1 = require("../../../services/carrito.service");
var notify_service_1 = require("../../../services/notify.service");
var productos_service_1 = require("../../../services/productos.service");
var categorias_service_1 = require("../../../services/categorias.service");
var loader_service_1 = require("../../../services/loader.service");
var cliente_service_1 = require("../../../services/cliente.service");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(router, carritoService, notifyService, productosService, categoriasService, loaderService, clienteService) {
        var _this = this;
        this.router = router;
        this.carritoService = carritoService;
        this.notifyService = notifyService;
        this.productosService = productosService;
        this.categoriasService = categoriasService;
        this.loaderService = loaderService;
        this.clienteService = clienteService;
        this.productos = [];
        this.subtotal = 0;
        this.emailUser = '';
        this.logued = false;
        this.userName = '';
        this.searchValue = '';
        this.categorias = [];
        this.loaderService.display(true);
        var items = localStorage.getItem("productsCart");
        if (items != null) {
            var arrayP = JSON.parse(items);
            var _loop_1 = function (i) {
                this_1.productos.push(arrayP[i]);
                this_1.calcularTotal();
                arrayExists = arrayP.filter(function (x) { return x.CodProd == arrayP[i].CodProd; });
                if (arrayExists.length == 0) {
                    this_1.sharedOnLocalStorage(arrayP[i]);
                }
            };
            var this_1 = this, arrayExists;
            for (var i = 0; i <= arrayP.length - 1; i++) {
                _loop_1(i);
            }
        }
        var userLogin = localStorage.getItem("currentUser");
        if (userLogin != null) {
            this.user = JSON.parse(userLogin);
            this.emailUser = this.user.Email;
            this.userName = this.user.Nombre;
            this.logued = true;
        }
        this.categoriasService.getAllForMenu().subscribe(function (res) {
            _this.categorias = res;
            _this.loaderService.display(false);
        }, function (err) { _this.notifyService.danger('Problemas al obtener categorias'); _this.loaderService.display(false); });
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.carritoService.newProductSubject.subscribe(function (data) {
            var items = localStorage.getItem("productsCart");
            if (items == null) {
                _this.productos.push(data);
                _this.calcularTotal();
                _this.sharedOnLocalStorage(data);
                if (data.ImagenDefault.Activa != -1) {
                    _this.notifyService.success("Producto agregado correctamente");
                }
            }
            else {
                var filtered = JSON.parse(items);
                filtered = filtered.filter(function (x) { return x.CodProd == data.CodProd; });
                if (filtered.length > 0) {
                    _this.notifyService.warning('Producto ya fue agregado al carrito');
                }
                else {
                    _this.productos.push(data);
                    _this.calcularTotal();
                    _this.sharedOnLocalStorage(data);
                    if (data.ImagenDefault.Activa != -1) {
                        _this.notifyService.success("Producto agregado correctamente");
                    }
                }
            }
        });
        this.carritoService.userLogin.subscribe(function (res) {
            _this.userName = res.toString();
            _this.logued = true;
        });
        this.carritoService.cleanProductSubject.subscribe(function (resx) {
            _this.productos = [];
            _this.subtotal = 0;
        });
    };
    NavbarComponent.prototype.calcularTotal = function () {
        this.subtotal = 0;
        for (var i = 0; i <= this.productos.length - 1; i++) {
            this.subtotal = this.subtotal + this.productos[i].PrecioVta;
        }
    };
    NavbarComponent.prototype.removeItem = function (p) {
        //remuveve del objeto
        for (var i = 0; i <= this.productos.length - 1; i++) {
            if (this.productos[i].CodProd == p.CodProd) {
                this.subtotal = this.subtotal - this.productos[i].PrecioVta;
                this.productos.splice(i, 1);
                break;
            }
        }
        //remueve del localStorage
        var item = localStorage.getItem("productsCart");
        if (item != null) {
            var prods = JSON.parse(item);
            for (var i = 0; i <= prods.length - 1; i++) {
                if (prods[i].CodProd == p.CodProd) {
                    prods.splice(i, 1);
                    break;
                }
            }
            localStorage.setItem("productsCart", JSON.stringify(prods));
        }
    };
    NavbarComponent.prototype.sharedOnLocalStorage = function (p) {
        var all = localStorage.getItem("productsCart");
        var prod = {
            Id: p.Id,
            CodProd: p.CodProd,
            DesProd: p.DesProd,
            DesProd2: p.DesProd2,
            PrecioVta: p.PrecioVta,
            ImagenDefault: {
                Path: p.ImagenDefault.Path
            }
        };
        var collection = [];
        if (all != null) {
            var stored = JSON.parse(all);
            stored.push(prod);
            localStorage.setItem("productsCart", JSON.stringify(stored));
        }
        else {
            collection.push(prod);
            localStorage.setItem("productsCart", JSON.stringify(collection));
        }
    };
    NavbarComponent.prototype.logout = function () {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('productsCart');
        this.productos = [];
        this.subtotal = 0;
        this.logued = false;
        this.userName = '';
        window.location.href = window.location.origin + '/#/home';
    };
    NavbarComponent.prototype.search = function () {
        if (this.searchValue != '') {
            this.router.navigate(['\search', this.searchValue]);
        }
        else {
            this.notifyService.warning('Debe ingresar un valor de búsqueda');
        }
    };
    NavbarComponent.prototype.selectCategoria = function (c) {
        if (c.Id == 0)
            this.router.navigate(['\searchcategoria', "all"]);
        else
            this.router.navigate(['\searchcategoria', c.CodGrupo]);
    };
    NavbarComponent.prototype.redirectToProfile = function () {
        var userLogin = localStorage.getItem("currentUser");
        if (userLogin != null) {
            var u = JSON.parse(userLogin);
            var mail = u.Email;
            var encryptedEmail = btoa(mail);
            this.router.navigate(['/profile', encryptedEmail]);
        }
        else { }
        //this.loaderService.display(true);
        //this.clienteService.getClientByEmail(this.emailUser).subscribe(
        //    res => {
        //        this.router.navigate(['/profile', res.IdUsuario]);
        //        this.loaderService.display(false);
        //    },
        //    err => { this.notifyService.danger('Error el obtener datos del usuario.'); this.loaderService.display(false); }
        //);
    };
    NavbarComponent.prototype.goToCarrito = function () {
        var user = localStorage.getItem('currentUser');
        if (user != null) {
            this.router.navigate(['/shoppingcart']);
        }
        else {
            this.notifyService.warning('Debe iniciar sesión antes de entrar al carrito de compras.');
        }
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'app-navbar',
            templateUrl: './navbar.component.html',
            styles: ["\n        .labelMenu {\n            font-weight: bold;\n        }\n    "]
        }),
        __metadata("design:paramtypes", [router_1.Router, carrito_service_1.CarritoService,
            notify_service_1.NotifyService, productos_service_1.ProductosService,
            categorias_service_1.CategoriasService, loader_service_1.LoaderService, cliente_service_1.ClienteService])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map