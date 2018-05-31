import { Injectable } from '@angular/core';
//FIREBASE
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthServicioProvider {

  private user: firebase.User;

  constructor(public afAuth:AngularFireAuth) {
    console.log('Hello AuthServicioProvider Provider');
      afAuth.authState.subscribe(user => {
  			this.user = user;
  		});
  }

  signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
	}

  signUp(credentials) {
	return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

}
