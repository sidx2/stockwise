import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { orgSelector } from '../../../store/global.selectors';
import { Category } from '../../category-module/models/category';
import { getCategoryRequest } from '../../category-module/store/category.action';
import { Observable } from 'rxjs';
import Chart from 'chart.js/auto';
import { IGlobalState } from '../../../store/global.reducers';
import { categorySelector } from '../../category-module/store/category.selector';
import { CategoryState } from '../../category-module/models/category';

interface PieChartOptions {
  responsive: boolean;
  maintainAspectRatio: boolean;
  plugins?: {
    datalabels?: {
      formatter: (value: number, ctx: any) => string;
      color: string;
      font: {
        weight: string;
        size: number;
      };
    };
  };
  title: {
    display: boolean;
    text: string;
  };
  legend: {
    position: string;
  };
  tooltip: {
    enabled: boolean;
  };
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  @ViewChild('pieChart') private pieChartRef!: ElementRef<HTMLCanvasElement>;

  categories$: Observable<Category[]>;
  orgId: string = '';

  constructor(
    private store: Store<{ global: IGlobalState, categories: CategoryState }>,
    private router: Router,
  ) { 
    this.categories$ = this.store.pipe(select(categorySelector));
    this.store.select(orgSelector).subscribe((org) => {
      this.orgId = org?._id;
      if(this.orgId) {
        this.store.dispatch(getCategoryRequest({ orgId: this.orgId }));
      }
    });
  }

  ngOnInit(): void {
    this.categories$.subscribe(categories => {
      if (categories) {
        this.createPieChart(categories);
      }else{
       console.log("Not able to create piechart")
      }
    });
  }

  createPieChart(categories?: Category[]): void {
    if (!categories) {
      console.error("No categories provided");
      return;
    }

    const canvas = this.pieChartRef?.nativeElement;
    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("Failed to get 2D rendering context");
      return;
    }

    const data = categories.map(category => category.numberOfAssets);
    const labels = categories.map(category => category.name);

    // Prepare options object
    const options: any = {
      responsive: true,
      maintainAspectRatio: false, // Set to false to customize aspect ratio
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