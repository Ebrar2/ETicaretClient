import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUplod } from './file-uplod';

describe('FileUplod', () => {
  let component: FileUplod;
  let fixture: ComponentFixture<FileUplod>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileUplod]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUplod);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
