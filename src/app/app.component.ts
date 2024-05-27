import { Component, OnInit } from '@angular/core';
import { CookieService } from './services/cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  title = 'Stockwise-frontend';

  constructor(
    private cookieService: CookieService,
  ){}

  ngOnInit(): void {}
}
