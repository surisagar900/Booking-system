import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular';
  isLoad: boolean;

  constructor(
    private authService: AuthService,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    this.authService.autoLogin();

    this.loader.isLoading.subscribe((res) => {
      this.isLoad = res;
    });
  }
}
