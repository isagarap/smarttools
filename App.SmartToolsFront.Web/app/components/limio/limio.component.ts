import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistraLumioService } from '../../services/registralumio.service';
import { NotifyService } from '../../services/notify.service';
import { LoaderService } from '../../services/loader.service';
import { Configuration } from '../../app.constants';

declare var $: any;

@Component({
    selector: 'app-limio',
    templateUrl: './limio.component.html',
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
export class LimioComponent implements OnInit {

    public registro: any = {
        fecha: null,
        codigo: '',
        numero: '',
        nroserie: '',
        nombrepropietario: '',
        rut: '',
        email: ''
    };

    selectedTipo: any = [];
    tipos: any = [];

    constructor(private pouter: Router, private registraLumioService: RegistraLumioService,
        private notifyService: NotifyService, private loaderService: LoaderService, private configuration: Configuration) {

        this.tipos.push({ Id: 1, Nombre: 'Boleta' });
        this.tipos.push({ Id: 2, Nombre: 'Factura' });
    }

    ngOnInit() {
        $("#datepicker").datepicker({
            autoSize: true,
            changeMonth: true,
            changeYear: true,
            maxDate: new Date(),
            dateFormat: "dd-mm-yy",
            dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
            dayNames: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
            monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "Mar", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Maj", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        });
        $("#datepicker").datepicker().datepicker("setDate", new Date());
    }

    isValidRUT(rut: string) {

        if (!rut || typeof rut !== 'string') return false;

        var regexp = /^\d{7,8}-[k|K|\d]{1}$/;
        let res = regexp.test(rut);
        if (res == false) {
            this.notifyService.danger('Rut invalido');
            this.registro.rut = '';
        }
        else
            this.registro.rut = this.configuration.formateaRut(rut);
    }

    enviar() {

        let fecha = $("#datepicker").datepicker("getDate");
        if (fecha == null) {
            this.notifyService.warning('Debe seleccionar una fecha'); return;
        }

        this.loaderService.display(true);

        let model = {
            IdRegistro: 0,
            FechaCompra: fecha,
            NombreEmpresaProveedora: this.registro.codigo,
            TipoDocumento: this.selectedTipo.Nombre,
            NotaVenta: this.registro.numero,
            NroSerie: this.registro.nroserie,
            NombrePropietario: this.registro.nombrepropietario,
            Rut: this.registro.rut,
            Correo: this.registro.email
        };

        this.registraLumioService.save(model).subscribe(
            res => {
                this.notifyService.success('Correcto');
                this.loaderService.display(false);
            },
            err => { this.notifyService.danger('Problemas al grabar registro lumio'); this.loaderService.display(false); }
        );

    }

}
