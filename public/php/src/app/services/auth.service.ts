import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #isLoggedIn: boolean = false;
  get isLoggedIn() {
    if (localStorage.getItem(environment.AUTH_TOKEN_KEY)) {
      const token = localStorage.getItem(environment.AUTH_TOKEN_KEY);
      if (token) {
        const name = this._jwt.decodeToken(token).name as string;
        this.#name = name;
        this.#isLoggedIn = true;
      }
    }
    return this.#isLoggedIn;
  }
  #name: string = "";
  get name() { return this.#name; }
  #token: string = "";
  get token() { return this.#token; }
  // set token(token:string){this.#token=token;}

  constructor(private _jwt: JwtHelperService) { }

  login(token: string) {
    localStorage.setItem(environment.AUTH_TOKEN_KEY, token);
    const name = this._jwt.decodeToken(token).name as string;
    this.#name = name;
    this.#isLoggedIn = true;
  }

  logout() {
    localStorage.clear();
    this.#name = "";
    this.#isLoggedIn = false;
  }
}
