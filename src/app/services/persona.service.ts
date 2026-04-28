import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment';
import { Persona } from '../Model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  URL = environment.URL + 'Persona';
  respuesta: any = null;

  constructor(private httpClient: HttpClient) { }
  
  async Obtener(id: number): Promise<Persona>{
    
    const data$ = this.httpClient.get<Persona>(this.URL + '/detail/' + id, { responseType: 'json' } );

    try{
      const value = await lastValueFrom(data$, { defaultValue: "false" }) ?? "false"
      this.respuesta = value;
    } catch(e) {
      this.respuesta = e;
    }

    return this.respuesta;

  }

  async Guardar(persona: Persona): Promise<String>{
    
    const data$ = this.httpClient.post(this.URL, persona, { responseType: 'json' });

    try{
      const value = await lastValueFrom(data$, { defaultValue: "false" }) ?? "false"
      this.respuesta = value;
    } catch(e) {
      this.respuesta = e;
    }

    return this.respuesta;

  }
}
