import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Social } from '../Model/social';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  URL = environment.URL + 'social/'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Social[]>{
    
    return this.httpClient.get<Social[]>(this.URL + 'lista');

  }
  
  public save(proyecto: Social): Observable<any>{
    
    return this.httpClient.post<any>(this.URL + 'create', proyecto);

  }
  
  public delete(id: number): Observable<any>{

    return this.httpClient.delete<any>(this.URL + `delete/${id}`);

  }

  public update(id: number, proyecto: Social): Observable<any>{

    return this.httpClient.put<any>(this.URL + `update/${id}`, proyecto);

  }

  public detail(id: number): Observable<Social>{
    
    return this.httpClient.get<Social>(this.URL + `detail/${id}`);

  }

}
