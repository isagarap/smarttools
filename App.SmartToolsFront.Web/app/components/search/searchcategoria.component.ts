﻿import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { NotifyService } from '../../services/notify.service';
import { CarritoService } from '../../services/carrito.service';
import { LoaderService } from '../../services/loader.service';
import { ProductosService } from '../../services/productos.service';
import { CategoriasService } from '../../services/categorias.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;
declare var swal: any;

@Component({
    selector: 'app-searchcategoria',
    templateUrl: './searchcategoria.component.html',
    styleUrls: [ './styles.css' ]
})
export class SearchCategoriaComponent implements OnInit {

    public productos: any = [];
    public categorias: any = [];
    public pagination: any = [];
    public currentPage: number = 1;
    public itemsByPage: number = 6;
    public showXfromX: number = 1;
    public orderBy: number = 1;
    public searchValue: string = '';

    constructor(private clienteService: ClienteService, private notifyService: NotifyService,
        private router: Router, private carritoService: CarritoService, private loaderService: LoaderService,
        private activatedRoute: ActivatedRoute, private productosService: ProductosService,
        private categoriasService: CategoriasService) {

        this.loadProducts();
    }

    loadProducts() {       
        this.activatedRoute.params.subscribe(params => {
            if (params['categoria'] != undefined && params['categoria'] != "") {
                this.loaderService.display(true);

                let filtersCate: any = [];
                if (this.categorias.length > 0) {
                    for (let i = 0; i <= this.categorias.length - 1; i++) {
                        this.categorias[i].selected = false;
                    }
                }

                this.searchValue = params['categoria'];

                if (params['categoria'] != 'all') {
                    filtersCate.push({
                        Id: 0,
                        CodGrupo: params['categoria'],
                        DesGrupo:'',
                        Imagen: '',
                        Estado: 1
                    });
                }

                let filters = {
                    filterValue: 'categoriasAllSearch',
                    OrderBy: this.orderBy,
                    Categorias: (params['categoria'] != 'all' ? filtersCate : []),
                    Email: ''
                };

                var user = localStorage.getItem('currentUser');
                if (user != null) {
                    let vm = JSON.parse(user);
                    filters.Email = vm.Email;
                }  

                this.productosService.getProductsFromSearchWithFilters(filters).subscribe(
                    res => {
                        this.productos = res;
                        let pagina = 1;
                        this.currentPage = 1;
                        this.pagination = [];
                        this.pagination.push({ pag: 1 });

                        if (this.productos.length > this.itemsByPage) {
                            for (let i = 0; i <= this.productos.length - 1; i++) {

                                if (i > 0 && this.isMultiplo(i, this.itemsByPage)) {
                                    pagina = pagina + 1;
                                    this.pagination.push({ pag: pagina });
                                }
                                this.productos[i].Pagina = pagina;
                            }
                            this.showXfromX = this.itemsByPage;
                        }
                        else {
                            for (let i = 0; i <= this.productos.length - 1; i++) {
                                this.productos[i].Pagina = 1;
                            }
                            this.showXfromX = this.productos.length;
                        }

                        if (this.searchValue != '' && this.searchValue != 'all') {
                            for (let i = 0; i <= this.categorias.length - 1; i++) {
                                if (this.categorias[i].CodGrupo == this.searchValue) {
                                    this.categorias[i].selected = true;
                                }
                            }
                        }

                        this.loaderService.display(false);
                    },
                    err => { this.notifyService.danger('Error al obtener resultados'); this.loaderService.display(false); }
                );
            }
        });
    }

    ngOnInit() {
        this.loadInitialData();
    }

    loadInitialData() {
        this.loaderService.display(true);

        this.categoriasService.getAll().subscribe(
            res => {
                this.categorias = res;

                if (this.searchValue != '') {
                    for (let i = 0; i <= this.categorias.length - 1; i++) {
                        if (this.categorias[i].CodGrupo == this.searchValue) {
                            this.categorias[i].selected = true;
                        }
                    }
                }

                this.loaderService.display(false);
            },
            err => { this.notifyService.danger('Error al obtener categorias'); this.loaderService.display(false); }
        );
    }

    isMultiplo(valor: number, multiple: number) {
        let resto = valor % multiple;
        if (resto == 0)
            return true;
        else
            return false;
    }

    changePage(page: number) {
        this.currentPage = page;
    }

    changeItemsByPages() {

        let x = $("#selectItemsByPage").val();
        this.itemsByPage = parseInt(x);
        this.search();
    }

    changeOrder() {
        let order = $("#selectOrder").val();
        this.orderBy = parseInt(order);
        this.search();
    }

    addToCart(p: any) {
        
        this.loaderService.display(true);

        this.productosService.getStockProducto(p.CodProd).subscribe(
            res2 => {
                this.loaderService.display(false);
                let stock = res2["PrecioVta"];

                if (stock > 0) {
                    this.carritoService.addProduct(p);
                }
                else {
                    this.notifyService.warning('Producto sin stock.');
                }
            },
            err => { this.loaderService.display(false); }
        );
    }

    changeFilter(c: any, e: any) {
        for (let i = 0; i <= this.categorias.length - 1; i++) {
            if (this.categorias[i].CodGrupo == c.CodGrupo) {
                this.categorias[i].selected = e.srcElement.checked;
            }
        }
    }

    cleanFilters() {
        for (let i = 0; i <= this.categorias.length - 1; i++) {
            this.categorias[i].selected = false;
        }
        this.search();
    }

    search() {
        this.loaderService.display(true);

        let filtersCate: any = [];
        if (this.categorias.length > 0) {
            for (let i = 0; i <= this.categorias.length - 1; i++) {
                if (this.categorias[i].selected != undefined && this.categorias[i].selected == true) {
                    filtersCate.push(this.categorias[i]);
                }
            }
        }

        let filters = {
            filterValue: 'categoriasAllSearch',
            OrderBy: this.orderBy,
            Categorias: filtersCate
        };

        this.productosService.getProductsFromSearchWithFilters(filters).subscribe(
            res => {
                this.productos = res;
                let pagina = 1;
                this.currentPage = 1;
                this.pagination = [];
                this.pagination.push({ pag: 1 });

                if (this.productos.length > this.itemsByPage) {
                    for (let i = 0; i <= this.productos.length - 1; i++) {

                        if (i > 0 && this.isMultiplo(i, this.itemsByPage)) {
                            pagina = pagina + 1;
                            this.pagination.push({ pag: pagina });
                        }
                        this.productos[i].Pagina = pagina;
                    }
                    this.showXfromX = this.itemsByPage;
                }
                else {
                    for (let i = 0; i <= this.productos.length - 1; i++) {
                        this.productos[i].Pagina = 1;
                    }
                    this.showXfromX = this.productos.length;
                }

                this.loaderService.display(false);
            },
            err => { this.notifyService.danger('Error al obtener resultados'); this.loaderService.display(false); }
        );
    }

    goToProduct(item: any) {
        this.router.navigate(['/details', item.CodProd]);
    }

    verStock(item: any) {
        this.loaderService.display(true);
        this.productosService.getStockProducto(item.CodProd).subscribe(
            res2 => {
                let stock = res2["PrecioVta"];
                this.loaderService.display(false);

                if (stock > 0) {
                    $.notify({
                        title: '<strong>Producto con Stock</strong><br />',
                        message: 'Producto con un stock actual de: ' + stock + '.'
                    });
                }
                else {
                    $.notify({
                        title: '<strong>Producto sin Stock</strong><br />',
                        message: 'Actualmente no poseemos stock para este producto.'
                    }, {
                            type: 'danger'
                        });
                }
            },
            err => { this.notifyService.warning('Problemas al obtener Stock'); this.loaderService.display(false); }
        );
    }

}
