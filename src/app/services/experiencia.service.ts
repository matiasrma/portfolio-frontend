import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencia } from '../Model/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ServiceExperienciaService {

  expURL = environment.URL + 'Experiencia'
  expURLset = environment.URL + 'ExperienciaSet'
  respuesta: any = null;

  constructor(private httpClient: HttpClient) { }

  async ObtenerLista(persona_id: number): Promise<Experiencia[]>{
    
    const data$ = this.httpClient.get<Experiencia[]>(this.expURL, { params: { persona_id: persona_id } , responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' } ) ?? 'false'
      this.respuesta = value;
    } catch (e: any){
      this.respuesta = e.error;
    }

    return this.respuesta;

  }
  
  async Guardar(lista: Experiencia[]): Promise<string>{

    const data$ = this.httpClient.post(this.expURLset, lista, { responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){
      this.respuesta = e.error;
    }

    return this.respuesta;

  }

  async Eliminar(lista: Experiencia[]): Promise<string>{

    const data$ = this.httpClient.delete(this.expURLset, { body:  lista, params: { responseType: 'string' } });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){
      console.log("error");      
      this.respuesta = e.error;
    }

    console.log(this.respuesta);
    
    return this.respuesta;

  }

}
