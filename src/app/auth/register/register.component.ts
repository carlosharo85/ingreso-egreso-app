import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from './../../shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

    formGroup!: FormGroup;
    cargando: boolean = false;
    uiSubscription!: Subscription;


    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private store: Store<AppState>
    ) { }


    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            nombre: ['', Validators.required],
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


    crearUsuario(): void {
        if (this.formGroup.invalid) { return; }


        /*Swal.fire({
            title: 'Espere por favor',
            didOpen: () => {
                Swal.showLoading(null);
            }
        });*/
        this.store.dispatch(ui.isLoading());


        const { nombre, email, password } = this.formGroup.value;
        
        this.authService.crearUsuario(nombre, email, password
        ).then(credenciales => {
            //Swal.close();
            console.log(credenciales);
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
