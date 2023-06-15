import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistaMainComponent } from './especialista-main.component';

describe('EspecialistaMainComponent', () => {
  let component: EspecialistaMainComponent;
  let fixture: ComponentFixture<EspecialistaMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecialistaMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialistaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
