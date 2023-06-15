import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTurnoPacienteComponent } from './crear-turno-paciente.component';

describe('CrearTurnoPacienteComponent', () => {
  let component: CrearTurnoPacienteComponent;
  let fixture: ComponentFixture<CrearTurnoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearTurnoPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTurnoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
