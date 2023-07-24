import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LoginUsuario } from 'src/app/Model/login-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensajeClass: string = "conectando"
  logMsj: string = "";
  loginUsuario: LoginUsuario = {} as LoginUsuario;
  usuarioLogeado: LoginUsuario = {} as LoginUsuario;
  nombreUsuario!: string;
  @ViewChild('password') password!: string;
  roles: string[] = [];  

  @Input() isLogged: boolean = false;

  @Output() emitGetIsLogged = new EventEmitter();
  
  constructor(private tokenService: TokenService, 
    private authService: AuthService, 
    private authFirebase : ImageService
    ) { }

  ngOnInit(): void {
    
  }

  async onLogin() {
    let pwd = this.loginUsuario.password;
    this.logMsj = 'Conectando...';

    await this.authService.Login(this.loginUsuario).then(data =>{
      this.usuarioLogeado = data;
    });      

    if (this.usuarioLogeado.email != null) {
      this.logMsj = 'Ingresando!';
      this.mensajeClass = 'ingreso';
      await this.authFirebase.login(this.usuarioLogeado.email, pwd);
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
