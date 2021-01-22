import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './public/home/home.component';
import { MainComponent } from './layout/main/main.component';
import { BookMovieComponent } from './public/book-movie/book-movie.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './dashboard/user-detail/user-detail.component';

import { UserEditComponent } from './public/user-edit/user-edit.component';
import { AllMoviesComponent } from './admin/all-movies/all-movies.component';
import { AddMovieComponent } from './admin/add-movie/add-movie.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { AllBookingsComponent } from './admin/all-bookings/all-bookings.component';
import { AdminGuard } from './guards/admin.guard';
import { PublicGuard } from './guards/public.guard';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import { LoggedInGuard } from './guards/logged-in.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [LoggedInGuard] /* isLoggedIn guard*/,
  },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [LoggedInGuard] /* isLoggedIn guard*/,
  },
  {
    path: '',
    component: MainComponent,
    children: [
      //// public site
      {
        path: '',
        children: [
          { path: '', component: HomeComponent },
          { path: ':movieId/book', component: BookMovieComponent },
          {
            path: 'profile',
            component: DashboardComponent,
            children: [
              { path: '', component: UserDetailComponent, pathMatch: 'full' },
              { path: 'edit', component: UserEditComponent },
            ],
          },
        ],
        // isPublicRole guard
        // canActivate: [PublicGuard],
      },

      //// admin site
      {
        path: 'admin',
        children: [
          {
            path: '',
            component: DashboardComponent,
            children: [
              { path: '', redirectTo: 'users', pathMatch: 'full' },
              { path: 'add', component: AddAdminComponent },
              {
                path: 'movie',
                children: [
                  { path: '', component: AllMoviesComponent },
                  { path: 'add', component: AddMovieComponent },
                  { path: 'edit/:movieId', component: AddMovieComponent },
                ],
              },
              {
                path: 'users',
                component: AllUsersComponent,
              },
              {
                path: 'bookings',
                component: AllBookingsComponent,
              },
            ],
          },
        ],
        // isAdminRole guard
        // canActivate: [AdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
