import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../models/movie.model';
import { MovieDataService } from '../services/movie-data.service';
import { Utils } from '../services/utils.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  #searchForm!: FormGroup;
  get searchForm() { return this.#searchForm; }

  movies: Movie[] = []

  constructor(private _movieService:MovieDataService) {
    this.#searchForm = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('find clicked');
    if (this.#searchForm.invalid) {
      Utils.validateAllFormFields(this.#searchForm);
      return;
    }
    this._movieService.searchMovies(this.#searchForm.value.title).subscribe(movies=>this.movies = movies);
  }
}
