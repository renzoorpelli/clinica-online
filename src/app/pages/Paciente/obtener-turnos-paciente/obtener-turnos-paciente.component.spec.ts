import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerTurnosPacienteComponent } from './obtener-turnos-paciente.component';

describe('ObtenerTurnosPacienteComponent', () => {
  let component: ObtenerTurnosPacienteComponent;
  let fixture: ComponentFixture<ObtenerTurnosPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObtenerTurnosPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObtenerTurnosPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
