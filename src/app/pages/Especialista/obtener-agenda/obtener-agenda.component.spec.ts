import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerAgendaComponent } from './obtener-agenda.component';

describe('ObtenerAgendaComponent', () => {
  let component: ObtenerAgendaComponent;
  let fixture: ComponentFixture<ObtenerAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObtenerAgendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObtenerAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
