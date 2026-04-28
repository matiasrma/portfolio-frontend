import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginUsuario } from '../../Model/login-usuario';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);

  mensajeClass = "conectando";
  logMsj = "";
  loginUsuario: LoginUsuario = {} as LoginUsuario;
  usuarioLogeado: LoginUsuario = {} as LoginUsuario;
  nombreUsuario = "";
  @Input() isLogged = false;
  @Output() emitGetIsLogged = new EventEmitter<void>();
  
  ngOnInit(): void {}

  async onLogin(): Promise<void> {
    this.logMsj = 'Conectando...';

    this.usuarioLogeado = await this.authService.Login(this.loginUsuario);
    
    if (this.usuarioLogeado.email != null) {
      this.logMsj = 'Ingresando!';
      this.mensajeClass = 'ingreso';
      this.tokenService.setToken(this.usuarioLogeado.token);
      this.tokenService.setUsername(this.usuarioLogeado.nombre_usuario);
      this.isLogged = true;
      this.emitGetIsLogged.emit();
    } else {
      this.logMsj = "Error de usuario o contraseña";
      this.mensajeClass = 'errorIngreso';
    }
  }
}
