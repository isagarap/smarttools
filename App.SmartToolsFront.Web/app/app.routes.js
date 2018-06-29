"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./components/home/home.component");
var about_component_1 = require("./components/about/about.component");
var contactus_component_1 = require("./components/contactus/contactus.component");
var details_component_1 = require("./components/products/details/details.component");
var successfull_component_1 = require("./components/products/successfull/successfull.component");
var shoppingcart_component_1 = require("./components/products/shoppingcart/shoppingcart.component");
var register_component_1 = require("./components/register/register.component");
var login_component_1 = require("./components/login/login.component");
var search_component_1 = require("./components/search/search.component");
var searchcategoria_component_1 = require("./components/search/searchcategoria.component");
var location_component_1 = require("./components/location/location.component");
var passrecover_component_1 = require("./components/passrecover/passrecover.component");
var limio_component_1 = require("./components/limio/limio.component");
var profile_component_1 = require("./components/profile/profile.component");
var pagotbk_component_1 = require("./components/pagotbk/pagotbk.component");
var APP_ROUTES = [
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'contactus', component: contactus_component_1.ContactUsComponent },
    { path: 'shoppingcart', component: shoppingcart_component_1.ShoppingCartComponent },
    { path: 'details/:id', component: details_component_1.DetailsComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'successfull', component: successfull_component_1.SuccessfullComponent },
    { path: 'search/:id', component: search_component_1.SearchComponent },
    { path: 'searchcategoria/:categoria', component: searchcategoria_component_1.SearchCategoriaComponent },
    { path: 'location', component: location_component_1.LocationComponent },
    { path: 'passrecover', component: passrecover_component_1.PassRecoverComponent },
    { path: 'limio', component: limio_component_1.LimioComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'profile/:user', component: profile_component_1.ProfileComponent },
    { path: 'pagotbk', component: pagotbk_component_1.PagoTbkComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
exports.APP_ROUTING = router_1.RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=app.routes.js.map