import { inject } from "@angular/core";
import { CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { TokenService } from "../services/token.service";

export const AuhtGuard: CanActivateFn = (
  route: any,
  state: RouterStateSnapshot,
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const token = inject(TokenService).getToken();
  const router = inject(Router);

  try {
    const decodedToken: any = jwtDecode(token);
    const isExpired = decodedToken.exp * 1000 < Date.now();
    
    if (isExpired) {
      return router.createUrlTree(["/", "Login"]);
    }
  } catch (e) {    
    console.log(e);
    return router.createUrlTree(["/", "Login"]);
  }
  
  return token !== '' && token !== 'undefined' || state.url.includes("Login");
};
