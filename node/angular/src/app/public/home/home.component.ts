import { Component, OnInit } from '@angular/core';
import { movies } from 'src/app/models/movies';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies: Array<movies>;

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getTrending().subscribe((res: any) => {
      this.movies = res;
    });
  }
}
