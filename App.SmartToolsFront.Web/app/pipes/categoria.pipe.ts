import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'categoriapipe'
})
export class CategoriaPipe implements PipeTransform {
    transform(items: Array<any>, CodGrupo: number): Array<any> {
        return items.filter(item => item.CodCategoria === CodGrupo);
    }
}