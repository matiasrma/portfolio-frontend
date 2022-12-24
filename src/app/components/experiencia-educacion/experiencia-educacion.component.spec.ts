import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciaEducacionComponent } from './experiencia-educacion.component';

describe('ExperienciaEducacionComponent', () => {
  let component: ExperienciaEducacionComponent;
  let fixture: ComponentFixture<ExperienciaEducacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienciaEducacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienciaEducacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
