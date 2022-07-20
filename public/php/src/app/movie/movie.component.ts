import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDataService } from '../services/movie-data.service';
import { Movie } from '../models/movie.model';
import { CastDataService } from '../services/cast-data.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  get isLoggedIn(){return this._authService.isLoggedIn;}
  movie: Movie = new Movie('', 'No title', 1900);
  errorMessage!: string;

  constructor(private _authService: AuthService, private _movieService: MovieDataService,
    private _castService: CastDataService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    let movieId = this._route.snapshot.params['movieId'];
    this._movieService.getMovie(movieId).subscribe(movie => this.movie = movie);
  }

  onCastDeleteClick(movieId: string, castId: string): void {
    this._castService.deleteCast(movieId, castId).subscribe({
      next: (afterDeletedCast) => {
        console.log('delete movie', afterDeletedCast);
        window.location.reload();
      },
      'error': (err) => {
        console.log(err);
        this.errorMessage = environment.MSG_DELETE_FAIL;
      }
    });
  }

  onMovieDeleteClick(movieId: string): void {
    this._movieService.deleteMovie(movieId).subscribe({
      next: (deletedMovie) => {
        console.log('delete movie', deletedMovie);
        this._router.navigate(['movies']);
      },
      'error': (err) => {
        console.log(err);
        this.errorMessage = environment.MSG_DELETE_FAIL;
      }
    });
  }
}
