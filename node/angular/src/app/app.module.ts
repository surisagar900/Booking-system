import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MainComponent } from './layout/main/main.component';
import { HomeComponent } from './public/home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MovieCardComponent } from './public/movie-card/movie-card.component';
import { MatCardModule } from '@angular/material/card';
import { BookMovieComponent } from './public/book-movie/book-movie.component';
import { PrintTicketComponent } from './public/book-movie/print-ticket/print-ticket.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavComponent } from './dashboard/side-nav/side-nav.component';
import { UserDetailComponent } from './dashboard/user-detail/user-detail.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { AddMovieComponent } from './admin/add-movie/add-movie.component';
import { AllMoviesComponent } from './admin/all-movies/all-movies.component';
import {
  MatRippleModule,
  MAT_RIPPLE_GLOBAL_OPTIONS,
  RippleGlobalOptions,
} from '@angular/material/core';
import { UserEditComponent } from './public/user-edit/user-edit.component';
import { AllBookingsComponent } from './admin/all-bookings/all-bookings.component';
import { LoaderComponent } from './layout/loader/loader.component';
import { MatSliderModule } from '@angular/material/slider';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';

const globalRippleConfig: RippleGlobalOptions = {
  disabled: false,
  animation: {
    enterDuration: 300,
    exitDuration: 0,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MovieCardComponent,
    BookMovieComponent,
    PrintTicketComponent,
    DashboardComponent,
    SideNavComponent,
    UserDetailComponent,
    AllUsersComponent,
    AddMovieComponent,
    AllMoviesComponent,
    UserEditComponent,
    AllBookingsComponent,
    LoaderComponent,
    AddAdminComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatRippleModule,
    MatSliderModule,
  ],
  providers: [
    AuthService,
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
