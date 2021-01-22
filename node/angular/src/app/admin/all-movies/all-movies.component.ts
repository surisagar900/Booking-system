import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movies';
import { LoaderService } from 'src/app/services/loader.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css'],
})
export class AllMoviesComponent implements OnInit {
  allMoviesData: Movie[] = [];

  constructor(
    private movieService: MoviesService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.loader.showLoader(true);
    this.movieService.getAllMovieData().subscribe(
      (res) => {
        this.allMoviesData = res;
        this.loader.showLoader(false);
      },
      (err) => {
        window.alert(err);
        this.loader.showLoader(false);
      }
    );
  }

  onDelete(movieId: number) {
    this.loader.showLoader(true);
    let decision: boolean = window.confirm(
      'are you sure you want to delete this movie ? '
    );

    if (decision) {
      this.movieService.deleteMovieData(movieId).subscribe(
        (res) => {
          this.getAll();
          this.loader.showLoader(false);
        },
        (err) => {
          window.alert(err);
          this.loader.showLoader(false);
        }
      );
    } else {
      return;
    }
  }
}
