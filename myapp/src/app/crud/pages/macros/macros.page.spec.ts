import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MacrosPage } from './macros.page';

describe('MacrosPage', () => {
  let component: MacrosPage;
  let fixture: ComponentFixture<MacrosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MacrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
