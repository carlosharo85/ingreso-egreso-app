import { Injectable } from '@angular/core';
import { map, Subscription } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';

import { Usuario } from '../models/usuario.model';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    userSubscription!: Subscription;
    private _usuario!: Usuario;


    constructor(
        public auth: AngularFireAuth,
        private firestore: AngularFirestore,
        private store: Store<AppState>
    ) { }


    initAuthListener() {
        this.auth.authState.subscribe( firebaseUser => {
            if (firebaseUser) {
                this.userSubscription = this.firestore.doc(`${firebaseUser.uid}/usuario`).valueChanges().subscribe( (firestoreUser: any) => {
                    const usuario = Usuario.fromFirebase(firestoreUser);
                    this._usuario = usuario;
                    this.store.dispatch(authActions.setUser({ user: this._usuario }));
                });
            }
            else {
                this._usuario = new Usuario('-1', '', '');
                if (this.userSubscription) {
                    this.userSubscription.unsubscribe();
                }
                this.store.dispatch(authActions.unSetUser());
                this.store.dispatch(ingresoEgresoActions.unSetItems());
            }
        });
    }


    get usuario() {
        return this._usuario;
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
