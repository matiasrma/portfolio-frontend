import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  @ViewChild('password') password!: string;
  roles: string[] = [];  
  
  constructor(private tokenService: TokenService, 
    private authService: AuthService, 
    private authFirebase : ImageService
    ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.roles = this.tokenService.getAuthorites();      
    }
    
  }

  onLogin():void{
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password); 
    this.authFirebase.login(this.password);
    this.logMsj = 'Conectando...';    
    this.authService.login(this.loginUsuario).subscribe(data =>{
        this.logMsj = 'Ingresando!';
        this.mensajeClass = 'ingreso';        
        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;             
        location.reload();
      }, err=>{
        this.logMsj = 'Error, verifique usuario y contraseña';
        this.mensajeClass = 'errorIngreso';
      })
  }
}
