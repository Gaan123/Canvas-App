import { Component } from '@angular/core';
import { EventHandlerService } from '../../event-handler.service';
import { DrawingColours } from '../../models';
import {ColorEvent} from "ngx-color";

@Component({
  selector: 'app-colour-palette',
  templateUrl: './colour-palette.component.html',
  styleUrls: ['./colour-palette.component.scss'],
})
export class ColourPaletteComponent {
  public colours = Object.values(DrawingColours);
  public selectedColour: DrawingColours;

  constructor(private fabricService: EventHandlerService) {
    this.selectedColour = fabricService.selectedColour;
  }

  onSelect(colour) {
    this.fabricService.selectedColour = colour;
    this.selectedColour = this.fabricService.selectedColour;
  }

  changeComplete($event: ColorEvent) {
    const {r,g,b,a}=$event.color.rgb;
    this.onSelect(`rgba(${r},${g},${b},${a})`)
  }
}
