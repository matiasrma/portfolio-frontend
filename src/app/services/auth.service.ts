import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUsuario } from '../Model/login-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.URL + 'Login';
  respuesta: any = null;

  constructor(private httpClient: HttpClient) { }

  async Login(loginUsuario: LoginUsuario): Promise<LoginUsuario>{

    loginUsuario.token = "";
    loginUsuario.email = "";
    loginUsuario.Id = 0;
    loginUsuario.nombre = "";
    
    const data$ = this.httpClient.post<LoginUsuario>(this.authURL, loginUsuario, { responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any) {
      if (e instanceof HttpErrorResponse) console.log(e.error.Message);
      this.respuesta = {} as LoginUsuario;
    }

    return this.respuesta;
    
  }  

}
