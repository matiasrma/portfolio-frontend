import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor() { }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(TOKEN_KEY + '_expiry', (Date.now() + 86400000).toString());
  }

  public getToken(): string {
    const expiry = window.localStorage.getItem(TOKEN_KEY + '_expiry');
    if (expiry && Date.now() > parseInt(expiry)) {
      this.logout();
      return '';
    }
    return localStorage.getItem(TOKEN_KEY) ?? '';
  }

  public setUsername(userName: string): void {
    window.localStorage.removeItem(USERNAME_KEY);
    window.localStorage.setItem(USERNAME_KEY, userName);
  }

  public getUsername(): string {
    return localStorage.getItem(USERNAME_KEY) ?? '';
  }

  public setAuthorities(authorities: string[]): void {
    window.localStorage.removeItem(AUTHORITIES_KEY);
    window.localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities))
  } 

  public getAuthorities(): string[] {
    this.roles = [];
    const authorities = localStorage.getItem(AUTHORITIES_KEY);
    if (authorities) {
      JSON.parse(authorities).forEach((authority: any) => {
        this.roles.push(authority.authority);
      });      
    }
    return this.roles;
  }

  public logout(): void {
    window.localStorage.clear();
  }

  public isLogged(): boolean {
    const token = this.getToken();
    return token !== '';
  }

}
