import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../Model/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  URL = environment.URL + 'Skill';
  URLSet = environment.URL + 'SkillSet';
  respuesta: any = null;

  constructor(private httpClient: HttpClient) { }

  async ObtenerLista(persona_id: number): Promise<Skill[]>{
    
    const data$ = this.httpClient.get<Skill[]>(this.URL, { params: { persona_id: persona_id }, responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){
      this.respuesta = e.error;
    }

    return this.respuesta;

  }

  async Guardar(lista: Skill[]): Promise<string>{
    
    const data$ = this.httpClient.post<string>(this.URLSet, lista, { params: { responseType: 'string' } });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){
      this.respuesta = e.error;
    }
    
    return this.respuesta;

  }

  async Eliminar(lista: Skill[]): Promise<string>{
    
    const data$ = this.httpClient.delete(this.URLSet, { body: lista, params : { responseType: 'string' } });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){
      this.respuesta = e.error;
    }

    return this.respuesta;

  }


}
