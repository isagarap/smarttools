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
var productos_service_1 = require("../../../services/productos.service");
var carrito_service_1 = require("../../../services/carrito.service");
var notify_service_1 = require("../../../services/notify.service");
var router_2 = require("@angular/router");
var DetailsComponent = /** @class */ (function () {
    function DetailsComponent(activatedRoute, carritoService, productosService, router, notifyService) {
        var _this = this;
        this.activatedRoute = activatedRoute;
        this.carritoService = carritoService;
        this.productosService = productosService;
        this.router = router;
        this.notifyService = notifyService;
        this.images = [];
        this.productos = [];
        this.stock = 0;
        this.producto = {
            Id: 0,
            CodProd: '',
            DesProd: '',
            DesProd2: '',
            CodBarra: '',
            CodUmed: '',
            CodCategoria: '',
            CodSubCatergoria: '',
            PrecioVta: 0,
            PrecioBoleta: 0,
            PesoKgs: 0,
            NombreCategoria: ''
        };
        this.config = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30
        };
        this.activatedRoute.params.subscribe(function (params) {
            if (params['id'] != undefined && params['id'] != "0") {
                var obj = { Email: '', Clave: '', Msg: '', Nombre: params['id'] };
                var user = localStorage.getItem('currentUser');
                if (user != null) {
                    var vm = JSON.parse(user);
                    obj.Email = vm.Email;
                }
                _this.productosService.getProductoForDetalleByCodigo(obj).subscribe(function (res) {
                    _this.producto = res;
                    _this.images = res.Imagenes;
                    _this.productos = res.ProductosRelacionados;
                    _this.productosService.getStockProducto(_this.producto.CodProd).subscribe(function (res2) {
                        _this.stock = res2["PrecioVta"];
                    }, function (err) { });
                }, function (err) { });
            }
        });
    }
    DetailsComponent.prototype.ngOnInit = function () {
        $('html,body').scrollTop(0);
    };
    DetailsComponent.prototype.goToProduct = function (item) {
        $('html,body').scrollTop(0);
        this.router.navigate(['/details', item.CodProd]);
    };
    DetailsComponent.prototype.addToCart = function (item) {
        if (this.stock == 0) {
            this.notifyService.warning('Producto sin stock');
            return;
        }
        this.carritoService.addProduct(item);
        //let user = localStorage.getItem('currentUser');
        //if (user != null) {
        //    this.carritoService.addProduct(item);
        //}
        //else {
        //    this.notifyService.warning('Debe iniciar sesión para agregar productos.');
        //}
    };
    DetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-details',
            templateUrl: './details.component.html',
            styles: ["\n    #myCarousel .carousel-indicators {\n        bottom: 0;\n        left: 10px;\n        margin-left: 5px;\n        width: 100%;\n    }\n    #myCarousel .carousel-indicators li {\n        border: medium none;\n        border-radius: 0;\n        float: left;\n        height: 44px;\n        margin-bottom: 5px;\n        margin-left: 0;\n        margin-right: 5px !important;\n        margin-top: 0;\n        width: 120px;\n    }\n    #myCarousel .carousel-indicators img {\n        border: 2px solid #FFFFFF;\n        float: left;\n        height: 44px;\n        left: 0;\n        width: 120px;\n    }\n    #myCarousel .carousel-indicators .active img {\n        border: 2px solid #39b3d7;\n    }\n    .tag2 {\n\t    color: #aaaaaa;\n\t    display: inline-block;\n\t    width: 100%;\n\t    margin: 7px 0;\n\t    font-size: 13px;\n    }\n    .tittle2 {\n\t    color: #0168b8;\n\t    font-size: 14px;\n\t    display: inline-block;\n\t    min-height: 40px;\n    }\n    .tittle2:hover {\n\t    color: #333;\n    }\n    .price2 {\n\t    font-weight: bold;\n\t    color: #333333;\n\t    float: left;\n    }\n    .price2 span {\n\t    color: #aaaaaa;\n\t    text-decoration: line-through;\n\t    font-weight: normal;\n\t    margin-left: 10px;\n    }\n    .cart-btn2 {\n\t    height: 42px;\n\t    width: 42px;\n\t    border-radius: 50%;\n\t    background: #eeeeee;\n\t    color: #888888 !important;\n\t    float: right;\n\t    text-align: center;\n\t    line-height: 44px;\n\t    margin-top: -15px;\n    }\n    .cart-btn2:hover {\n\t    background: #0168b8;\n\t    color: #fff !important;\n    }\n    "]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, carrito_service_1.CarritoService,
            productos_service_1.ProductosService, router_2.Router, notify_service_1.NotifyService])
    ], DetailsComponent);
    return DetailsComponent;
}());
exports.DetailsComponent = DetailsComponent;
//# sourceMappingURL=details.component.js.map