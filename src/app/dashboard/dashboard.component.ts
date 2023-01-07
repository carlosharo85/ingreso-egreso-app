import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    userSubscription!: Subscription;
    ingresoEgresoSubscription!: Subscription;


    constructor(
        private store: Store<AppState>,
        private ingresoEgresoService: IngresoEgresoService
    ) { }


    ngOnInit(): void {
        this.userSubscription = this.store.select('user')
        .pipe(
            filter( auth => auth.user != null)
        ).subscribe(({ user }) => {
            this.ingresoEgresoSubscription = this.ingresoEgresoService.initIngresoEgresoListener(user.uid)
            .subscribe( ingresosEgresosFirebase => {
                this.store.dispatch(ingresoEgresoActions.setItems({ items: ingresosEgresosFirebase }));
            });
        });
    }


    ngOnDestroy(): void {
        this.ingresoEgresoSubscription.unsubscribe();
        this.userSubscription.unsubscribe();
    }

}
