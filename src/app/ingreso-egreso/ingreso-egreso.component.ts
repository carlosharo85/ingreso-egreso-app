import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as uiActions from '../shared/ui.actions';

@Component({
    selector: 'app-ingreso-egreso',
    templateUrl: './ingreso-egreso.component.html',
    styleUrls: ['./ingreso-egreso.component.scss']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

    ingresoForm!: FormGroup;
    tipo: string =  'ingreso';
    cargando: boolean = false;
    loadingSubscription!: Subscription;


    constructor(
        private formBuild: FormBuilder,
        private ingresoEgresoService: IngresoEgresoService,
        private store: Store<AppState>
    ) {}


    ngOnInit(): void {
        this.ingresoForm = this.formBuild.group({
            descripcion: ['', Validators.required],
            monto: ['', Validators.required]
        });

        this.loadingSubscription = this.store.select('ui').subscribe( ui => {
            this.cargando = ui.isLoading;
        })
    }


    ngOnDestroy(): void {
        this.loadingSubscription.unsubscribe();
    }


    guardar(): void {
        if (this.ingresoForm.invalid) { return; }

        this.store.dispatch(uiActions.isLoading());
        const { descripcion, monto } = this.ingresoForm.value;
        const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

        this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then( () => {
            this.ingresoForm.reset();
            this.store.dispatch(uiActions.stopLoading());
            Swal.fire('Registro Creado!', descripcion, 'success');
        }).catch( err => {
            this.store.dispatch(uiActions.stopLoading());
            Swal.fire('Error', err.message, 'error');
        });
    }

}
