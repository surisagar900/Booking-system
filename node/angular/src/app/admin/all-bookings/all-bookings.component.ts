import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css'],
})
export class AllBookingsComponent implements OnInit {
  bookings: any[];

  constructor(
    private bookService: BookService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.loader.showLoader(true);

    this.bookService.bookingHistory().subscribe((res) => {
      this.bookings = res;
      this.loader.showLoader(false);
    });
  }
}
