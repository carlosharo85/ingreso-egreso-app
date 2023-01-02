import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    loginUsuario(): void {
        if (this.loginForm.invalid) { return; }

        
        Swal.fire({
            title: 'Espere por favor',
            didOpen: () => {
                Swal.showLoading(null);
            }
        });


        const { email, password } = this.loginForm.value;
        
        this.authService.loginUsuario(email, password
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
