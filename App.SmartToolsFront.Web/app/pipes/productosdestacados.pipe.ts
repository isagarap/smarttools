import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'productosDestacados'
})
export class ProductosDestacadosPipe implements PipeTransform {
    transform(items: Array<any>, Codigo: string): Array<any> {
        return items.filter(item => item.ProductoDestacado === Codigo);
    }
}