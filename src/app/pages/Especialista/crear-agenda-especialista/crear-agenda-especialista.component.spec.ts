import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAgendaEspecialistaComponent } from './crear-agenda-especialista.component';

describe('CrearAgendaEspecialistaComponent', () => {
  let component: CrearAgendaEspecialistaComponent;
  let fixture: ComponentFixture<CrearAgendaEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAgendaEspecialistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAgendaEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
