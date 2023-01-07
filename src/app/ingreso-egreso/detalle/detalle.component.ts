import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit, OnDestroy {


    arrayIngresosEgresos: IngresoEgreso[] = [];
    ingresosEgresosSubscription!: Subscription;


    constructor(
        private store: Store<AppState>,
        private ingresoEgresoService: IngresoEgresoService
    ) { }


    ngOnInit(): void {
        this.ingresosEgresosSubscription = this.store.select('ingresosEgresos')
        .subscribe(({ items }) => {
            this.arrayIngresosEgresos = items;
        });
    }


    ngOnDestroy(): void {
        this.ingresosEgresosSubscription.unsubscribe();
    }


    borrar(uid: string): void {
        this.ingresoEgresoService.borrarIngresoEgreso(uid)
        .then(() => {
            Swal.fire('Borrado!', 'Item borrado', 'success');
        }).catch( err => {
            Swal.fire('Error!', err.message, 'error');
        });
    }

}
