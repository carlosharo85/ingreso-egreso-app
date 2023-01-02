import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        public auth: AngularFireAuth,
        private firestore: AngularFirestore
    ) { }


    initAuthListener() {
        this.auth.authState.subscribe( firebaseUser => {
            console.log(firebaseUser);
        });
    }


    crearUsuario(nombre: string, email: string, password: string) {
        return this.auth.createUserWithEmailAndPassword(email, password).then(firebaseUser => {
            const newUser = new Usuario(firebaseUser.user!.uid, nombre, email);
            return this.firestore.doc(`${firebaseUser.user!.uid}/usuario`).set({...newUser});
        });
    }


    loginUsuario(email: string, password: string) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }


    logout() {
        return this.auth.signOut();
    }


    isAuth() {
        return this.auth.authState.pipe(
            map(firebaseUser => firebaseUser != null )
        );
    }
}
