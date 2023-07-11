import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDto } from '../Model/jwt-dto';
import { LoginUsuario } from '../Model/login-usuario';
import { NuevoUsuario } from '../Model/nuevo-usuario';

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
    loginUsuario.id = 0;
    loginUsuario.nombre = "";
    
    const data$ = this.httpClient.post(this.authURL, loginUsuario, { responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any) {
      this.respuesta = e.error;
    }

    return this.respuesta;
    
  }

}
