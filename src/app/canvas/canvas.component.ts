import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {CanvasCrudService} from "../services/canvas-crud.service";
import { EventHandlerService } from '../paint/event-handler.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  drawingName='';
  canvasBelongsTo:boolean;
  canvasData='sd';
  imageDataURL = 'assets/background.jpeg';
  public myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private eventHandler: EventHandlerService
  ) { }

  ngOnInit(): void {
    this.myForm=this.fb.group({
      drawingName:''
    })
    this.myForm.valueChanges .pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(e=>{
      this.drawingName=e.drawingName
    })


  }

  receiveCanvasName(name){
    this.canvasBelongsTo=this.eventHandler.belongsTo;
    this.myForm.patchValue({
      drawingName:name
    })
  }


}
