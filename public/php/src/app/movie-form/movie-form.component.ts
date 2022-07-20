import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.model';
import { MovieDataService } from '../services/movie-data.service';
import { Utils } from '../services/utils.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  movie!: Movie;
  movieId!: string;
  #movieForm!: FormGroup;
  get movieForm() { return this.#movieForm; }
  errorMessage!: string;
  successMessage!: string;
  pageTitle: string = environment.TITLE_ADD;

  constructor(private _movieService: MovieDataService, private _route: ActivatedRoute) {
    this.#movieForm = new FormGroup({
      title: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      genre: new FormControl()
    });

    this.movieId = _route.snapshot.params['movieId'];
    if (this.movieId) {
      this.pageTitle = environment.TITLE_UPDATE;
      _movieService.getMovie(this.movieId).subscribe(movie => {
        this.#movieForm = new FormGroup({
          title: new FormControl(movie.title, Validators.required),
          year: new FormControl(movie.year, Validators.required),
          genre: new FormControl(movie.genre),
        });
      });
    }
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('submit clicked');
    if (this.#movieForm.invalid) {
      Utils.validateAllFormFields(this.#movieForm);
      return;
    }

    if (this.movieId) {
      this._movieService.updateMovie(this.movieId, this.#movieForm.value).subscribe({
        next: (movie) => {
          console.log(movie);
          this.successMessage = environment.MSG_MOVIE_UPDATE_SUCCESS;
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = environment.MSG_MOVIE_UPDATE_FAIL;
        },
      });
    }
    else {
      this._movieService.addMovie(this.#movieForm.value).subscribe({
        next: (movie) => {
          console.log(movie);
          this.successMessage = environment.MSG_MOVIE_INSERT_SUCCESS;
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = environment.MSG_MOVIE_INSERT_FAIL;
        },
      });
    }
  }
}
