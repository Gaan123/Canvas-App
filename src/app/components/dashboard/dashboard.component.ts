import { Component, OnInit } from '@angular/core';
import {fabric} from "fabric";
import {FabricService} from "../../services/fabric.service";
import {POINT} from "../../services/points";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  protected _canvas?: fabric.Canvas;
  private boundBox: fabric.Rect | undefined;
  private shape: fabric.Rect | undefined;
  private line: fabric.Line | undefined;
  protected _mouseUp: ((evt: fabric.IEvent) => void) ;
  private _points: POINT[];

  constructor(protected _fabricService: FabricService) {

    this._points    = new Array<POINT>();
    this._mouseUp = (evt: fabric.IEvent) => this.__onMouseUp(evt);
  }

  ngOnInit(): void {

    this._canvas=new fabric.Canvas('fabricSurface',{
      backgroundColor: '#ebebef',
      isDrawingMode: true,
    });

    this._fabricService.canvas = this._canvas;

    this._canvas.on('mouse:up', this._mouseUp);

  }
  protected __onMouseUp(evt: fabric.IEvent): void
  {
    let ctx=this._canvas?.getContext();
    ctx!.lineWidth=12;
  console.log(ctx)
   /* if (evt.pointer)
    {
      const p: POINT = {x: evt.pointer.x, y: evt.pointer.y};
      this._points.push(p);

      this._fabricService.addPoint(p);

      let hull: Array<POINT>;

      // update hull and drawing
      if (this._points.length > 2)
      {
        // hull = grahamScan(this._points);

        this._fabricService.strokeColor = 'black';

      }
    }*/
  }
}
