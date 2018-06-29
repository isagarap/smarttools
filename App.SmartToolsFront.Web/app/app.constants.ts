import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server: string = window.location.origin;
    public ApiUrl: string = 'api/';
    public ServerWithApiUrl = this.Server + '/' + this.ApiUrl;
    public IframeTbkUrl = this.Server + '/' + 'tbk/pagotbk';

    formateaRut(rut: string) {
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
    }

    createTableProducts(products: any) {

        let rows = '';
        for (let i = 0; i <= products.length - 1; i++) {

            let precio = this.numberWithCommas(products[i].Precio);

            rows = rows + '  <tr> ' +
                          '    <td>;' + products[i].CodProducto + ';</td> ' +
                          '    <td>' + products[i].Cantidad  + '</td> ' +
                          '    <td>$' + precio  + '</td> ' +
                          '  </tr> ';
        }

        let table = '<table> ' +
                    '  <tr> ' +
                    '    <th>Producto</th> ' +
                    '    <th>Cantidad</th> ' +
                    '    <th>Precio</th> ' +
                    '  </tr> ' +
                       rows +
                    '</table> ';

        return table;
        
    }

    numberWithCommas(x: any) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

}