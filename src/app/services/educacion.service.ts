import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment';
import { Educacion } from '../Model/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  URL = environment.URL + 'Educacion';
  respuesta: any = null;

  constructor(private httpClient: HttpClient) { }

  async ObtenerLista(persona_id: number): Promise<Educacion[]>{
    
    const data$ = this.httpClient.get<Educacion[]>(this.URL + '/lista/' + persona_id, { responseType: 'json' } );

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){
      this.respuesta = [];
    }

    return this.respuesta;

  }
  
  async Obtener(id: number): Promise<Educacion>{
    
    const data$ = this.httpClient.get<Educacion>(this.URL + '/detail/' + id, { responseType: 'json' } );

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){
      this.respuesta = null;
    }

    return this.respuesta;

  }

  async Guardar(educacion: Educacion): Promise<string>{
    
    const data$ = this.httpClient.post(this.URL, educacion, { responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){
      this.respuesta = e.error;
    }

    return this.respuesta;

  }

  async Update(id: number, educacion: Educacion): Promise<string>{
    
    const data$ = this.httpClient.put(this.URL + '/' + id, educacion, { responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){
      this.respuesta = e.error;
    }

    return this.respuesta;

  }

  async Delete(id: number): Promise<string>{
    
    const data$ = this.httpClient.delete(this.URL + '/' + id, { responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){
      this.respuesta = e.error;
    }

    return this.respuesta;

  }
}
