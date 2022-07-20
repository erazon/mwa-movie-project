import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CastFormComponent } from './cast-form/cast-form.component'
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegistrationComponent } from './registration/registration.component';
import { TokenInterceptor } from './token.interceptors';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    MoviesComponent,
    MovieComponent,
    RegistrationComponent,
    LoginComponent,
    MovieFormComponent,
    CastFormComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'', component: HomeComponent},
      {path:'login', component: LoginComponent},
      {path:'movies', component: MoviesComponent},
      {path:'movies/:movieId', component: MovieComponent},
      {path:'movie/add', component: MovieFormComponent},
      {path:'movie/edit/:movieId', component: MovieFormComponent},
      {path:'movie/search', component: SearchComponent},
      {path:'movie-cast/:movieId/cast/add', component: CastFormComponent},
      {path:'movie-cast/:movieId/cast/edit/:castId', component: CastFormComponent},
      {path:'register', component: RegistrationComponent},
    ]),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi:true},
    {provide: JWT_OPTIONS, useValue: JwtHelperService},
    JwtHelperService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
