import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnDestroy {
  isLoading: boolean = false;
  private loaderSubscription: Subscription;

  constructor(private loaderService: LoaderService) {
    this.loaderSubscription = this.loaderService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy(): void {
    this.loaderSubscription.unsubscribe();
  }
}
