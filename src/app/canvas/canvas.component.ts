import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {CanvasCrudService} from "../services/canvas-crud.service";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  drawingName='';
  canvasData='sd';
  imageDataURL = 'assets/background.jpeg';
  public myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private cs: CanvasCrudService,
  ) { }

  ngOnInit(): void {
    this.myForm=this.fb.group({
      drawingName:''
    })
    this.myForm.valueChanges .pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(e=>{
      console.log(e.drawingName)
      this.drawingName=e.drawingName
    })


  }
  receiveCanvasName(name){
    this.myForm.patchValue({
      drawingName:name
    })
  }


}
