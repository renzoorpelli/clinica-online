import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTurnosEspecialistaComponent } from './crear-turnos-especialista.component';

describe('CrearTurnosEspecialistaComponent', () => {
  let component: CrearTurnosEspecialistaComponent;
  let fixture: ComponentFixture<CrearTurnosEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearTurnosEspecialistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTurnosEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
