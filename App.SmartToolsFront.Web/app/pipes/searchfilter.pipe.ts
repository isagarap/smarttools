import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchfilter'
})
export class SearchFilterPipe implements PipeTransform {
    transform(items: Array<any>, pagina: number): Array<any> {
        return items.filter(item => item.Pagina === pagina);
    }
}