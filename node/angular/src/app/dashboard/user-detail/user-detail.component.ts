import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users';
import { LoaderService } from 'src/app/services/loader.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  userData: User;
  constructor(
    private userService: UsersService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.loader.showLoader(true);
    this.userService.getUserData().subscribe(
      (res) => {
        this.loader.showLoader(false);
        this.userData = res;
      },
      (err) => {
        this.loader.showLoader(false);
        window.alert(err);
      }
    );
  }
}
