import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasListComponent } from './canvas-list.component';

describe('CanvasListComponent', () => {
  let component: CanvasListComponent;
  let fixture: ComponentFixture<CanvasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
