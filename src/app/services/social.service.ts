import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment';
import { Social } from '../Model/social';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  URL = environment.URL + 'Social'
  respuesta: any = null;

  constructor(private httpClient: HttpClient) { }

  async ObtenerLista(persona_id: number): Promise<Social[]>{
    
    const data$ = this.httpClient.get<Social[]>(this.URL + '/lista/' + persona_id, { responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch(e) {
      this.respuesta = [];
    }

    return this.respuesta;

  }
  
  async Guardar(lista: Social[]): Promise<string>{
     
    const data$ = this.httpClient.post(this.URL+"/lista", lista, { responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch(e: any) {
      this.respuesta = e.error;
    }
    
    return this.respuesta;

  }
  
  async Eliminar(lista: Social[]): Promise<string>{
    
    const data$ = this.httpClient.delete(this.URL, { body: lista, responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch(e: any) {
      this.respuesta = e.error;
    }

    return this.respuesta;

  }

}