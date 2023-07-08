import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencia } from '../Model/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ServiceExperienciaService {

  expURL = environment.URL + 'Experiencia'
  respuesta: any = null;

  constructor(private httpClient: HttpClient) { }

  async ObtenerLista(persona_id: number): Promise<Experiencia[]>{
    
    const data$ = this.httpClient.get<Experiencia[]>(this.expURL, { params: { persona_id: persona_id } , responseType: 'json' });

    try{
      const value = lastValueFrom(data$, { defaultValue: 'false' } ) ?? 'false'
      this.respuesta = value;
    } catch (e){
      this.respuesta = e;
    }

    return this.respuesta;

  }
  
  async Guardar(experiencia: Experiencia): Promise<string>{

    const data$ = this.httpClient.post(this.expURL, experiencia, { responseType: 'json' });

    try{
      const value = lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e){
      this.respuesta = e;
    }

    return this.respuesta;

  }

  async Eliminar(Id: number): Promise<string>{

    const data$ = this.httpClient.delete(this.expURL, { params: { Id: Id }, responseType: 'json' });

    try{
      const value = lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e){
      this.respuesta = e;
    }

    return this.respuesta;

  }

}
