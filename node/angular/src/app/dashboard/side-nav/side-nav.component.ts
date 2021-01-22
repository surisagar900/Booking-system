import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  role: number = 1 | 2;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loggedInUser.subscribe((res) => {
      this.role = res.role;
    });
  }
}
