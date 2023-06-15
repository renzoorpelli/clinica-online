import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosMainComponent } from './turnos-main.component';

describe('TurnosMainComponent', () => {
  let component: TurnosMainComponent;
  let fixture: ComponentFixture<TurnosMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
