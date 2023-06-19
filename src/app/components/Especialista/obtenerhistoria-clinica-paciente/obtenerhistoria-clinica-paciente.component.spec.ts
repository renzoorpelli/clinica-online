import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerhistoriaClinicaPacienteComponent } from './obtenerhistoria-clinica-paciente.component';

describe('ObtenerhistoriaClinicaPacienteComponent', () => {
  let component: ObtenerhistoriaClinicaPacienteComponent;
  let fixture: ComponentFixture<ObtenerhistoriaClinicaPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObtenerhistoriaClinicaPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObtenerhistoriaClinicaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
