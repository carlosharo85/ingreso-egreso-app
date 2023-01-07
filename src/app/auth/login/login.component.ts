import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from './../../shared/ui.actions';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    loginForm!: FormGroup;
    cargando: boolean = false;
    uiSubscription!: Subscription;


    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private store: Store<AppState>
    ) { }


    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.uiSubscription = this.store.select('ui').subscribe(ui => {
            this.cargando = ui.isLoading;
        });
    }


    ngOnDestroy(): void {
        this.uiSubscription.unsubscribe();
    }


    loginUsuario(): void {
        if (this.loginForm.invalid) { return; }


        this.store.dispatch(ui.isLoading());

        const { email, password } = this.loginForm.value;
        
        this.authService.loginUsuario(email, password
        ).then(() => {
            this.store.dispatch(ui.stopLoading());
            this.router.navigate(['/']);
        }).catch(error => {
            this.store.dispatch(ui.stopLoading());
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            });
        });
    }

}
