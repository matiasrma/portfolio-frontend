import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCGComponent } from './login-cg.component';

describe('LoginCGComponent', () => {
  let component: LoginCGComponent;
  let fixture: ComponentFixture<LoginCGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginCGComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
