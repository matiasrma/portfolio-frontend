import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Acd } from '../Model/acd';

@Injectable({
  providedIn: 'root'
})
export class AcdService {

  URL = environment.URL + 'acercade/'

  constructor(private httpClient: HttpClient) { }

  public detail(id: number): Observable<Acd>{
    
    return this.httpClient.get<Acd>(this.URL + `detail/${id}`);

  }

  public update(id: number, acercade: Acd): Observable<any>{

      return this.httpClient.put<any>(this.URL + `update/${id}`, acercade);

  }


}
