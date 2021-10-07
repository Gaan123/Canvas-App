import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.scss']
})
// export class PaintComponent {
//   imageDataURL = 'assets/background.jpeg';
// }
export class PaintComponent implements OnInit {
  imageDataURL = 'assets/background.jpeg';
  constructor() { }

  ngOnInit(): void {
  }

}
