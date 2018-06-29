import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { NotifyService } from '../../services/notify.service';
import { MailService } from '../../services/mail.service';
import { ClienteService } from '../../services/cliente.service';

declare var $: any;

@Component({
    selector: 'app-passrecover',
    templateUrl: './passrecover.component.html',
    styles: [
        `
            .ng-valid[required], .ng-valid.required {
                border-right: 2px solid #42A948;
            }

            .ng-invalid:not(form) {
                border-right: 2px solid #a94442;
            }
        `
    ]
})
export class PassRecoverComponent implements OnInit {

    userEmail: string = '';

    constructor(private pouter: Router, private mailService: MailService, private loaderService: LoaderService,
        private notifyService: NotifyService, private clienteService: ClienteService) {
    }

    ngOnInit() {

    }

    enviar() {
        if (this.userEmail != "") {

            let userVM = {
                Email: this.userEmail,
                Clave: '', Msg: '', Nombre: ''
            };

            this.loaderService.display(true);

            this.clienteService.getClientByEmail(userVM).subscribe(
                res => {

                    if (res.Rut != undefined) {
                        userVM.Msg = res.Rut;

                        this.clienteService.getTemporalPasswordToUpdate(userVM).subscribe(
                            res2 => {

                                let vm = {
                                    tipo: 1,
                                    nombre: res.NomAux,
                                    asunto: 'Recuperar Contraseña - Smart Tools',
                                    mensaje: 'Hola' + '<br />' +
                                        'Recibimos una solicitud para restablecer tu contraseña de Smart Tools.' +
                                        'Tu nueva contraseña es: ' + res2.Clave + '<br /><br />' +
                                        'Podrás utilizar esta contraseña o cambiarla en tu perfil.',
                                    email_destinatario: res.Email,
                                };

                                this.mailService.send(vm).subscribe(
                                    res3 => {
                                        this.notifyService.success('Correcto. Se ha enviando un mail a su casilla actual.');
                                        this.loaderService.display(false);
                                    },
                                    err3 => { this.notifyService.danger('Problemas al enviar correo'); this.loaderService.display(false); }
                                );
                            },
                            err2 => { this.notifyService.danger('Problemas al generar password temporal'); this.loaderService.display(false); }
                        );
                    }
                    else {
                        this.notifyService.warning("Email no existe en el sistema");
                        this.loaderService.display(false);
                    }
                },
                err => { this.loaderService.display(false); this.notifyService.danger('No se encuentra usuario.'); }
            );

        }
        else { this.notifyService.warning('Debe ingresar su Email'); }
    }

}
