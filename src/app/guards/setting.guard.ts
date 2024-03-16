import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

export const SettingGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  
  const stringToken = sessionStorage.getItem("session")!; 
  const token = JSON.parse(stringToken);
  const helper = new JwtHelperService();
  const decodeToken = helper.decodeToken(token.jwt);
  console.log(token);
  console.log(decodeToken);
  
  // 👇 Redirects to another route  
  if (!stringToken || decodeToken.role >= 6) {
    return inject(Router).createUrlTree(["/", "Login"]);
  }

  // 👇 Grants or deny access to this route
  const attemptsToAccessItsOwnPage = stringToken !== null;
  return attemptsToAccessItsOwnPage;
};