import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private _http:HttpClient) { }

  public login(userData:any): Observable<any>{
    const url:string = environment.API_BASE_URL + 'users/login';
    return this._http.post<User>(url, userData);
  }
  
  public register(userData:User): Observable<User>{
    const url:string = environment.API_BASE_URL + 'users/register';
    return this._http.post<User>(url, userData);
  }
}
