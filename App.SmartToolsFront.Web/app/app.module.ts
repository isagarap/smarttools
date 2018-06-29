import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy, DatePipe } from '@angular/common';

// Rutas
import { APP_ROUTING } from './app.routes';

//Pipes
import { SinImagenPipe } from './pipes/sinimagen.pipe';
import { SearchFilterPipe } from './pipes/searchfilter.pipe';
import { CategoriaPipe } from './pipes/categoria.pipe';
import { CategoriaMenuPipe } from './pipes/categoriamenu.pipe';
import { MontoPipe } from './pipes/monto.pipe';
import { BannerPipe } from './pipes/banner.pipe';
import { ProductosDestacadosPipe } from './pipes/productosdestacados.pipe';

// Servicios
import { ProductosService } from './services/productos.service';
import { CategoriasService } from './services/categorias.service';
import { CondicionVentaService } from './services/condicionventa.service';
import { CondicionVentaTipoPagoService } from './services/condicionventatipopago.service';
import { VentaService } from './services/venta.service';
import { CarritoService } from './services/carrito.service';
import { ClienteService } from './services/cliente.service';
import { NotifyService } from './services/notify.service';
import { CuponesService } from './services/cupones.service';
import { BannersService } from './services/banners.service';
import { SuscripcionesService } from './services/suscripciones.service';
import { LoaderService } from './services/loader.service';
import { GiroService } from './services/giro.services';
import { UbicacionService } from './services/ubicacion.service';
import { TipoDespachoService } from './services/tipodespacho.service';
import { ParametrosService } from './services/parametros.service';
import { MailService } from './services/mail.service';
import { RegistraLumioService } from './services/registralumio.service';
import { Configuration } from './app.constants';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contactus/contactus.component';
import { DetailsComponent } from './components/products/details/details.component';
import { ShoppingCartComponent } from './components/products/shoppingcart/shoppingcart.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SuccessfullComponent } from './components/products/successfull/successfull.component';
import { SearchComponent } from './components/search/search.component';
import { SearchCategoriaComponent } from './components/search/searchcategoria.component';
import { LocationComponent } from './components/location/location.component';
import { PassRecoverComponent } from './components/passrecover/passrecover.component';
import { LimioComponent } from './components/limio/limio.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PagoTbkComponent } from './components/pagotbk/pagotbk.component';

//EXTERNAL LIBRARIES
import { SwiperModule } from 'angular2-useful-swiper';
import { Ng2MapModule } from 'ng2-map';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        HomeComponent,
        AboutComponent,
        ContactUsComponent,
        SinImagenPipe,
        SearchFilterPipe,
        CategoriaPipe,
        CategoriaMenuPipe,
        MontoPipe,
        BannerPipe,
        DetailsComponent,
        ShoppingCartComponent,
        RegisterComponent,
        LoginComponent,
        SuccessfullComponent,
        SearchComponent,
        SearchCategoriaComponent,
        LocationComponent,
        PassRecoverComponent,
        LimioComponent,
        ProfileComponent,
        ProductosDestacadosPipe,
        PagoTbkComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        SwiperModule,
        APP_ROUTING,
        Ng2MapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyAesJkSuUuORud8UaTYjKJIwi1dcNJrFTs' })
    ],
    providers: [
        ProductosService,
        Configuration,
        CarritoService,
        NotifyService,
        CategoriasService,
        ClienteService,
        CondicionVentaService,
        CondicionVentaTipoPagoService,
        VentaService,
        CuponesService,
        BannersService,
        SuscripcionesService,
        LoaderService,
        CookieService,
        GiroService,
        UbicacionService,
        TipoDespachoService,
        ParametrosService,
        MailService,
        RegistraLumioService,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
