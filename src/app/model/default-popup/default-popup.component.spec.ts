import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPopupComponent } from './default-popup.component';

describe('DefaultPopupComponent', () => {
  let component: DefaultPopupComponent;
  let fixture: ComponentFixture<DefaultPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
