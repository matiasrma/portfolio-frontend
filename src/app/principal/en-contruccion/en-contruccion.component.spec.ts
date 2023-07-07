import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnContruccionComponent } from './en-contruccion.component';

describe('EnContruccionComponent', () => {
  let component: EnContruccionComponent;
  let fixture: ComponentFixture<EnContruccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnContruccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnContruccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
