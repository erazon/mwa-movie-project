import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cast } from '../models/cast.model';

@Injectable({
  providedIn: 'root'
})
export class CastDataService {
  constructor(private _http:HttpClient) { }

  public addCast(movieId:string, castData:Cast): Observable<Cast>{
    const url:string = environment.API_BASE_URL + 'movies/' + movieId + '/casts';
    return this._http.post<Cast>(url, castData);
  }

  public deleteCast(movieId:string, castId:string): Observable<Cast>{
    const url:string = environment.API_BASE_URL + 'movies/' + movieId + '/casts/' + castId;
    return this._http.delete<Cast>(url);
  }

  public getCast(movieId:string, castId:string): Observable<Cast>{
    const url:string = environment.API_BASE_URL + 'movies/' + movieId + '/casts/' + castId;
    return this._http.get<Cast>(url);
  }
  
  public updateCast(movieId:string, castId:string, castData:Cast): Observable<Cast>{
    const url:string = environment.API_BASE_URL + 'movies/' + movieId + '/casts/' + castId;
    return this._http.put<Cast>(url, castData);
  }
}
