import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  imageDataURL = 'assets/background.jpeg';
  constructor() { }

  ngOnInit(): void {
  }


}
