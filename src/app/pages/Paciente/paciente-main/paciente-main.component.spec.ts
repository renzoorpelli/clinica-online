import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteMainComponent } from './paciente-main.component';

describe('PacienteMainComponent', () => {
  let component: PacienteMainComponent;
  let fixture: ComponentFixture<PacienteMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
