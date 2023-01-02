import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    formGroup!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            nombre: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    crearUsuario(): void {
        if (this.formGroup.invalid) { return; }


        Swal.fire({
            title: 'Espere por favor',
            didOpen: () => {
                Swal.showLoading(null);
            }
        });


        const { nombre, email, password } = this.formGroup.value;
        
        this.authService.crearUsuario(nombre, email, password
        ).then(credenciales => {
            Swal.close();
            console.log(credenciales);
            this.router.navigate(['/']);
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            });
        });
    }

}
