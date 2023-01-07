import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

    nombre: string = '';
    usuarioSubscription!: Subscription;


    constructor(
        private store: Store<AppState>
    ) { }


    ngOnInit(): void {
        this.usuarioSubscription = this.store.select('user')
        .subscribe(({ user }) => {
            this.nombre = user.nombre;
        });
    }


    ngOnDestroy(): void {
        this.usuarioSubscription.unsubscribe();
    }

}
