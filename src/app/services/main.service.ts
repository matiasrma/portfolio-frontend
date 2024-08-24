import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

    private loadingBS: BehaviorSubject<number>;
    public loading: Observable<number>;

    constructor(private http: HttpClient) { 
        this.loadingBS = new BehaviorSubject(0);
        this.loading = this.loadingBS.asObservable();
    }


    public Post(controller: string, accion: string, payload: any){

        let headers = new HttpHeaders();
		headers = headers.set("Content-Type", "application/json");
		headers = headers.set("Accept", "application/json");

        const url = `${environment.URL}${controller}/${accion}`;
        return this.http.post(url, payload, { headers: headers });

    }

    headers(){
        let headers = new HttpHeaders();
		headers = headers.set("Content-Type", "application/json");
        return headers;
    }
  
}
