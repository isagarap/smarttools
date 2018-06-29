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
var http_1 = require("@angular/http");
var app_constants_1 = require("../app.constants");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var Observable_1 = require("rxjs/Observable");
var BannersService = /** @class */ (function () {
    function BannersService(_http, _configuration) {
        this._http = _http;
        this._configuration = _configuration;
        this.actionUrl = _configuration.ServerWithApiUrl + 'banners/';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    BannersService.prototype.getAll = function () {
        return this._http.get(this.actionUrl)
            .map(function (res) {
            return res.json();
        }).catch(this.handleError);
    };
    BannersService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    BannersService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, app_constants_1.Configuration])
    ], BannersService);
    return BannersService;
}());
exports.BannersService = BannersService;
//# sourceMappingURL=banners.service.js.map