import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { TokenService } from "../services/token.service";
import { JwtHelperService } from "@auth0/angular-jwt";

export const AuhtGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {

  const currentToken = inject(TokenService).getToken();
  const helper = new JwtHelperService();

  try{
    const decodeToken = helper.decodeToken(currentToken);            
    // Redirects to another route  
    if (helper.isTokenExpired(currentToken)) {
      return inject(Router).createUrlTree(["/", "Inicio"]);
    } 

  } catch (e: any){    
    // Redirects to another route if ERROR on decodeToken      
    console.log(e);
    return inject(Router).createUrlTree(["/", "Inicio"]);
  }
  

  // Grants or deny access to this route
  const attemptsToAccessItsOwnPage = currentToken !== null || state.url.includes("Login");
  return attemptsToAccessItsOwnPage;
};