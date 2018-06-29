import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UbicacionService {

    private actionUrl: string;
    private headers: Headers;
    private options: RequestOptions;

    constructor(private _http: Http, private _configuration: Configuration) {
        this.actionUrl = _configuration.ServerWithApiUrl + 'ubicacion/';
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    getAllRegiones() {
        return this._http.get(this.actionUrl + 'getRegiones')
            .map(res =>
                res.json()
            ).catch(
            this.handleError
            );
    }

    getAllCiudades() {
        return this._http.get(this.actionUrl + 'getCiudades')
            .map(res =>
                res.json()
            ).catch(
            this.handleError
            );
    }

    getAllComunas() {
        return this._http.get(this.actionUrl + 'getComunas')
            .map(res =>
                res.json()
            ).catch(
            this.handleError
            );
    }

    getUbicacion(cliente: any) {
        let body = JSON.stringify(cliente);
        return this._http.post(this.actionUrl + 'getUbicacion', body, this.options)
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
