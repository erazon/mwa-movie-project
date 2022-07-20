import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm')
  loginForm!: NgForm;
  #errorMessage: string = "";
  get errorMessage() { return this.#errorMessage; }

  username: string = "";
  password: string = "";

  constructor(private _authService: AuthService,
    private _userDataService: UserDataService, private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    console.log('login clicked');
    if (form.valid) {
      console.log('Form', form.value);
      this._userDataService.login(form.value).subscribe({
        next: (tokenResp) => {
          console.log(tokenResp);
          this._authService.login(tokenResp.token);
          this._router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          this.#errorMessage = err.message;
        }
      })
    }
    else{
      form.control.markAllAsTouched();
    }
  }
}
