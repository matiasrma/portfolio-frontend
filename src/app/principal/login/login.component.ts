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

  getIsLogged(){
    if(this.tokenService.getToken()){
      //this.roles = this.tokenService.getAuthorites();      
      this.isLogged = true;
    }

    console.log(this.isLogged);
    
  }

  async onLogin() {
    let pwd = this.loginUsuario.password;
    this.logMsj = 'Conectando...';    
    await this.authService.Login(this.loginUsuario).then(async data =>{
        this.loginUsuario = data;        
        await this.authFirebase.login(this.loginUsuario.email, pwd);
        this.logMsj = 'Ingresando!';
        this.mensajeClass = 'ingreso';
        this.tokenService.setToken(this.loginUsuario.token);
        this.tokenService.setUsername(this.loginUsuario.nombre_usuario);
        this.isLogged = true;
        this.emitGetIsLogged.emit();
        //this.tokenService.setAuthorities(this.loginUsuario.authorities);
        //this.roles = data.authorities;             
        //location.reload();
      }).catch (e => {
        this.logMsj = 'Error, verifique usuario y contraseña';
        this.mensajeClass = 'errorIngreso';
      });
  }
}
