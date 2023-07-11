import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../Model/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  URL = environment.URL + 'Proyecto'
  URLSet = environment.URL + 'ProyectoSet'
  respuesta: any = null;

  constructor(private httpClient: HttpClient) { }

  async ObtenerLista(persona_id: number): Promise<Proyecto[]>{
    
    const data$ = this.httpClient.get<Proyecto[]>(this.URL, { params: { persona_id: persona_id }, responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){
      this.respuesta = e.error;
    }

    return this.respuesta;

  }

  async Guardar(lista: Proyecto[]): Promise<string>{
    
    const data$ = this.httpClient.post(this.URLSet, lista, { responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){
      this.respuesta = e.error;
    }

    return this.respuesta;

  }

  async Eliminar(lista: Proyecto[]): Promise<string>{
    
    const data$ = this.httpClient.delete(this.URLSet, { body: lista, responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){
      this.respuesta = e.error;
    }

    return this.respuesta;

  }

}
