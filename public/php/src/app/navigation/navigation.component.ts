import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  get isLoggedIn(){return this._authService.isLoggedIn;}

  constructor(private _authService:AuthService, private _router:Router) { }

  ngOnInit(): void {
  }

  onLogout(){
    this._authService.logout();
    this._router.navigate(['/']);
  }
}
