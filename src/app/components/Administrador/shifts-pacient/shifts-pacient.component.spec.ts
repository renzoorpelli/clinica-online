import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsPacientComponent } from './shifts-pacient.component';

describe('ShiftsPacientComponent', () => {
  let component: ShiftsPacientComponent;
  let fixture: ComponentFixture<ShiftsPacientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftsPacientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftsPacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
