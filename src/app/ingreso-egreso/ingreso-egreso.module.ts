import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';

// Pipes
import { OrdenIngresoEgresoPipe } from '../pipes/orden-ingreso-egreso.pipe';

// Graficas
import { NgChartsModule } from 'ng2-charts';

// NgRx
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';


@NgModule({
    declarations: [
        DashboardComponent,
        IngresoEgresoComponent,
        EstadisticaComponent,
        DetalleComponent,
        OrdenIngresoEgresoPipe
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NgChartsModule,
        SharedModule,
        DashboardRoutesModule,
        StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer)
    ]
})
export class IngresoEgresoModule { }
