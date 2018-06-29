import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClienteService {

    private actionUrl: string;
    private headers: Headers;
    private options: RequestOptions;

    constructor(private _http: Http, private _configuration: Configuration) {
        this.actionUrl = _configuration.ServerWithApiUrl + 'cliente/';
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    getCliente(email: string) {

        return this._http.get(this.actionUrl + email)
            .map(res =>
                res.json()
            ).catch(
            this.handleError
            );
    }

    saveCliente(model: any) {
        let body = JSON.stringify(model);
        return this._http.post(this.actionUrl, body, this.options)
            .map(res =>
                res.json()
            ).catch(
            this.handleError
            );
    }

    getClienteLogin(cliente: any) {
        let body = JSON.stringify(cliente);
        return this._http.post(this.actionUrl + 'getClienteLogin', body, this.options)
            .map(res =>
                res.json()
            ).catch(
            this.handleError
            );
    }

    getProductosCarrito(model: any) {
        let body = JSON.stringify(model);
        return this._http.post(this._configuration.ApiUrl + 'clienteproductos/getProductos', body, this.options)
            .map(res =>
                res.json()
            ).catch(
            this.handleError
            );
    }

    getClientByEmail(model: any) {
        let body = JSON.stringify(model);
        return this._http.post(this.actionUrl + 'getClientByEmail', body, this.options)
            .map(res =>
                res.json()
            ).catch(
            this.handleError
            );
    }

    getClientByRut(model: any) {
        let body = JSON.stringify(model);
        return this._http.post(this.actionUrl + 'getClientByRut', body, this.options)
            .map(res =>
                res.json()
            ).catch(
            this.handleError
            );
    }

    getClientFromSoftland(model: any) {
        let body = JSON.stringify(model);
        return this._http.post(this.actionUrl + 'getClientFromSoftland', body, this.options)
            .map(res =>
                res.json()
            ).catch(
            this.handleError
            );
    }

    updatePassword(model: any) {
        let body = JSON.stringify(model);
        return this._http.post(this.actionUrl + 'updatePassword', body, this.options)
            .map(res =>
                res.json()
            ).catch(
            this.handleError
            );
    }

    getClienteComprasFromSoftland(model: any) {
        let body = JSON.stringify(model);
        return this._http.post(this.actionUrl + 'getClienteComprasFromSoftland', body, this.options)
            .map(res =>
                res.json()
            ).catch(
            this.handleError
            );
    }

    getClienteEstadoComprasFromSoftland(model: any) {
        let body = JSON.stringify(model);
        return this._http.post(this.actionUrl + 'getClienteEstadoComprasFromSoftland', body, this.options)
            .map(res =>
                res.json()
            ).catch(
            this.handleError
            );
    }

    getTemporalPasswordToUpdate(model: any) {
        let body = JSON.stringify(model);
        return this._http.post(this.actionUrl + 'getTemporalPasswordToUpdate', body, this.options)
            .map(res =>
                res.json()
            ).catch(
            this.handleError
            );
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
