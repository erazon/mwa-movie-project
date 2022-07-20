import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {
  constructor(private _http:HttpClient) { }

  public addMovie(movieData:Movie): Observable<Movie>{
    const url:string = environment.API_BASE_URL + 'movies';
    return this._http.post<Movie>(url, movieData);
  }

  public deleteMovie(movieId:string): Observable<Movie>{
    const url:string = environment.API_BASE_URL + 'movies/' + movieId;
    return this._http.delete<Movie>(url);
  }

  public getAllMovies(): Observable<Movie[]>{
    const url:string = environment.API_BASE_URL + 'movies';
    return this._http.get<Movie[]>(url);
  }

  public getMovie(movieId:string): Observable<Movie>{
    const url:string = environment.API_BASE_URL + 'movies/' + movieId;
    return this._http.get<Movie>(url);
  }

  public searchMovies(title:string): Observable<Movie[]>{
    const url:string = environment.API_BASE_URL + 'movies/search';
    return this._http.post<Movie[]>(url, {title: title});
  }
  
  public updateMovie(movieId:string, movieData:Movie): Observable<Movie>{
    const url:string = environment.API_BASE_URL + 'movies/' + movieId;
    return this._http.put<Movie>(url, movieData);
  }
}
