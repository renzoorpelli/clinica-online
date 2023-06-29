import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsOfMyPacientsComponent } from './shifts-of-my-pacients.component';

describe('ShiftsOfMyPacientsComponent', () => {
  let component: ShiftsOfMyPacientsComponent;
  let fixture: ComponentFixture<ShiftsOfMyPacientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftsOfMyPacientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftsOfMyPacientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
