import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

    positions: any = [{ lat: -39.815807, lng: -73.248269 }];

    constructor() { }

    ngOnInit() {
    }

}
