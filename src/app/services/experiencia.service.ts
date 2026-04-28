import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment';
import { Experiencia } from '../Model/experiencia';
import { Skill } from '../Model/skill';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  URL = environment.URL + 'Experiencia'
  respuesta: any = null;

  constructor(private httpClient: HttpClient) { }

  async ObtenerLista(persona_id: number): Promise<Experiencia[]>{
    
    const data$ = this.httpClient.get<Experiencia[]>(this.URL + '/lista/' + persona_id, { responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' } ) ?? 'false';
      this.respuesta = value;
    } catch (e: any){
      this.respuesta = [];
    }

    return this.respuesta;

  }
  
  async Guardar(lista: Experiencia[]): Promise<string>{

    const data$ = this.httpClient.post(this.URL, lista, { responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){
      this.respuesta = e.error;
    }

    return this.respuesta;

  }

  async Eliminar(lista: Experiencia[]): Promise<string>{

    const data$ = this.httpClient.delete(this.URL, { body: lista, responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){  
      this.respuesta = e.error;
    }

    return this.respuesta;

  }

  async AddSKill(skills: Skill[], experiencia_id: number): Promise<string>{

    const data$ = this.httpClient.post(this.URL + "/AddSkill/" + experiencia_id, skills, { responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){  
      this.respuesta = e.error;
    }

    return this.respuesta;

  }

  async DeleteSKill(skills: Skill[], experiencia_id: number): Promise<string>{

    const data$ = this.httpClient.delete(this.URL + "/DeleteSkill/" + experiencia_id, { body: skills, responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){  
      this.respuesta = e.error;
    }

    return this.respuesta;

  }

}
