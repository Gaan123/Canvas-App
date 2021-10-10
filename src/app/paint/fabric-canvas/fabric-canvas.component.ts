import {AfterContentInit, AfterViewInit, Component, EventEmitter, Input, NgZone, Output} from '@angular/core';
import { fabric } from 'fabric';
import { EventHandlerService } from '../event-handler.service';
import { CustomFabricObject } from '../models';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService} from "../../services/auth.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {CanvasCrudService} from "../../services/canvas-crud.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShareComponent} from "../../share/share.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-fabric-canvas',
  templateUrl: './fabric-canvas.component.html',
  styleUrls: ['./fabric-canvas.component.scss'],
})
export class FabricCanvasComponent implements AfterContentInit, AfterViewInit {
  canvas: fabric.Canvas;
  private id:string=null;
  canvasId:string=null;
  private canvasName;
  @Input() set imageDataURL(v: string) {
    if (v) {
      this.eventHandler.imageDataUrl = v;
    }
  }
  @Input() set drawingName(v: string) {
    if (v) {
      this.eventHandler.canvasName = v;
    }
  }


  constructor(
            private eventHandler: EventHandlerService,
              private ngZone: NgZone,
              private firestore: AngularFirestore,
              private db: AngularFireDatabase,
              private cs: CanvasCrudService,
              private _route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              public dialog: MatDialog) {}

  ngAfterContentInit() {
    this.ngZone.runOutsideAngular(() => {
      if (this.eventHandler.canvas) {
        this.eventHandler.canvas.dispose();
      }
      this.canvas = new fabric.Canvas('canvas', {
        selection: false,
        preserveObjectStacking: true,
      });
      this.eventHandler.canvas = this.canvas;

      const id= this._route.snapshot.paramMap.get('id')
      if (id){
        this.canvasId=id;
        // console.log(this.canvasId)
        this.cs.getDrawing(id).then(res=>{
          console.log(res.userId,this.authService.getUser().uid)
          this.eventHandler.belongsTo = res.userId === this.authService.getUser().uid;
          this.canvasName=res.name;
          this.setCanvasName(res.name)
          this.canvas.loadFromJSON(res.data, ()=> {
            this.canvas.renderAll();
          });

        });
      }
      this.eventHandler.extendToObjectWithId();
      fabric.Object.prototype.objectCaching = false;
      this.addEventListeners();
    });
  }
  @Output() nameEvent=new EventEmitter<string>();
  setCanvasName(value){
    this.nameEvent.emit(value)
  }

  ngAfterViewInit() {
    this.eventHandler.addBGImageSrcToCanvas();
  }

  private addEventListeners() {
    this.canvas.on('mouse:down', e => this.ngZone.run(() => this.onCanvasMouseDown(e)));
    this.canvas.on('mouse:move', e => this.ngZone.run(() => this.onCanvasMouseMove(e)));
    this.canvas.on('mouse:up', () => this.ngZone.run(() => this.onCanvasMouseUp()));
    this.canvas.on('selection:created', e => this.ngZone.run(() => this.onSelectionCreated(e as any)));
    this.canvas.on('selection:updated', e => this.ngZone.run(() => this.onSelectionUpdated(e as any)));
    this.canvas.on('object:moving', e => this.ngZone.run(() => this.onObjectMoving(e as any)));
    this.canvas.on('object:scaling', e => this.ngZone.run(() => this.onObjectScaling(e as any)));
  }

  private onCanvasMouseDown(event: { e: Event }) {
    this.eventHandler.mouseDown(event.e);
    this.avoidDragAndClickEventsOfOtherUILibs(event.e);
  }
  private onCanvasMouseMove(event: { e: Event }) {
    this.eventHandler.mouseMove(event.e);
  }
  private onCanvasMouseUp() {
    console.log(this.eventHandler.belongsTo)
    if (this.eventHandler.belongsTo){
      const data={
        data:JSON.stringify(this.canvas.toJSON()),
        userId:this.authService.getUser().uid,
        name:this.eventHandler.canvasName==undefined?"No Title":this.eventHandler.canvasName
      }
      this.canvasName = data.name

      // ;
      const id=this._route.snapshot.paramMap.get('id');
      // console.log(this.cs.getCanvasDrawings())
      this.canvasId = id
      this.eventHandler.mouseUp();
      if (id){
        this.cs.updateDrawing(data,id)
      }else if (this.id){
        this.cs.updateDrawing(data,this.id)
      }else{
        this.cs.storeDrawing(data).then(id=>this.id=id);
      }
    }
  }

  private onSelectionCreated(e: { target: CustomFabricObject }) {
    this.eventHandler.objectSelected(e.target);
  }
  private onSelectionUpdated(e: { target: CustomFabricObject }) {
    this.eventHandler.objectSelected(e.target);
  }
  private onObjectMoving(e: any) {
    this.eventHandler.objectMoving(e.target.id, e.target.type, e.target.left, e.target.top);
  }
  private onObjectScaling(e: any) {
    this.eventHandler.objectScaling(
      e.target.id,
      e.target.type,
      { x: e.target.scaleX, y: e.target.scaleY },
      { left: e.target.left, top: e.target.top },
    );
  }

  private avoidDragAndClickEventsOfOtherUILibs(e: Event) {
    e.stopPropagation();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ShareComponent, {
      width: '250px',
      data: {canvasName:this.canvasName,canvasId:this.canvasId,}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
