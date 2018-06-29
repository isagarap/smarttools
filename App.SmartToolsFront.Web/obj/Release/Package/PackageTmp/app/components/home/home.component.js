"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var productos_service_1 = require("../../services/productos.service");
var carrito_service_1 = require("../../services/carrito.service");
var notify_service_1 = require("../../services/notify.service");
var loader_service_1 = require("../../services/loader.service");
var categorias_service_1 = require("../../services/categorias.service");
var banners_service_1 = require("../../services/banners.service");
var suscripciones_service_1 = require("../../services/suscripciones.service");
var router_1 = require("@angular/router");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(productosService, carritoService, router, notifyService, loaderService, categoriasService, bannersService, suscripcionesService) {
        var _this = this;
        this.productosService = productosService;
        this.carritoService = carritoService;
        this.router = router;
        this.notifyService = notifyService;
        this.loaderService = loaderService;
        this.categoriasService = categoriasService;
        this.bannersService = bannersService;
        this.suscripcionesService = suscripcionesService;
        this.productos = [];
        this.banners = [];
        this.categorias = [];
        this.categorias5 = [];
        this.selectedCategoria = '';
        this.emailSuscripcion = '';
        this.isMobile = false;
        //OBTIENE BANNERS
        this.bannersService.getAll().subscribe(function (res) {
            _this.banners = res;
        }, function (err) { _this.notifyService.danger('Problemas al obtener Banners'); });
        $('html,body').scrollTop(0);
        // device detection
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
            this.isMobile = true;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.loaderService.display(true);
        this.getProductos();
    };
    HomeComponent.prototype.getCategorias = function () {
        var _this = this;
        this.categoriasService.getAll().subscribe(function (res) {
            _this.categorias = res;
            _this.loadPlugins();
            _this.loaderService.display(false);
        }, function (err) { });
    };
    HomeComponent.prototype.getProductos = function () {
        var _this = this;
        var obj = { Email: '', Clave: '', Msg: '', Nombre: '' };
        var user = localStorage.getItem('currentUser');
        if (user != null) {
            var vm = JSON.parse(user);
            obj.Email = vm.Email;
        }
        this.productosService.getProductosOneImage(obj).subscribe(function (res) {
            var resOrder = res.sort(function (a, b) {
                return parseFloat(a.OrdenDestacado) - parseFloat(b.OrdenDestacado);
            });
            _this.productos = resOrder;
            _this.getCategorias();
        }, function (err) { });
    };
    HomeComponent.prototype.goToProduct = function (item) {
        this.router.navigate(['/details', item.CodProd]);
    };
    HomeComponent.prototype.addToCart = function (item) {
        this.carritoService.addProduct(item);
        //let user = localStorage.getItem('currentUser');
        //if (user != null) {
        //    this.carritoService.addProduct(item);
        //}
        //else {
        //    this.notifyService.warning('Debe iniciar sesión para agregar productos.');
        //}
    };
    HomeComponent.prototype.getStyle = function (b) {
        return 'url(' + b.Url + ')';
    };
    HomeComponent.prototype.suscribe = function () {
        var _this = this;
        if (this.emailSuscripcion.length == 0) {
            this.notifyService.warning('Debe ingresar un Email');
            return;
        }
        if (this.validateEmail(this.emailSuscripcion) == false) {
            this.notifyService.warning('Email ingresado no es válido');
            return;
        }
        var item = {
            IdSuscripcion: 0,
            Email: this.emailSuscripcion,
            FechaSuscripcion: new Date(),
            Estado: 1,
        };
        this.suscripcionesService.save(item).subscribe(function (res) {
            _this.notifyService.success('Suscripción exitosa.');
            _this.emailSuscripcion = '';
        }, function (err) { _this.notifyService.danger('Problemas en la suscripción'); });
    };
    HomeComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    };
    HomeComponent.prototype.loadPlugins = function () {
        /*-----------------------------------------------------------------------------------*/
        /* 	LOADER
        /*-----------------------------------------------------------------------------------*/
        $("#loader").delay(1000).fadeOut("slow");
        /*-----------------------------------------------------------------------------------*/
        /*		STICKY NAVIGATION
        /*-----------------------------------------------------------------------------------*/
        $(".sticky").sticky({ topSpacing: 0 });
        /*-----------------------------------------------------------------------------------*/
        /*  FULL SCREEN
        /*-----------------------------------------------------------------------------------*/
        $('.full-screen').superslides({});
        /*-----------------------------------------------------------------------------------
            Animated progress bars
        /*-----------------------------------------------------------------------------------*/
        $('.progress-bars').waypoint(function () {
            $('.progress').each(function () {
                $(this).find('.progress-bar').animate({
                    width: $(this).attr('data-percent')
                }, 200);
            });
        }, {
            offset: '100%',
            triggerOnce: true
        });
        /* ==========================================================================
            countdown timer
        ========================================================================== */
        $('.countdown').downCount({
            date: '12/12/2018 12:00:00' // M/D/Y
        });
        /*-----------------------------------------------------------------------------------*/
        /*	ISOTOPE PORTFOLIO
        /*-----------------------------------------------------------------------------------*/
        var $container = $('.port-wrap .items');
        $container.imagesLoaded(function () {
            $container.isotope({
                itemSelector: '.portfolio-item',
                layoutMode: 'masonry'
            });
        });
        $('.portfolio-filter li a').on('click', function () {
            $('.portfolio-filter li a').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector
            });
            return false;
        });
        //Togle Menu on click in Header
        $(".menu-shows").on('click', function () {
            $(".menu-shows, .menu-shows-inner, .menu").toggleClass("active");
        });
        /*-----------------------------------------------------------------------------------*/
        /*	ISOTOPE PORTFOLIO
        /*-----------------------------------------------------------------------------------*/
        var $container = $('.port-wrap .items');
        $container.imagesLoaded(function () {
            $container.isotope({
                itemSelector: '.portfolio-item',
                layoutMode: 'masonry'
            });
        });
        $('.portfolio-filter li a').on('click', function () {
            $('.portfolio-filter li a').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector
            });
            return false;
        });
        /*-----------------------------------------------------------------------------------*/
        /*    Parallax
        /*-----------------------------------------------------------------------------------*/
        $.stellar({
            horizontalScrolling: false,
            scrollProperty: 'scroll',
            positionProperty: 'position',
        });
        /*-----------------------------------------------------------------------------------*/
        /* 	SLIDER REVOLUTION
        /*-----------------------------------------------------------------------------------*/
        $(".tp-banner").revolution({
            sliderType: "standard",
            sliderLayout: "auto",
            delay: 9000,
            minHeight: 500,
            gridwidth: 0,
            navigationType: "bullet",
            navigationArrows: "solo",
            navigationStyle: "preview4",
            gridheight: 500
        });
        /*-----------------------------------------------------------------------------------*/
        /* 	SLIDER REVOLUTION
        /*-----------------------------------------------------------------------------------*/
        $('.tp-banner-full').show().revolution({
            dottedOverlay: "none",
            delay: 7000,
            startwidth: 1200,
            startheight: 500,
            navigationType: "bullet",
            navigationArrows: "solo",
            navigationStyle: "preview4",
            parallax: "mouse",
            parallaxBgFreeze: "on",
            parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],
            keyboardNavigation: "on",
            shadow: 0,
            fullWidth: "on",
            fullScreen: "off",
            shuffle: "off",
            autoHeight: "off",
            forceFullWidth: "on",
            fullScreenOffsetContainer: ""
        });
        /*-----------------------------------------------------------------------------------*/
        /* 	TESTIMONIAL SLIDER
        /*-----------------------------------------------------------------------------------*/
        $("#testi-slide").owlCarousel({
            items: 1,
            autoplay: true,
            loop: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            navigation: true,
            nav: true,
            navText: ["<i class='lnr lnr-arrow-left'></i>", "<i class='lnr lnr-arrow-right'></i>"],
            pagination: true,
            singleItem: true
        });
        /*-----------------------------------------------------------------------------------*/
        /* 	Single SLIDER
        /*-----------------------------------------------------------------------------------*/
        $(".singl-slide").owlCarousel({
            items: 1,
            autoplay: true,
            loop: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            navigation: true,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            pagination: true,
            singleItem: true
        });
        /*-----------------------------------------------------------------------------------*/
        /* 	TESTIMONIAL SLIDER
        /*-----------------------------------------------------------------------------------*/
        $(".deal-slide").owlCarousel({
            items: 1,
            autoplay: true,
            loop: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            navigation: true,
            nav: true,
            navText: ["<span>Previous Deal</span>", "<span>Next Deal</span>"],
            pagination: true,
            lazyLoad: true,
            singleItem: true
        });
        /*-----------------------------------------------------------------------------------*/
        /* 	TESTIMONIAL SLIDER
        /*-----------------------------------------------------------------------------------*/
        $(".item-slide-5").owlCarousel({
            items: 5,
            autoplay: true,
            loop: false,
            margin: 30,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            lazyLoad: true,
            nav: true,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 3,
                },
                1000: {
                    items: 4,
                },
                1200: {
                    items: 5,
                }
            },
            animateOut: 'fadeOut'
        });
        /*-----------------------------------------------------------------------------------*/
        /* 	TESTIMONIAL SLIDER
        /*-----------------------------------------------------------------------------------*/
        $(".item-slide-4").owlCarousel({
            items: 4,
            autoplay: true,
            loop: false,
            margin: 30,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            lazyLoad: true,
            nav: true,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                1000: {
                    items: 4,
                }
            },
            animateOut: 'fadeOut'
        });
        /*-----------------------------------------------------------------------------------*/
        /* 	CASE SLIDER
        /*-----------------------------------------------------------------------------------*/
        $(".item-slide-3").owlCarousel({
            items: 3,
            autoplay: true,
            loop: false,
            margin: 30,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            lazyLoad: true,
            nav: true,
            responsive: {
                0: {
                    items: 1,
                },
                800: {
                    items: 2,
                },
                1000: {
                    items: 3,
                },
            },
            animateOut: 'fadeOut'
        });
        /*-----------------------------------------------------------------------------------*/
        /* 	CASE SLIDER
        /*-----------------------------------------------------------------------------------*/
        $(".item-slide-2").owlCarousel({
            items: 2,
            autoplay: true,
            loop: false,
            margin: 30,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            lazyLoad: true,
            nav: true,
            responsive: {
                0: {
                    items: 1,
                },
                800: {
                    items: 2,
                },
                1000: {
                    items: 2,
                },
            },
            animateOut: 'fadeOut'
        });
        /*-----------------------------------------------------------------------------------*/
        /* 	CASE SLIDER
        /*-----------------------------------------------------------------------------------*/
        $("#blog-slide").owlCarousel({
            items: 3,
            autoplay: true,
            loop: false,
            margin: 30,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            lazyLoad: true,
            nav: true,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                1000: {
                    items: 3,
                },
            },
            animateOut: 'fadeOut'
        });
        /*-----------------------------------------------------------------------------------*/
        /* 	CASE SLIDER
        /*-----------------------------------------------------------------------------------*/
        $("#blog-slide-2").owlCarousel({
            items: 2,
            autoplay: true,
            loop: false,
            margin: 30,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            lazyLoad: true,
            nav: true,
            responsive: {
                0: {
                    items: 1,
                },
                800: {
                    items: 2,
                },
                1000: {
                    items: 2,
                },
            },
            animateOut: 'fadeOut'
        });
        /*-----------------------------------------------------------------------------------*/
        /* 	CASE SLIDER
        /*-----------------------------------------------------------------------------------*/
        $("#client-slide-1").owlCarousel({
            items: 4,
            autoplay: true,
            loop: true,
            margin: 30,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            navText: ["<i class='lnr lnr-arrow-left'></i>", "<i class='lnr lnr-arrow-right'></i>"],
            lazyLoad: true,
            nav: true,
            responsive: {
                0: {
                    items: 1,
                },
                800: {
                    items: 2,
                },
                1000: {
                    items: 4,
                },
            },
            animateOut: 'fadeOut'
        });
        /*-----------------------------------------------------------------------------------*/
        /* 	COUNTER
        /*-----------------------------------------------------------------------------------*/
        $('.counter').counterUp({
            delay: 10,
            time: 300
        });
        /*-----------------------------------------------------------------------------------
            TESTNMONIALS STYLE 1
        /*-----------------------------------------------------------------------------------*/
        $('.free-slide').flexslider({
            mode: 'fade',
            animation: "fade",
            auto: true
        });
        /*-----------------------------------------------------------------------------------*/
        /* 	Thumb Slider
        /*-----------------------------------------------------------------------------------*/
        $('.thumb-slider').flexslider({
            animation: "slide",
            controlNav: "thumbnails"
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styles: ["\n    .week-sale-bnr2 {\n\t    height: 250px;\n\t    text-align: center;\n\t    padding: 20px 35px;\n\t    padding-bottom: 0px;\n\t    padding-top: 45px;\n    }\n    "]
        }),
        __metadata("design:paramtypes", [productos_service_1.ProductosService,
            carrito_service_1.CarritoService,
            router_1.Router, notify_service_1.NotifyService,
            loader_service_1.LoaderService, categorias_service_1.CategoriasService,
            banners_service_1.BannersService, suscripciones_service_1.SuscripcionesService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map