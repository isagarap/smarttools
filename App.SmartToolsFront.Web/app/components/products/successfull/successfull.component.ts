import { Component, OnInit } from '@angular/core';
import { ParametrosService } from '../../../services/parametros.service';
import { LoaderService } from '../../../services/loader.service';
import { NotifyService } from '../../../services/notify.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-successfull',
    templateUrl: './successfull.component.html'
})
export class SuccessfullComponent implements OnInit {

    public Nombre: string = 'Smart-Tools SPA';
    public RutPago: string = '';
    public CuentaCorriente1: string = '';
    public CuentaCorriente2: string = '';
    public EmailPago: string = '';
    public NumNotaVenta: string = '';

    constructor(private pouter: Router, private parametrosService: ParametrosService,
        private loaderService: LoaderService, private notifyService: NotifyService) {

        this.loaderService.display(true);
        this.parametrosService.getByNombre('RutPago').subscribe(
            res => {
                this.RutPago = res.Valor;
                
                this.parametrosService.getByNombre('CuentaCorriente1').subscribe(
                    res1 => {
                        this.CuentaCorriente1 = res1.Valor;

                        this.parametrosService.getByNombre('CuentaCorriente2').subscribe(
                            res2 => {
                                this.CuentaCorriente2 = res2.Valor;

                                this.parametrosService.getByNombre('EmailPago').subscribe(
                                    res3 => {
                                        this.EmailPago = res3.Valor;
                                        this.loaderService.display(false);
                                    },
                                    err3 => { this.notifyService.danger('Problemas al obtener parametros'); this.loaderService.display(false); }
                                );
                            },
                            err2 => { this.notifyService.danger('Problemas al obtener parametros'); this.loaderService.display(false); }
                        );
                    },
                    err1 => { this.notifyService.danger('Problemas al obtener parametros'); this.loaderService.display(false); }
                );
            },
            err => { this.notifyService.danger('Problemas al obtener parametros'); this.loaderService.display(false); }
        );
    }

    ngOnInit() {
        $('html,body').scrollTop(0);
        var numNV = localStorage.getItem('numNotaVenta');
        if (numNV != null) {
            this.NumNotaVenta = numNV;
        }
        localStorage.removeItem('numNotaVenta');
    }

}
