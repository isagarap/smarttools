import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'bannerPipe'
})
export class BannerPipe implements PipeTransform {
    transform(items: Array<any>, Codigo: number): Array<any> {
        return items.filter(item => item.IdTipoBanner === Codigo);
    }
}