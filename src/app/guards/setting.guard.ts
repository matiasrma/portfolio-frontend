import { inject } from "@angular/core";
import { CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { TokenService } from "../services/token.service";

export const SettingGuard: CanActivateFn = (
  route: any,
  state: RouterStateSnapshot,
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const tokenService = inject(TokenService);
  const token = tokenService.getToken();
  const router = inject(Router);

  if (!token) {
    return router.createUrlTree(["/", "Login"]);
  }

  try {
    const decodedToken: any = jwtDecode(token);

    if (decodedToken.role >= 6) {
      return router.createUrlTree(["/", "Login"]);
    }
  } catch (e) {
    return router.createUrlTree(["/", "Login"]);
  }

  return token !== null;
};
