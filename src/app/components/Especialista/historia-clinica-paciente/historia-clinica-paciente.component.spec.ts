import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaClinicaPacienteComponent } from './historia-clinica-paciente.component';

describe('HistoriaClinicaPacienteComponent', () => {
  let component: HistoriaClinicaPacienteComponent;
  let fixture: ComponentFixture<HistoriaClinicaPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaClinicaPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriaClinicaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
