import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'categoriamenupipe'
})
export class CategoriaMenuPipe implements PipeTransform {
    transform(items: Array<any>, CodGrupo: number): Array<any> {
        return items.filter(item => item.Cantidad === CodGrupo);
    }
}