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
import { MovieDetailComponent } from './public/movie-detail/movie-detail.component';
import { MatCardModule } from '@angular/material/card';
import { BookMovieComponent } from './public/book-movie/book-movie.component';
import { PrintTicketComponent } from './public/book-movie/print-ticket/print-ticket.component';

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
    MovieDetailComponent,
    BookMovieComponent,
    PrintTicketComponent,
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
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
