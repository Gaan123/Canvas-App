import { Component } from '@angular/core';
import { EventHandlerService } from '../event-handler.service';
import { DrawingTools } from '../models';

@Component({
  selector: 'app-graphical-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class GraphicalToolbarComponent {
  DrawingTools = DrawingTools;
  selected = this.fabricService.selectedTool;
  public pickerDisplay: boolean =false;
  constructor(private fabricService: EventHandlerService) {}

  async select(tool: DrawingTools) {
    this.fabricService.selectedTool = tool;
    this.selected = this.fabricService.selectedTool;
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
