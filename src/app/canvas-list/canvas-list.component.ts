import { Component, OnInit } from '@angular/core';
import {CanvasCrudService} from "../services/canvas-crud.service";
import {Drawing} from "../services/drawing";

@Component({
  selector: 'app-canvas-list',
  templateUrl: './canvas-list.component.html',
  styleUrls: ['./canvas-list.component.css']
})
export class CanvasListComponent implements OnInit {
  displayedColumns: string[] = ['drawingName','action'];
  drawings: Drawing[]=[];

  constructor(private cs:CanvasCrudService) { }

  async ngOnInit() {
    this.drawings =await this.cs.getCanvasDrawings()
    // console.log( this.drawings )
  }
 async deleteDrawings(id:string) {
    await this.cs.deleteDrawing(id).then(r=>console.log(r))
   this.drawings=this.drawings.filter(drawing=>drawing.id!==id)
    return;
  }
}
