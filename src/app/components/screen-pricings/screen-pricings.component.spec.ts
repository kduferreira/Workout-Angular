import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenPricingsComponent } from './screen-pricings.component';

describe('ScreenPricingsComponent', () => {
  let component: ScreenPricingsComponent;
  let fixture: ComponentFixture<ScreenPricingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenPricingsComponent]
    });
    fixture = TestBed.createComponent(ScreenPricingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
