import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { LoginUsuario } from '../Model/login-usuario';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { DxFormModule, DxLoadIndicatorModule, DxScrollViewModule } from 'devextreme-angular';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login-cg.component.html',
  styleUrls: ['./login-cg.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, DxScrollViewModule, DxFormModule, DxLoadIndicatorModule]
  
})
export class LoginCGComponent implements OnInit {

    public usuario: LoginUsuario = { nombre_usuario: '',  password: '' } as LoginUsuario;
    
    formData: any = {};
    mensajeError = '';
    loading = false;

    constructor(public ms: MainService, public tokenService: TokenService, private router: Router) { 
    }  

    ngOnInit(): void {    
        
    } 

    keyEnter(ev: KeyboardEvent){
        console.log(ev.key);
        if (ev.key === "Enter"){
            this.loguearse();
        }
        
    }

    loguearse(){
        console.log(this.usuario);
        this.loading = true;
        this.ms.Post("Login", "Ingresar", this.usuario).pipe(
            catchError((err: any) =>{
                this.mensajeError = err.error.Mensaje;
                this.loading = false;
                return throwError(() => { err.error.Mensaje });

            })
        ).subscribe((s: any) =>{
            this.loading = false;
            this.tokenService.setToken(s.token);
            this.tokenService.setUsername(s.nombre_usuario);

            this.router.navigate(['ControlGastos']);
        });
    }

    passwordMode: string = 'password';
    buttonPassword: any = [];
    
    setupBtnPasswordEye() {
        this.buttonPassword = [
        {
            name: "passwordEye",
            location: "after",
            options: {
            icon: 'fa fa-eye',
            stylingMode: 'filled',
            onClick: () => {
                this.passwordMode = this.passwordMode === "text" ? "password" : "text";
                this.buttonPassword[0].options.icon = this.passwordMode === "text" ? 'fa fa-eye-slash' : 'fa fa-eye';
            }
            }
        }
        ];
    }

}
