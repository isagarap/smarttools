"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
// Rutas
var app_routes_1 = require("./app.routes");
//Pipes
var sinimagen_pipe_1 = require("./pipes/sinimagen.pipe");
var searchfilter_pipe_1 = require("./pipes/searchfilter.pipe");
var categoria_pipe_1 = require("./pipes/categoria.pipe");
var categoriamenu_pipe_1 = require("./pipes/categoriamenu.pipe");
var monto_pipe_1 = require("./pipes/monto.pipe");
var banner_pipe_1 = require("./pipes/banner.pipe");
var productosdestacados_pipe_1 = require("./pipes/productosdestacados.pipe");
// Servicios
var productos_service_1 = require("./services/productos.service");
var categorias_service_1 = require("./services/categorias.service");
var condicionventa_service_1 = require("./services/condicionventa.service");
var condicionventatipopago_service_1 = require("./services/condicionventatipopago.service");
var venta_service_1 = require("./services/venta.service");
var carrito_service_1 = require("./services/carrito.service");
var cliente_service_1 = require("./services/cliente.service");
var notify_service_1 = require("./services/notify.service");
var cupones_service_1 = require("./services/cupones.service");
var banners_service_1 = require("./services/banners.service");
var suscripciones_service_1 = require("./services/suscripciones.service");
var loader_service_1 = require("./services/loader.service");
var giro_services_1 = require("./services/giro.services");
var ubicacion_service_1 = require("./services/ubicacion.service");
var tipodespacho_service_1 = require("./services/tipodespacho.service");
var parametros_service_1 = require("./services/parametros.service");
var mail_service_1 = require("./services/mail.service");
var registralumio_service_1 = require("./services/registralumio.service");
var app_constants_1 = require("./app.constants");
// Componentes
var app_component_1 = require("./app.component");
var navbar_component_1 = require("./components/shared/navbar/navbar.component");
var footer_component_1 = require("./components/shared/footer/footer.component");
var home_component_1 = require("./components/home/home.component");
var about_component_1 = require("./components/about/about.component");
var contactus_component_1 = require("./components/contactus/contactus.component");
var details_component_1 = require("./components/products/details/details.component");
var shoppingcart_component_1 = require("./components/products/shoppingcart/shoppingcart.component");
var register_component_1 = require("./components/register/register.component");
var login_component_1 = require("./components/login/login.component");
var successfull_component_1 = require("./components/products/successfull/successfull.component");
var search_component_1 = require("./components/search/search.component");
var searchcategoria_component_1 = require("./components/search/searchcategoria.component");
var location_component_1 = require("./components/location/location.component");
var passrecover_component_1 = require("./components/passrecover/passrecover.component");
var limio_component_1 = require("./components/limio/limio.component");
var profile_component_1 = require("./components/profile/profile.component");
var pagotbk_component_1 = require("./components/pagotbk/pagotbk.component");
//EXTERNAL LIBRARIES
var angular2_useful_swiper_1 = require("angular2-useful-swiper");
var ng2_map_1 = require("ng2-map");
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                navbar_component_1.NavbarComponent,
                footer_component_1.FooterComponent,
                home_component_1.HomeComponent,
                about_component_1.AboutComponent,
                contactus_component_1.ContactUsComponent,
                sinimagen_pipe_1.SinImagenPipe,
                searchfilter_pipe_1.SearchFilterPipe,
                categoria_pipe_1.CategoriaPipe,
                categoriamenu_pipe_1.CategoriaMenuPipe,
                monto_pipe_1.MontoPipe,
                banner_pipe_1.BannerPipe,
                details_component_1.DetailsComponent,
                shoppingcart_component_1.ShoppingCartComponent,
                register_component_1.RegisterComponent,
                login_component_1.LoginComponent,
                successfull_component_1.SuccessfullComponent,
                search_component_1.SearchComponent,
                searchcategoria_component_1.SearchCategoriaComponent,
                location_component_1.LocationComponent,
                passrecover_component_1.PassRecoverComponent,
                limio_component_1.LimioComponent,
                profile_component_1.ProfileComponent,
                productosdestacados_pipe_1.ProductosDestacadosPipe,
                pagotbk_component_1.PagoTbkComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                angular2_useful_swiper_1.SwiperModule,
                app_routes_1.APP_ROUTING,
                ng2_map_1.Ng2MapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyAesJkSuUuORud8UaTYjKJIwi1dcNJrFTs' })
            ],
            providers: [
                productos_service_1.ProductosService,
                app_constants_1.Configuration,
                carrito_service_1.CarritoService,
                notify_service_1.NotifyService,
                categorias_service_1.CategoriasService,
                cliente_service_1.ClienteService,
                condicionventa_service_1.CondicionVentaService,
                condicionventatipopago_service_1.CondicionVentaTipoPagoService,
                venta_service_1.VentaService,
                cupones_service_1.CuponesService,
                banners_service_1.BannersService,
                suscripciones_service_1.SuscripcionesService,
                loader_service_1.LoaderService,
                cookies_service_1.CookieService,
                giro_services_1.GiroService,
                ubicacion_service_1.UbicacionService,
                tipodespacho_service_1.TipoDespachoService,
                parametros_service_1.ParametrosService,
                mail_service_1.MailService,
                registralumio_service_1.RegistraLumioService,
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map