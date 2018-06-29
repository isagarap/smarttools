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
var router_1 = require("@angular/router");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(clienteService, notifyService, router, carritoService, loaderService) {
        this.clienteService = clienteService;
        this.notifyService = notifyService;
        this.router = router;
        this.carritoService = carritoService;
        this.loaderService = loaderService;
        this.cliente = {
            Email: '',
            Clave: ''
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function (cliente) {
        var _this = this;
        this.loaderService.display(true);
        var obj = {
            Email: cliente.Email,
            Clave: cliente.Clave,
            Msg: '',
            Nombre: ''
        };
        this.clienteService.getClienteLogin(obj).subscribe(function (res) {
            if (res.Msg == "OK") {
                _this.notifyService.success('Correcto');
                var user = {
                    Email: res.Email,
                    Nombre: res.Nombre
                };
                localStorage.setItem('currentUser', JSON.stringify(user));
                _this.carritoService.setUserLogin(user.Nombre);
                //recupera productos
                _this.clienteService.getProductosCarrito(obj).subscribe(function (res) {
                    for (var i = 0; i <= res.length - 1; i++) {
                        _this.carritoService.addProduct(res[i]);
                    }
                    _this.loaderService.display(false);
                    //this.router.navigate['/home'];
                    window.location.href = window.location.origin + '/#/home';
                }, function (err) { _this.notifyService.danger('Error'); });
            }
            else {
                _this.notifyService.warning(res.Msg);
                _this.loaderService.display(false);
            }
        }, function (err) { _this.notifyService.danger('Error'); _this.loaderService.display(false); });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styles: [
                "\n            .ng-valid[required], .ng-valid.required {\n                border-right: 2px solid #42A948;\n            }\n\n            .ng-invalid:not(form) {\n                border-right: 2px solid #a94442;\n            }\n\n            .lowerText {\n                text-transform: lowercase;\n            }\n        "
            ]
        }),
        __metadata("design:paramtypes", [cliente_service_1.ClienteService, notify_service_1.NotifyService,
            router_1.Router, carrito_service_1.CarritoService, loader_service_1.LoaderService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map