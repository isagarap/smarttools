import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class CarritoService {

    public newProductSubject = new Subject<any>();
    public cleanProductSubject = new Subject<any>();
    public userLogin = new Subject<any>();

    constructor() { }

    addProduct(data: any) {
        this.newProductSubject.next(data);
    }

    setUserLogin(data: any) {
        this.userLogin.next(data);
    }

    cleanProduct(data: any) {
        this.cleanProductSubject.next(data);
    }

}
