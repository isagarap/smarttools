import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriasService } from '../../../services/categorias.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

    public categorias: any = [];

    constructor(private router: Router, private categoriasService: CategoriasService) {
        this.categoriasService.getAll().subscribe(
            res => {
                //this.categorias = res;

                if (res.length > 5) {
                    while (this.categorias.length < 5) {
                        var c = res[Math.floor(Math.random() * res.length)];
                        var e = this.categorias.filter(function (x: any) { return x.CodGrupo == c.CodGrupo });
                        if (e.length == 0) {
                            this.categorias.push(c);
                        }
                    }
                }
                else {
                    this.categorias = res;
                }              

            },
            err => { }
        );
    }

    ngOnInit() {
    }

}
