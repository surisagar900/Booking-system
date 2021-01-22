import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  username: string;
  role: number = 1 | 2;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loggedInUser.subscribe((res) => {
      this.role = res.role;
    });
  }
}
