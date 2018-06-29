
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contactus/contactus.component';
import { DetailsComponent } from './components/products/details/details.component';
import { SuccessfullComponent } from './components/products/successfull/successfull.component';
import { ShoppingCartComponent } from './components/products/shoppingcart/shoppingcart.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { SearchCategoriaComponent } from './components/search/searchcategoria.component';
import { LocationComponent } from './components/location/location.component';
import { PassRecoverComponent } from './components/passrecover/passrecover.component';
import { LimioComponent } from './components/limio/limio.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PagoTbkComponent } from './components/pagotbk/pagotbk.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contactus', component: ContactUsComponent },
    { path: 'shoppingcart', component: ShoppingCartComponent },
    { path: 'details/:id', component: DetailsComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'successfull', component: SuccessfullComponent },
    { path: 'search/:id', component: SearchComponent },
    { path: 'searchcategoria/:categoria', component: SearchCategoriaComponent },
    { path: 'location', component: LocationComponent },
    { path: 'passrecover', component: PassRecoverComponent },
    { path: 'limio', component: LimioComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'profile/:user', component: ProfileComponent },
    { path: 'pagotbk', component: PagoTbkComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
