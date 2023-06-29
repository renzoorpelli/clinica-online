import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerEstadisticasComponent } from './obtener-estadisticas.component';

describe('ObtenerEstadisticasComponent', () => {
  let component: ObtenerEstadisticasComponent;
  let fixture: ComponentFixture<ObtenerEstadisticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObtenerEstadisticasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObtenerEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
