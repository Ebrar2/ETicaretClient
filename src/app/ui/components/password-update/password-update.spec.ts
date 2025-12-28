import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordUpdate } from './password-update';

describe('PasswordUpdate', () => {
  let component: PasswordUpdate;
  let fixture: ComponentFixture<PasswordUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
