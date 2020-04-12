import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillSingleComponent } from './bill-single.component';

describe('BillSingleComponent', () => {
  let component: BillSingleComponent;
  let fixture: ComponentFixture<BillSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
