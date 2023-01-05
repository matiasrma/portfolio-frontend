import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../Model/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  URL = environment.URL + 'skill/'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Skill[]>{
    
    return this.httpClient.get<Skill[]>(this.URL + 'lista');

  }

  public detail(id: number): Observable<Skill>{
    
    return this.httpClient.get<Skill>(this.URL + `detail/${id}`);

  }

  public save(proyecto: Skill): Observable<any>{
    
    return this.httpClient.post<any>(this.URL + 'create', proyecto);

  }

  public update(id: number, proyecto: Skill): Observable<any>{

      return this.httpClient.put<any>(this.URL + `update/${id}`, proyecto);

  }

  public delete(id: number): Observable<any>{

    return this.httpClient.delete<any>(this.URL + `delete/${id}`);

  }
}
