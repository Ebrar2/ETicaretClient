import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCompleteDialog } from './order-complete-dialog';

describe('OrderCompleteDialog', () => {
  let component: OrderCompleteDialog;
  let fixture: ComponentFixture<OrderCompleteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderCompleteDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCompleteDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
