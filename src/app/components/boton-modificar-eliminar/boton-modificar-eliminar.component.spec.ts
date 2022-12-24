import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonModificarEliminarComponent } from './boton-modificar-eliminar.component';

describe('BotonModificarEliminarComponent', () => {
  let component: BotonModificarEliminarComponent;
  let fixture: ComponentFixture<BotonModificarEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonModificarEliminarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonModificarEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
