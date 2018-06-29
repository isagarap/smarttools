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
var app_constants_1 = require("../../app.constants");
var platform_browser_1 = require("@angular/platform-browser");
var PagoTbkComponent = /** @class */ (function () {
    function PagoTbkComponent(configuration, domSanitizer) {
        this.configuration = configuration;
        this.domSanitizer = domSanitizer;
        this.amount = 990;
        //localStorage.setItem('amount', '990');
        //let url = this.domSanitizer.bypassSecurityTrustUrl(this.configuration.IframeTbkUrl);
        this.iframeUrl = this.configuration.IframeTbkUrl;
    }
    PagoTbkComponent.prototype.ngOnInit = function () {
    };
    PagoTbkComponent.prototype.getFrmaeUrl = function () {
        var url = this.domSanitizer.sanitize(core_1.SecurityContext.HTML, this.iframeUrl);
        return url;
    };
    PagoTbkComponent = __decorate([
        core_1.Component({
            selector: 'app-pagotbk',
            templateUrl: './pagotbk.component.html'
        }),
        __metadata("design:paramtypes", [app_constants_1.Configuration, platform_browser_1.DomSanitizer])
    ], PagoTbkComponent);
    return PagoTbkComponent;
}());
exports.PagoTbkComponent = PagoTbkComponent;
//# sourceMappingURL=pagotbk.component.js.map