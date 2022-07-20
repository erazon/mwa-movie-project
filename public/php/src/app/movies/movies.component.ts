import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MovieDataService } from '../services/movie-data.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = []

  constructor(private _movieService:MovieDataService) { }

  ngOnInit(): void {
    this._movieService.getAllMovies().subscribe(movies=>this.movies = movies);
  }

}
