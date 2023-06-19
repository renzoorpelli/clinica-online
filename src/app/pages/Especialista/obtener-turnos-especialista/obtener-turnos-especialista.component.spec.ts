import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerTurnosEspecialistaComponent } from './obtener-turnos-especialista.component';

describe('ObtenerTurnosEspecialistaComponent', () => {
  let component: ObtenerTurnosEspecialistaComponent;
  let fixture: ComponentFixture<ObtenerTurnosEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObtenerTurnosEspecialistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObtenerTurnosEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
