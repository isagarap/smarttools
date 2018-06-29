import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../services/notify.service';
import { LoaderService } from '../../services/loader.service';
import { MailService } from '../../services/mail.service';

@Component({
    selector: 'app-contactus',
    templateUrl: './contactus.component.html',
    styles: [
        `
            .ng-valid[required], .ng-valid.required {
                border-right: 2px solid #42A948;
            }

            .ng-invalid:not(form) {
                border-right: 2px solid #a94442;
            }

            .starv {
                color: red;
            }
        `
    ]
})
export class ContactUsComponent implements OnInit {

    public contacto = {
        nombres: '',
        apellidos: '',
        email: '',
        mensaje: ''
    };

    constructor(private notifyService: NotifyService, private loaderService: LoaderService,
        private mailService: MailService) { }

    ngOnInit() {
    }

    sendMessaje() {
        this.loaderService.display(true);

        let vm = {
            tipo: 4,
            nombre: this.contacto.nombres,
            asunto: 'Contacto Cliente',
            mensaje: this.contacto.mensaje + '<br /><br /><br />' +
                     'Remitente: (' + this.contacto.email + ')',
            email_destinatario: 'soporte@smart-tools.cl'
        };

        this.mailService.send(vm).subscribe(
            res => {
                this.notifyService.success('Mensaje enviado correctamente');
                this.loaderService.display(false);
            },
            err => { this.notifyService.danger('Problemas al enviar email'); this.loaderService.display(false); }
        );
    }

}
