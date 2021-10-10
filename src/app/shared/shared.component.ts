import { Component, OnInit } from '@angular/core';
import {CanvasCrudService} from "../services/canvas-crud.service";
import {Drawing} from "../services/drawing";

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {
  drawings: any;
  displayedColumns: string[] = ['drawingName','action'];
  constructor(private cs:CanvasCrudService) { }

  async ngOnInit() {
    this.drawings =await this.cs.getShared()
  }

}
