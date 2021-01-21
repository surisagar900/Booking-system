import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-movie',
  templateUrl: './book-movie.component.html',
  styleUrls: ['./book-movie.component.css'],
})
export class BookMovieComponent implements OnInit {
  movie: any;
  imageUrl: string = environment.posterUrl;
  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute,
    private bookService: BookService,
    private authService: AuthService,
    private router: Router
  ) {}

  showView: boolean = false;

  seatRow: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  seatColumn: string[] = ['A', 'B', 'C', 'D'];

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.getMovieById(+param.get('movieId'));
    });
  }

  getMovieById(id: number) {
    this.movieService.getMovieById(id).subscribe((res) => {
      this.movie = res;
      this.showView = true;
    });
  }

  isTicketBooked: boolean = false;

  selectedSeats: string[] = [];

  selectSeat(seatCol: string, seatRow: number) {
    let seat = seatCol + seatRow;
    let seatIndex = this.selectedSeats.indexOf(seat);
    if (seatIndex != -1) {
      this.selectedSeats.splice(seatIndex, 1);
    } else {
      this.selectedSeats.push(seat);
    }
  }

  checkSelectedSeat(seat: string): boolean {
    let seatIndex = this.selectedSeats.indexOf(seat);
    return seatIndex == -1 ? false : true;
  }

  bookSeat() {
    let userId = this.authService.loggedInUser.value;
    if (userId == null) {
      window.alert('Please login first');
      return;
    }

    let seats = this.selectedSeats.join(',');
    this.bookService
      .bookSeat(+userId, this.movie.title, seats, '' + userId)
      .subscribe(
        (res) => {
          window.alert(res);
          this.isTicketBooked = true;
        },
        (err) => {
          window.alert(err);
          this.isTicketBooked = false;
        }
      );
  }
}
