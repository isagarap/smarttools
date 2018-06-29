import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductosService {

    private actionUrl: string;
    private headers: Headers;
    private options: RequestOptions;

    constructor(private _http: Http, private _configuration: Configuration) {
        this.actionUrl = _configuration.ServerWithApiUrl + 'productos/';
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    getProductos() {

        return this._http.get(this.actionUrl)
            .map(res =>
                res.json()
            ).catch(
            this.handleError
            );
    }

    getProductosOneImage(vm: any) {

        let body = JSON.stringify(vm);
        return this._http.post(this.actionUrl + 'getAllOneImage', body, this.options)
            .map(res =>
                res.json()
            ).catch(
            this.handleError
            );
    }

    getProducto(cod: string) {

        return this._http.get(this.actionUrl + cod)
            .map(res =>
                res.json()
            ).catch(this.handleError);
    }

    getProductoByCodigo(cod: string) {

        return this._http.get(this.actionUrl + 'getProductoByCodigo/' + cod)
            .map(res =>
                res.json()
            ).catch(this.handleError);
    }

    getImagesFromProduct(cod: string) {

        return this._http.get(this.actionUrl + 'getImagesFromProduct/' + cod)
            .map(res =>
                res.json()
            ).catch(this.handleError);
    }

    getProductsFromSearchWithFilters(filters: any) {
        let body = JSON.stringify(filters);
        return this._http.post(this.actionUrl + 'getProductsFromSearchWithFilter', filters, this.options)
            .map(res =>
                res.json()
            ).catch(
            this.handleError
            );
    }

    getProductoForDetalleByCodigo(vm: any) {
        let body = JSON.stringify(vm);
        return this._http.post(this.actionUrl + 'getProductoForDetalleByCodigo', body, this.options)
            .map(res =>
                res.json()
            ).catch(
            this.handleError
            );
    }

    getStockProducto(cod: string) {

        return this._http.get(this.actionUrl + 'getStockFromProducto/' + cod)
            .map(res =>
                res.json()
            ).catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
