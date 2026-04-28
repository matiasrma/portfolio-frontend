import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../Model/proyecto';
import { Skill } from '../Model/skill';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  URL = environment.URL + 'Proyecto'
  respuesta: any = null;

  constructor(private httpClient: HttpClient) { }

  async ObtenerLista(persona_id: number): Promise<Proyecto[]>{
    
    const data$ = this.httpClient.get<Proyecto[]>(this.URL + '/lista/' + persona_id, { responseType: 'json' } );

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){
      this.respuesta = [];
    }

    return this.respuesta;

  }

  async Guardar(lista: Proyecto[]): Promise<string>{
    
    const data$ = this.httpClient.post(this.URL, lista, { responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){
      this.respuesta = e.error;
    }

    return this.respuesta;

  }

  async Eliminar(lista: Proyecto[]): Promise<string>{
    
    const data$ = this.httpClient.delete(this.URL, { body: lista, responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){
      this.respuesta = e.error;
    }

    return this.respuesta;

  }

  async AddSKill(skills: Skill[], proyecto_id: number): Promise<string>{

    const data$ = this.httpClient.post(this.URL + "/AddSkill/" + proyecto_id, skills, { responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){  
      this.respuesta = e.error;
    }

    return this.respuesta;

  }

  async DeleteSKill(skills: Skill[], proyecto_id: number): Promise<string>{

    const data$ = this.httpClient.delete(this.URL + "/DeleteSkill/" + proyecto_id, { body: skills, responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: 'false' }) ?? 'false';
      this.respuesta = value;
    } catch (e: any){  
      this.respuesta = e.error;
    }

    return this.respuesta;

  }

}
