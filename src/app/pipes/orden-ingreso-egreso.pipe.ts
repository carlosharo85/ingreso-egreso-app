import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
    name: 'ordenIngresoEgreso'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

    transform( items: IngresoEgreso[] ): IngresoEgreso[] {
        let _items = [...items];// se hace una copia del arreglo; ya que se maneja por state y el sort edita el arreglo; un objeto de state debe ser inmutable

        return _items.sort( (a, b) => {
            if (a.tipo === 'ingreso') {
                return -1;
            } else {
                return 1;
            }
        });
    }

}
