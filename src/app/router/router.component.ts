import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-router',
  templateUrl: './router.component.html',
  styleUrl: './router.component.scss'
})
export class RouterComponent implements OnInit {
  token: any
  cs = inject(CookieService)
  router = inject(Router)
  ngOnInit(): void {
    // const token = this.cs.get("token")
    //   if (!token) {
    //     this.router.navigate(["auth"])
    //   }
    //   else this.router.navigate(["dashboard"])
  }
}
