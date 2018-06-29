"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Configuration = /** @class */ (function () {
    function Configuration() {
        this.Server = window.location.origin;
        this.ApiUrl = 'api/';
        this.ServerWithApiUrl = this.Server + '/' + this.ApiUrl;
        this.IframeTbkUrl = this.Server + '/' + 'tbk/pagotbk';
    }
    Configuration.prototype.formateaRut = function (rut) {
        var actual = rut.replace(/^0+/, "");
        if (actual != '' && actual.length > 1) {
            var sinPuntos = actual.replace(/\./g, "");
            var actualLimpio = sinPuntos.replace(/-/g, "");
            var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
            var rutPuntos = "";
            var i = 0;
            var j = 1;
            for (i = inicio.length - 1; i >= 0; i--) {
                var letra = inicio.charAt(i);
                rutPuntos = letra + rutPuntos;
                if (j % 3 == 0 && j <= inicio.length - 1) {
                    rutPuntos = "." + rutPuntos;
                }
                j++;
            }
            var dv = actualLimpio.substring(actualLimpio.length - 1);
            rutPuntos = rutPuntos + "-" + dv;
        }
        return rutPuntos;
    };
    Configuration.prototype.createTableProducts = function (products) {
        var rows = '';
        for (var i = 0; i <= products.length - 1; i++) {
            var precio = this.numberWithCommas(products[i].Precio);
            rows = rows + '  <tr> ' +
                '    <td>;' + products[i].CodProducto + ';</td> ' +
                '    <td>' + products[i].Cantidad + '</td> ' +
                '    <td>$' + precio + '</td> ' +
                '  </tr> ';
        }
        var table = '<table> ' +
            '  <tr> ' +
            '    <th>Producto</th> ' +
            '    <th>Cantidad</th> ' +
            '    <th>Precio</th> ' +
            '  </tr> ' +
            rows +
            '</table> ';
        return table;
    };
    Configuration.prototype.numberWithCommas = function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    Configuration = __decorate([
        core_1.Injectable()
    ], Configuration);
    return Configuration;
}());
exports.Configuration = Configuration;
//# sourceMappingURL=app.constants.js.map