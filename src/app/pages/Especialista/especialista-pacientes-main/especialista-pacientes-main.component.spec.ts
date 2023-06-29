import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistaPacientesMainComponent } from './especialista-pacientes-main.component';

describe('EspecialistaPacientesMainComponent', () => {
  let component: EspecialistaPacientesMainComponent;
  let fixture: ComponentFixture<EspecialistaPacientesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecialistaPacientesMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialistaPacientesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
