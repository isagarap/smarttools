import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VentaService {

    private actionUrl: string;
    private headers: Headers;
    private options: RequestOptions;

    constructor(private _http: Http, private _configuration: Configuration) {
        this.actionUrl = _configuration.ServerWithApiUrl + 'venta/';
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    getAll() {

        return this._http.get(this.actionUrl)
            .map(res =>
                res.json()
            ).catch(
            this.handleError
            );
    }

    save(data: any) {
        let body = JSON.stringify(data);
        return this._http.post(this.actionUrl, body, this.options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    generaNotaVenta(IdVenta: number) {

        return this._http.get(this.actionUrl + 'generaNotaVenta/' + IdVenta)
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
