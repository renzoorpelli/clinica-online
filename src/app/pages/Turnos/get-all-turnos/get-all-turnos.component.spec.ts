import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllTurnosComponent } from './get-all-turnos.component';

describe('GetAllTurnosComponent', () => {
  let component: GetAllTurnosComponent;
  let fixture: ComponentFixture<GetAllTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllTurnosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
