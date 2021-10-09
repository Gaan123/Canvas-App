import { Injectable, NgZone } from '@angular/core';
import { User } from "./user";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import auth = firebase.auth;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    private route: ActivatedRoute,
    public ngZone: NgZone// Inject Firebase auth service
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(<string>localStorage.getItem('user'));
      } else {
        // @ts-ignore
        localStorage.setItem('user', null);
        JSON.parse(<string>localStorage.getItem('user'));
      }
    })
  }






  // Returns true when user is looged in and email is verified
  static isLoggedIn(): boolean {
    const user = JSON.parse(<string>localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }
  getUser() {
    const user = JSON.parse(<string>localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? user : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider:any) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['canvas'],{relativeTo:this.route});
          window.location.reload();
        })
        this.SetUserData(result.user).then(r => console.log(r));
      }).catch((error) => {
        window.alert(error)
      })
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: firebase.User | null) {
    // @ts-ignore
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);



    const userData: User = {
      // @ts-ignore
      uid: user.uid,
      // @ts-ignore
      email: user.email,
      // @ts-ignore
      displayName: user.displayName,
      // @ts-ignore
      photoURL: user.photoURL,
      // @ts-ignore
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

}
