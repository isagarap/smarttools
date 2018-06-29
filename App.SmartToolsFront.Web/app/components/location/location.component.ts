import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html'
})
export class LocationComponent implements OnInit {

    positions: any = [{ lat: -39.815807, lng: -73.248269 }];

    constructor() { }

    ngOnInit() {
    }

}
