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
  respuesta: any = null;

  constructor(private httpClient: HttpClient) { }

  async ObtenerLista(persona_id: number): Promise<Skill[]>{
    
    const data$ = this.httpClient.get<Skill[]>(this.URL, { params: { persona_id: persona_id }, responseType: 'json' });

    try{
      const value = lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e){
      this.respuesta = e;
    }

    return this.respuesta;

  }

  async Guardar(skill: Skill): Promise<string>{
    
    const data$ = this.httpClient.post(this.URL, skill, { responseType: 'json' });

    try{
      const value = lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e){
      this.respuesta = e;
    }

    return this.respuesta;

  }

  async Eliminar(id: number): Promise<Skill[]>{
    
    const data$ = this.httpClient.delete(this.URL, { params: { id: id }, responseType: 'json' });

    try{
      const value = lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e){
      this.respuesta = e;
    }

    return this.respuesta;

  }


}
