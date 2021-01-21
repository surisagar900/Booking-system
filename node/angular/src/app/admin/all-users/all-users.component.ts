import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  allUserData: User[] = [];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getAllUserData().subscribe(
      (res) => {
        this.allUserData = res;
      },
      (err) => {
        window.alert(err);
      }
    );
  }
}
