import { Component } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  items: Observable<any[]>;
  constructor(firestore: AngularFirestore,public auth: AuthService) {
    this.items = firestore.collection('items').valueChanges();
  }
  logout(e) {
    e.preventDefault();
    this.auth.SignOut();
  }
}
