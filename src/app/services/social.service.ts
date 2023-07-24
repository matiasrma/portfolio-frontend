import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Social } from '../Model/social';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  URL = environment.URL + 'Social'

  respuesta: any = null;

  constructor(private httpClient: HttpClient) { }

  async ObtenerLista(persona_id: number): Promise<Social[]>{
    
    const data$ = this.httpClient.get<Social[]>(this.URL, { params: { persona_id: persona_id, responseType: "json" } });

    try{
      const value = await lastValueFrom(data$, { defaultValue: "false" }) ?? "false"
      this.respuesta = value;
    } catch(e) {
      this.respuesta = null;
    }

    return this.respuesta;

  }
  
  async Guardar(social: Social): Promise<string>{
   
    const data$ = this.httpClient.post(this.URL, social, { params: { responseType: "string" } });

    try{
      const value = await lastValueFrom(data$, { defaultValue: "false" }) ?? "false"
      this.respuesta = value;
    } catch(e) {
      this.respuesta = e;
    }

    return this.respuesta;
  }
  
  async Eliminar(Id: number): Promise<string>{

    const data$ = this.httpClient.delete(this.URL, { params: { Id: Id, responseType: "string" } });

    try{
      const value = await lastValueFrom(data$, { defaultValue: "false" }) ?? "false"
      this.respuesta = value;
    } catch(e) {
      this.respuesta = e;
    }

    return this.respuesta;

  }

}
