import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RutinaDetallePage } from './rutina-detalle.page';

describe('RutinaDetallePage', () => {
  let component: RutinaDetallePage;
  let fixture: ComponentFixture<RutinaDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinaDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
