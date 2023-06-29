import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateGraphComponent } from './generate-graph.component';

describe('GenerateGraphComponent', () => {
  let component: GenerateGraphComponent;
  let fixture: ComponentFixture<GenerateGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
