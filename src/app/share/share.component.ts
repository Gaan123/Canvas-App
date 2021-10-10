import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from 'rxjs/operators';

import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {CanvasCrudService} from "../services/canvas-crud.service";
import {EventHandlerService} from "../paint/event-handler.service";

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredUser: Observable<string[]>;
  users: string[] = [];
  allUsers: string[] = [];
  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;
  @Input() set canvasId(v: string) {
    console.log(v)
    if (v) {

    }
  }
  constructor(
    public dialogRef: MatDialogRef<ShareComponent>,
    private cs : CanvasCrudService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.filteredUser = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => user ? this._filter(user) : this.allUsers.slice()));
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our user
    if (value) {
      this.users.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.userCtrl.setValue(null);
  }

  remove(user: string): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.users.push(event.option.viewValue);
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allUsers.filter(user => user.toLowerCase().includes(filterValue));
  }
  ngOnInit(): void {
    this.cs.getUsers().then(res=>this.allUsers=res.map(u=>u.email));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  share(): void {
    const data=this.users.map(userId=>({
      userId,
      canvasName:this.data.canvasName,
      canvasId:this.data.canvasId,
    }))
    data.forEach(share=>{
      this.cs.storeSharing(share)
    })

    this.dialogRef.close();
  }
}
