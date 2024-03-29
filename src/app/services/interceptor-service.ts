import { HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class InterceptorService {

    constructor(private tokenSerivice: TokenService){}
        
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        let intReq = req;

        const token = this.tokenSerivice.getToken();        
        
        if(token != null && token != 'undefined'){
            
            intReq = req.clone({            
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });

        }

        return next.handle(intReq);
    }
}

export const interceptorProvider = [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
}];
