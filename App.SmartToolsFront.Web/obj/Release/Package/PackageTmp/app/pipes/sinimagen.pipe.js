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
var platform_browser_1 = require("@angular/platform-browser");
var SinImagenPipe = /** @class */ (function () {
    function SinImagenPipe(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    SinImagenPipe.prototype.transform = function (value, args) {
        //if (!value) {
        //    return "images/noimage.png";
        //}
        //return (value.length > 0) ? value[1].url : "images/noimage.png";
        if (value.length == 0) {
            return "images/noimage.png";
        }
        else {
            return this.cleanURL(value);
            //return this.domSanitizer.bypassSecurityTrustHtml(value);
        }
    };
    SinImagenPipe.prototype.cleanURL = function (oldURL) {
        return this.domSanitizer.bypassSecurityTrustUrl(oldURL);
    };
    SinImagenPipe = __decorate([
        core_1.Pipe({
            name: 'sinimagen'
        }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
    ], SinImagenPipe);
    return SinImagenPipe;
}());
exports.SinImagenPipe = SinImagenPipe;
//# sourceMappingURL=sinimagen.pipe.js.map