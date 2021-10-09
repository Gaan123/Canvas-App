import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService} from "./auth.service";
import {Drawing} from "./drawing";



@Injectable({
  providedIn: 'root'
})
export class CanvasCrudService {
  drawings:object=[];
  constructor(private authService: AuthService,private firestore:AngularFirestore) { }

  getCanvasDrawings(){
    let a=[];

    return new Promise<any>((resolve, reject) =>{
      this.firestore
        .collection('drawings',ref => {
          return ref.where('userId','==',this.authService.getUser().uid);
        }).valueChanges({idField:'id'})
        .subscribe(val=> {

          // console.log(this.drawings,'1s')
          resolve(val);
          return val;
        });
    });

  }
  getDrawing(id){

    return new Promise<any>((resolve, reject) =>{
      this.firestore
        .collection("drawings")
        .doc(id)
      this.firestore
        .collection("drawings")
        .doc(id).valueChanges()
        .subscribe(data =>{
          resolve(data);
          return data;
        })
    });
  }
  storeDrawing(drawing:Drawing){
    return new Promise<any>((resolve, reject) =>{
      this.firestore
        .collection("drawings")
        .add(drawing)
        .then(res => {
          resolve(res.id);
          return res.id;
        }, err => reject(err));
    });
  }
  updateDrawing(data: Drawing, id) {
    console.log(id)
    return this.firestore
      .collection("drawings")
      .doc(id)
      .update(data);
  }
  deleteDrawing(id: string){
    return this.firestore
      .collection("drawings")
      .doc(id)
      .delete().then(r=>console.log(r)).catch(e=>console.error(e))
  }

}
