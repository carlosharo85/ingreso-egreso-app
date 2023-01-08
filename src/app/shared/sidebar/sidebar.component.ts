import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

    nombre: string = '';
    usuarioSubscription!: Subscription;


    constructor(
        private autService: AuthService,
        private router: Router,
        private store: Store<AppState>
    ) { }


    ngOnInit(): void {
        this.usuarioSubscription = this.store.select('user')
        .pipe(
            filter(auth => auth.user != null)
        ).subscribe(({ user }) => {
            this.nombre = user.nombre;
        });
    }


    ngOnDestroy(): void {
        this.usuarioSubscription.unsubscribe();
    }


    logout() {
        this.autService.logout().then(() => {
            this.router.navigate(['/login']);
        });
    }

}
