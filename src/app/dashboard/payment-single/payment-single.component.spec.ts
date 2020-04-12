import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSingleComponent } from './payment-single.component';

describe('PaymentSingleComponent', () => {
  let component: PaymentSingleComponent;
  let fixture: ComponentFixture<PaymentSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
