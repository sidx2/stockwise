// DashboardComponent.ts
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Category } from '../../category-module/models/category';
import { getCategoryRequest } from '../../category-module/store/category.action';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Chart from 'chart.js/auto';
import { categorySelector } from '../../category-module/store/category.selector';
import { CategoryState } from '../../category-module/models/category';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  @ViewChild('chartContainer') private chartContainer!: ElementRef<HTMLDivElement>;

  categories$: Observable<Category[]>;
  orgId: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<{ categories: CategoryState }>,
    private router: Router,
  ) {
    this.categories$ = this.store.pipe(select(categorySelector));
  }

  ngOnInit(): void {
    this.store.dispatch(getCategoryRequest());

    this.categories$
      .pipe(takeUntil(this.destroy$))
      .subscribe(categories => {
        console.log(categories);
        if (categories && categories.length > 0) {
          this.renderPieChart(categories);
        } else {
          console.log("Not able to render pie chart");
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  renderPieChart(categories: Category[]): void {
    const canvas = document.createElement('canvas');
    canvas.width = 450; 
    canvas.height = 450; 
    this.chartContainer.nativeElement.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("Failed to get 2D rendering context");
      return;
    }

    const data = categories.map(category => category.numberOfAssets);
    const labels = categories.map(category => category.name);

    const options: any = {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Assets per Category'
      },
      legend: {
        position: 'right'
      },
      tooltip: {
        enabled: false
      },
      plugins: {
        datalabels: {
          formatter: (value: number, ctx: any) => {
            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map((data: number) => {
              sum += data;
            });
            let percentage = (value * 100 / sum).toFixed(2) + "%";
            return percentage;
          },
          color: '#fff',
          font: {
            weight: 'bold',
            size: 14
          }
        }
      }
    };

    const darkColors = [
      'rgba(75, 192, 192, 0.5)',
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 206, 86, 0.5)',
      'rgba(153, 102, 255, 0.5)',
      'rgba(255, 159, 64, 0.5)',
    ];

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Assets per Category',
          data: data,
          backgroundColor: darkColors,
          borderWidth: 1
        }]
      },
      options: options
    });
  }
}
