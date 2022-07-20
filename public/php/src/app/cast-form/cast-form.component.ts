import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Cast } from '../models/cast.model';
import { CastDataService } from '../services/cast-data.service';
import { Utils } from '../services/utils.service';

@Component({
  selector: 'app-cast-form',
  templateUrl: './cast-form.component.html',
  styleUrls: ['./cast-form.component.css']
})
export class CastFormComponent implements OnInit {
  cast!: Cast;
  castId!: string;
  movieId!: string;
  #castForm!: FormGroup;
  get castForm() { return this.#castForm; }
  errorMessage!: string;
  successMessage!: string;
  pageTitle: string = environment.TITLE_ADD;

  constructor(private _castService: CastDataService, private _route: ActivatedRoute) {
    this.#castForm = new FormGroup({
      name: new FormControl('', Validators.required),
      debut_year: new FormControl()
    });

    this.movieId = _route.snapshot.params['movieId'];
    this.castId = _route.snapshot.params['castId'];
    if (this.movieId && this.castId) {
      this.pageTitle = environment.TITLE_UPDATE;
      _castService.getCast(this.movieId, this.castId).subscribe(movie => {
        this.#castForm = new FormGroup({
          name: new FormControl(movie.name, Validators.required),
          debut_year: new FormControl(movie.debut_year)
        });
      });
    }
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('submit clicked');
    if (this.#castForm.invalid) {
      Utils.validateAllFormFields(this.#castForm);
      return;
    }

    if(this.movieId){
      if (this.castId) {
        this._castService.updateCast(this.movieId, this.castId, this.#castForm.value).subscribe({
          next: (movie) => {
            console.log(movie);
            this.successMessage = environment.MSG_CAST_UPDATE_SUCCESS;
          },
          error: (err) => {
            console.log(err);
            this.errorMessage = environment.MSG_CAST_UPDATE_FAIL;
          },
        });
      }
      else {
        this._castService.addCast(this.movieId, this.#castForm.value).subscribe({
          next: (movie) => {
            console.log(movie);
            this.successMessage = environment.MSG_CAST_INSERT_SUCCESS;
          },
          error: (err) => {
            console.log(err);
            this.errorMessage = environment.MSG_CAST_INSERT_FAIL;
          },
        });
      }
    }
  }
}
