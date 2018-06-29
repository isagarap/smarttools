import { Injectable } from '@angular/core';

declare var $: any;

@Injectable()
export class NotifyService {

    success(message: string) {
        $.notify({
            icon: 'glyphicon glyphicon-ok',
            message: "  " + message
        }, {
            type: 'success'
        });
    }

    danger(message: string) {
        $.notify({
            icon: 'glyphicon glyphicon-remove',
            message: "  " + message
        }, {
            type: 'danger'
        });
    }

    warning(message: string) {
        $.notify({
            icon: 'glyphicon glyphicon-exclamation-sign',
            message: "  " + message
        }, {
            type: 'warning'
        });
    }

}
