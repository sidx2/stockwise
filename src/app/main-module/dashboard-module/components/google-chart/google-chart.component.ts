import { Component, Input, OnInit, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

declare global {
  interface Window { google: any; }
}

@Component({
  selector: 'app-google-chart',
  templateUrl: './google-chart.component.html',
  styleUrls: ['./google-chart.component.scss']
})
export class GoogleChartComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() chartType: string = 'PieChart'; 
  @Input() data: any[] = []; 
  @Input() options: any = {}; 
  @Input() columns: { type: string, label: string }[] = []; 
  @ViewChild('chart', { static: true }) chart!: ElementRef;

  private isGoogleChartsLoaded: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.loadGoogleCharts();
  }

  ngAfterViewInit(): void {
    if (this.isGoogleChartsLoaded) {
      this.drawChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['data'] && !changes['data'].firstChange) || (changes['chartType'] && !changes['chartType'].firstChange)) {
      if (this.isGoogleChartsLoaded) {
        this.drawChart();
      }
    }
  }

  loadGoogleCharts(): void {
    if (typeof window.google === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.onload = () => {
        window.google.charts.load('current', { packages: ['corechart'] });
        window.google.charts.setOnLoadCallback(() => {
          this.isGoogleChartsLoaded = true;
          this.drawChart();
        });
      };
      document.head.appendChild(script);
    } else {
      window.google.charts.load('current', { packages: ['corechart'] });
      window.google.charts.setOnLoadCallback(() => {
        this.isGoogleChartsLoaded = true;
        this.drawChart();
      });
    }
  }

  drawChart(): void {
    if (!this.isGoogleChartsLoaded || !this.data.length || !this.chart || !this.chartType || !this.columns.length) {
      return;
    }

    console.log('Drawing chart with data:', this.data);

    const dataTable = new window.google.visualization.DataTable();
    this.columns.forEach(col => dataTable.addColumn(col.type, col.label));
    dataTable.addRows(this.data);

    let chart;
    switch (this.chartType) {
      case 'PieChart':
        chart = new window.google.visualization.PieChart(this.chart.nativeElement);
        break;
      case 'BarChart':
        chart = new window.google.visualization.BarChart(this.chart.nativeElement);
        break;
      case 'LineChart':
        chart = new window.google.visualization.LineChart(this.chart.nativeElement);
        break;
      default:
        console.error('Unsupported chart type');
        return;
    }

    chart.draw(dataTable, this.options);
  }
}
