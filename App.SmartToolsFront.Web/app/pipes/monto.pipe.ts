import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from "@angular/common";

@Pipe({
    name: 'monto'
})
export class MontoPipe extends DecimalPipe {

    transform(value: any, digits?: string): string {
        return super.transform(value, digits).replace(',', '.');
    }

}
