import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../../services/productos.service';
import { CarritoService } from '../../../services/carrito.service';
import { NotifyService } from '../../../services/notify.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styles: [`
    #myCarousel .carousel-indicators {
        bottom: 0;
        left: 10px;
        margin-left: 5px;
        width: 100%;
    }
    #myCarousel .carousel-indicators li {
        border: medium none;
        border-radius: 0;
        float: left;
        height: 44px;
        margin-bottom: 5px;
        margin-left: 0;
        margin-right: 5px !important;
        margin-top: 0;
        width: 120px;
    }
    #myCarousel .carousel-indicators img {
        border: 2px solid #FFFFFF;
        float: left;
        height: 44px;
        left: 0;
        width: 120px;
    }
    #myCarousel .carousel-indicators .active img {
        border: 2px solid #39b3d7;
    }
    .tag2 {
	    color: #aaaaaa;
	    display: inline-block;
	    width: 100%;
	    margin: 7px 0;
	    font-size: 13px;
    }
    .tittle2 {
	    color: #0168b8;
	    font-size: 14px;
	    display: inline-block;
	    min-height: 40px;
    }
    .tittle2:hover {
	    color: #333;
    }
    .price2 {
	    font-weight: bold;
	    color: #333333;
	    float: left;
    }
    .price2 span {
	    color: #aaaaaa;
	    text-decoration: line-through;
	    font-weight: normal;
	    margin-left: 10px;
    }
    .cart-btn2 {
	    height: 42px;
	    width: 42px;
	    border-radius: 50%;
	    background: #eeeeee;
	    color: #888888 !important;
	    float: right;
	    text-align: center;
	    line-height: 44px;
	    margin-top: -15px;
    }
    .cart-btn2:hover {
	    background: #0168b8;
	    color: #fff !important;
    }
    `]
})
export class DetailsComponent implements OnInit {

    public images: any = [];
    public productos: any = [];
    public stock: number = 0;
    public producto: any = {
        Id: 0,
        CodProd: '',
        DesProd: '',
        DesProd2: '',
        CodBarra: '',
        CodUmed: '',
        CodCategoria: '',
        CodSubCatergoria: '',
        PrecioVta: 0,
        PrecioBoleta: 0,
        PesoKgs: 0,
        NombreCategoria: ''
    };

    config: SwiperOptions = {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30
    };

    constructor(private activatedRoute: ActivatedRoute, private carritoService: CarritoService,
        private productosService: ProductosService, private router: Router, private notifyService: NotifyService) {


        this.activatedRoute.params.subscribe(params => {
            if (params['id'] != undefined && params['id'] != "0") {

                var obj = { Email: '', Clave: '', Msg: '', Nombre: params['id'] };
                var user = localStorage.getItem('currentUser');

                if (user != null) {
                    let vm = JSON.parse(user);
                    obj.Email = vm.Email;
                }

                this.productosService.getProductoForDetalleByCodigo(obj).subscribe(
                    res => {
                        this.producto = res;
                        this.images = res.Imagenes;
                        this.productos = res.ProductosRelacionados;

                        this.productosService.getStockProducto(this.producto.CodProd).subscribe(
                            res2 => {
                                this.stock = res2["PrecioVta"];
                            },
                            err => { }
                        );

                    },
                    err => { }
                );
            }
        });

    }

    ngOnInit() {
        $('html,body').scrollTop(0);
    }

    goToProduct(item: any) {
        $('html,body').scrollTop(0);
        this.router.navigate(['/details', item.CodProd]);
    }

    addToCart(item: any) {
        if (this.stock == 0) {
            this.notifyService.warning('Producto sin stock'); return;
        }

        this.carritoService.addProduct(item);
        //let user = localStorage.getItem('currentUser');
        //if (user != null) {
        //    this.carritoService.addProduct(item);
        //}
        //else {
        //    this.notifyService.warning('Debe iniciar sesión para agregar productos.');
        //}
    }

}
