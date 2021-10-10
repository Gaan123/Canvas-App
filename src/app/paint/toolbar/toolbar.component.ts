import { Component } from '@angular/core';
import { EventHandlerService } from '../event-handler.service';
import { DrawingTools } from '../models';
import {MatDialog} from "@angular/material/dialog";
import {ShareComponent} from "../../share/share.component";

@Component({
  selector: 'app-graphical-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class GraphicalToolbarComponent {
  DrawingTools = DrawingTools;
  selected = this.fabricService.selectedTool;
  public pickerDisplay: boolean =false;
  canvasBelongsTo: boolean;
  constructor(private fabricService: EventHandlerService) {}

  async select(tool: DrawingTools) {
    this.fabricService.selectedTool = tool;
    this.selected = this.fabricService.selectedTool;
  }
  ngOnInit(){
    setTimeout( ()=> {
     this.canvasBelongsTo= this.fabricService.belongsTo;
     console.log(this.canvasBelongsTo)
    },2000)
  }
  toggleColorPicker(display){
    this.pickerDisplay=!this.pickerDisplay;
  }

  imageUpload(event:FileList  ) {
    // console.log(event[0])
    var reader = new FileReader();
    reader.onload =  (f) =>{
      var data = f.target.result;
      console.log(data)
      this.fabricService.imageLoaded(data)

    };
    reader.readAsDataURL(event[0]);
  }



}
