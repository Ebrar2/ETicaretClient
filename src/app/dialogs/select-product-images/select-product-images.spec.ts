import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductImages } from './select-product-images';

describe('SelectProductImages', () => {
  let component: SelectProductImages;
  let fixture: ComponentFixture<SelectProductImages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectProductImages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectProductImages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
