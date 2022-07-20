import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { Utils } from '../services/utils.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  #errorMessage:string = "";
  get errorMessage(){return this.#errorMessage;}

  #registrationForm!: FormGroup
  get registrationForm() { return this.#registrationForm; }

  #showPasswordMismatchError:boolean = false;
  get showPasswordMismatchError(){return this.#showPasswordMismatchError;}

  constructor(private _userDataService:UserDataService, private _router:Router) {
    this.#registrationForm = new FormGroup({
      name: new FormControl(),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('register form submitted');
    if(this.#registrationForm.value.password !== this.#registrationForm.value.confirmPassword){
      this.#showPasswordMismatchError = true;
      return;
    }
    else{
      this.#showPasswordMismatchError = false;
    }

    if (this.#registrationForm.invalid) {
      Utils.validateAllFormFields(this.#registrationForm);
      return;
    }
    console.log(this.#registrationForm.value);

    this._userDataService.register(this.#registrationForm.value).subscribe({
      next: (user) =>{
        console.log(user);
        this._router.navigate(['/login']);
      },
      error: (err)=>{
        console.log(err);
        this.#errorMessage = err.message;
      }
    });
  }
}
