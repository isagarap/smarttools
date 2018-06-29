import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegistraLumioService {

    private actionUrl: string;
    private headers: Headers;
    private options: RequestOptions;

    constructor(private _http: Http, private _configuration: Configuration) {
        this.actionUrl = _configuration.ServerWithApiUrl + 'RegistroLumio/';
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    save(model: any) {
        let body = JSON.stringify(model);
        return this._http.post(this.actionUrl, body, this.options)
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
