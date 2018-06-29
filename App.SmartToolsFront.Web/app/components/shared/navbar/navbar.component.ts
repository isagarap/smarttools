import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../../../services/carrito.service';
import { NotifyService } from '../../../services/notify.service';
import { ProductosService } from '../../../services/productos.service';
import { CategoriasService } from '../../../services/categorias.service';
import { LoaderService } from '../../../services/loader.service';
import { ClienteService } from '../../../services/cliente.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styles: [`
        .labelMenu {
            font-weight: bold;
        }
        .navX {
            max-height: 300px;
            overflow-y:scroll; 
        }
    `]
})
export class NavbarComponent implements OnInit {

    public productos: any = [];
    public subtotal: number = 0;
    public user: any;
    public emailUser: string = '';
    public logued: boolean = false;
    public userName: string = '';
    public searchValue: string = '';
    public categorias: any = [];

    constructor(private router: Router, private carritoService: CarritoService,
        private notifyService: NotifyService, private productosService: ProductosService,
        private categoriasService: CategoriasService, private loaderService: LoaderService, private clienteService: ClienteService) {

        this.loaderService.display(true);

        var items = localStorage.getItem("productsCart");
        if (items != null) {
            var arrayP = JSON.parse(items);
            for (let i = 0; i <= arrayP.length - 1; i++) {
                this.productos.push(arrayP[i]);
                this.calcularTotal();

                var arrayExists = arrayP.filter(function (x: any) { return x.CodProd == arrayP[i].CodProd });
                if (arrayExists.length == 0) {    
                    this.sharedOnLocalStorage(arrayP[i]);
                }
            }
        }

        var userLogin = localStorage.getItem("currentUser");
        if (userLogin != null) {
            this.user = JSON.parse(userLogin);
            this.emailUser = this.user.Email;
            this.userName = this.user.Nombre;
            this.logued = true;
        }

        this.categoriasService.getAllForMenu().subscribe(
            res => {
                this.categorias = res;
                this.loaderService.display(false);
            },
            err => { this.notifyService.danger('Problemas al obtener categorias'); this.loaderService.display(false); }
        );
    }

    ngOnInit() {
        this.carritoService.newProductSubject.subscribe(
            data => {
                var items = localStorage.getItem("productsCart");
                if (items == null) {
                    this.productos.push(data);
                    this.calcularTotal();
                    this.sharedOnLocalStorage(data);

                    if (data.ImagenDefault.Activa != -1) {
                        this.notifyService.success("Producto agregado correctamente");
                    }
                }
                else {
                    var filtered = JSON.parse(items);
                    filtered = filtered.filter(function (x: any) { return x.CodProd == data.CodProd });
                    if (filtered.length > 0) {
                        this.notifyService.warning('Producto ya fue agregado al carrito');
                    }
                    else {
                        this.productos.push(data);
                        this.calcularTotal();
                        this.sharedOnLocalStorage(data);

                        if (data.ImagenDefault.Activa != -1) {
                            this.notifyService.success("Producto agregado correctamente");
                        }
                    }
                }
            }
        );

        this.carritoService.userLogin.subscribe(
            res => {
                this.userName = res.toString();
                this.logued = true;
            }
        );

        this.carritoService.cleanProductSubject.subscribe(
            resx => {
                this.productos = [];
                this.subtotal = 0;
            }
        );
    }

    calcularTotal() {
        this.subtotal = 0;
        for (let i = 0; i <= this.productos.length - 1; i++) {
            this.subtotal = this.subtotal + this.productos[i].PrecioVta;
        }
    }

    removeItem(p: any) {
        //remuveve del objeto
        for (let i = 0; i <= this.productos.length - 1; i++) {
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
            for (let i = 0; i <= prods.length - 1; i++) {
                if (prods[i].CodProd == p.CodProd) {
                    prods.splice(i, 1);
                    break;
                }
            }
            localStorage.setItem("productsCart", JSON.stringify(prods));
        }
    }

    sharedOnLocalStorage(p: any) {

        var all = localStorage.getItem("productsCart");

        let prod = {
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
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('productsCart');

        this.productos = [];
        this.subtotal = 0;
        this.logued = false;
        this.userName = '';

        window.location.href = window.location.origin + '/#/home';
    }

    search() {
        if (this.searchValue != '') {
            this.router.navigate(['\search', this.searchValue]);
        }
        else {
            this.notifyService.warning('Debe ingresar un valor de búsqueda');
        }
    }

    selectCategoria(c: any) {
        if(c.Id == 0)
            this.router.navigate(['\searchcategoria', "all"]);
        else
            this.router.navigate(['\searchcategoria', c.CodGrupo]);
    }

    redirectToProfile() {

        var userLogin = localStorage.getItem("currentUser");
        if (userLogin != null) {
            let u = JSON.parse(userLogin);
            let mail = u.Email;
            let encryptedEmail = btoa(mail);
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
    }

    goToCarrito() {
        let user = localStorage.getItem('currentUser');
        if (user != null) {
            this.router.navigate(['/shoppingcart']);
        }
        else {
            this.notifyService.warning('Debe iniciar sesión antes de entrar al carrito de compras.');
        }
    }

}
