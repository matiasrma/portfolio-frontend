import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Acd } from '../Model/acd';

@Injectable({
  providedIn: 'root'
})
export class AcdService {

  URL = environment.URL + 'AcercaDe'
  respuesta: any = null;

  constructor(private httpClient: HttpClient) { }

  async Obtener(id: number): Promise<Acd>{
    
    const data$ = this.httpClient.get(this.URL, { params: { id: id }, responseType: 'json' } );

    try {
      const value = await lastValueFrom(data$, {defaultValue: 'false'}) ?? "false"
      this.respuesta = value;
    } catch(e) {
      if (e instanceof HttpErrorResponse){
        this.respuesta = null;
      }
    }

    return this.respuesta;

  }

  async Guardar(acercade: Acd): Promise<string>{

    const data$ = this.httpClient.post(this.URL, acercade, {responseType: 'json'});

    try {
      const value = await lastValueFrom(data$, {defaultValue: 'false'}) ?? "false"
      this.respuesta = value;
    } catch(e) {
      if (e instanceof HttpErrorResponse){
        this.respuesta = (e.error);
      }
    }

    return this.respuesta;

  }


}
