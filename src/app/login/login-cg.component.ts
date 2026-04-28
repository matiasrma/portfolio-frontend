import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../services/main.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-cg.component.html',
  styleUrls: ['./login-cg.component.css']
})
export class LoginCGComponent {
  form: FormGroup;
  mensajeError = '';
  loading = false;
  passwordMode = 'password';

  constructor(
    private fb: FormBuilder,
    private ms: MainService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre_usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loguearse(): void {
    if (this.form.valid) {
      this.loading = true;
      this.ms.Post("Login", "Ingresar", this.form.value).pipe(
        catchError((err: any) => {
          this.mensajeError = err.error.Mensaje;
          this.loading = false;
          return throwError(() => err);
        })
      ).subscribe((s: any) => {
        this.loading = false;
        this.tokenService.setToken(s.token);
        this.tokenService.setUsername(s.nombre_usuario);
        this.router.navigate(['ControlGastos']);
      });
    }
  }

  togglePassword(): void {
    this.passwordMode = this.passwordMode === "password" ? "text" : "password";
  }

  keyEnter(ev: KeyboardEvent): void {
    if (ev.key === "Enter" && this.form.valid) {
      this.loguearse();
    }
  }
}
