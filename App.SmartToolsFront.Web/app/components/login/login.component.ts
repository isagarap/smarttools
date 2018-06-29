import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { NotifyService } from '../../services/notify.service';
import { CarritoService } from '../../services/carrito.service';
import { LoaderService } from '../../services/loader.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            .ng-valid[required], .ng-valid.required {
                border-right: 2px solid #42A948;
            }

            .ng-invalid:not(form) {
                border-right: 2px solid #a94442;
            }

            .lowerText {
                text-transform: lowercase;
            }
        `
    ]
})
export class LoginComponent implements OnInit {

    cliente: any = {
        Email: '',
        Clave: ''
    };

    constructor(private clienteService: ClienteService, private notifyService: NotifyService,
        private router: Router, private carritoService: CarritoService, private loaderService: LoaderService) { }

    ngOnInit() {
    }

    login(cliente: any) {
        this.loaderService.display(true);

        let obj = {
            Email: cliente.Email,
            Clave: cliente.Clave,
            Msg: '',
            Nombre: ''
        };

        this.clienteService.getClienteLogin(obj).subscribe(
            res => {
                if (res.Msg == "OK") {
                    this.notifyService.success('Correcto');

                    let user = {
                        Email: res.Email,
                        Nombre: res.Nombre
                    };

                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.carritoService.setUserLogin(user.Nombre);

                    //recupera productos
                    this.clienteService.getProductosCarrito(obj).subscribe(
                        res => {

                            for (let i = 0; i <= res.length - 1; i++) {
                                this.carritoService.addProduct(res[i]);
                            }

                            this.loaderService.display(false);
                            //this.router.navigate['/home'];
                            window.location.href = window.location.origin + '/#/home';
                        },
                        err => { this.notifyService.danger('Error'); }
                    );
                }
                else {
                    this.notifyService.warning(res.Msg);
                    this.loaderService.display(false);
                }
            },
            err => { this.notifyService.danger('Error'); this.loaderService.display(false); }
        );
    }

}
