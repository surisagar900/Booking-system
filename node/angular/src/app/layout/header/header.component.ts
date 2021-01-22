import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}
  isLoggedIn: boolean = false;
  role: number = 1 | 2;

  ngOnInit(): void {
    this.authService.loggedInUser.subscribe((res) => {
      this.isLoggedIn = !!res;
      this.role = res.role;
    });
  }

  onLogoutBtn() {
    this.authService.logOut();
  }
}
