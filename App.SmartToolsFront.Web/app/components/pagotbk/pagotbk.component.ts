import { Component, OnInit, SecurityContext } from '@angular/core';
import { Configuration } from '../../app.constants';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-pagotbk',
    templateUrl: './pagotbk.component.html'
})
export class PagoTbkComponent implements OnInit {

    iframeUrl: any;
    amount: number = 990;

    constructor(private configuration: Configuration, private domSanitizer: DomSanitizer) {
        //localStorage.setItem('amount', '990');
        //let url = this.domSanitizer.bypassSecurityTrustUrl(this.configuration.IframeTbkUrl);
        this.iframeUrl = this.configuration.IframeTbkUrl;        
    }

    ngOnInit() {

    }

    getFrmaeUrl() {
        let url = this.domSanitizer.sanitize(SecurityContext.HTML, this.iframeUrl);
        return url;
    }

}
