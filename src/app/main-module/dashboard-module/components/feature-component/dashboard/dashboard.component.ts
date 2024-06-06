import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from '../../../../category-module/models/category';
import { getCategoryRequest } from '../../../../category-module/store/category.action';
import { categorySelector } from '../../../../category-module/store/category.selector';
import { CategoryState } from '../../../../category-module/models/category';
import { DashboardState, InventoryCount, ChartOptions } from '../../../models/dashboard';
import { getLoading, inventoryCountSelector } from '../../../store/dashboard.selector';
import { getInventoryCountsRequest } from '../../../store/dashboard.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  categories$: Observable<Category[]>;
  inventoryCounts$: Observable<InventoryCount[]>;
  private destroy$ = new Subject<void>();

  categoryChartData!: [string, number][];
  categoryChartOptions!: ChartOptions;
  categoryChartColumns: { type: string, label: string }[] = [];

  inventoryChartData!: [string, number, number][];
  inventoryChartOptions!: ChartOptions;
  inventoryChartColumns: { type: string, label: string }[] = [];

  isLoading: boolean = false;

  constructor(
    private store: Store<{ categories: CategoryState, dashboard: DashboardState }>
  ) {
    this.categories$ = this.store.pipe(select(categorySelector));
    this.inventoryCounts$ = this.store.pipe(select(inventoryCountSelector));

    // this.store.pipe(select(getLoading), takeUntil(this.destroy$)).subscribe((loading) => this.isLoading = loading);
  }

  ngOnInit(): void {
    this.store.dispatch(getCategoryRequest());
    // this.store.dispatch(getInventoryCountsRequest());

    this.categories$
      .pipe(takeUntil(this.destroy$))
      .subscribe(categories => {
        if (categories && categories.length > 0) {
          this.prepareCategoryChartData(categories);
        }
      });

    // this.inventoryCounts$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(items => {
    //     if (items && items.length > 0) {
    //       this.prepareInventoryChartData(items);
    //     }
    // });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  prepareCategoryChartData(categories: Category[]): void {
    this.categoryChartData = categories.map(category => [category.name, category.numberOfAssets]);

    this.categoryChartOptions = {
      title: 'Assets per Category',
      hAxis: {
        title: 'Number of Assets'
      },
      vAxis: {
        title: 'Category'
      },
      legend: { position: 'none' },
      colors: ['#3399ff', '#66b2ff', '#99ccff', '#cce5ff', '#e6f2ff'],
      backgroundColor: '#f9f9f9',
    };
    this.categoryChartColumns = [
      { type: 'string', label: 'Category' },
      { type: 'number', label: 'Number of Assets' }
    ];
  }

  // prepareInventoryChartData(inventoryCounts: InventoryCount[]): void {
  //   this.inventoryChartData = inventoryCounts.map(item => [item.itemName, item.assignedCount, item.availableCount]);

  //   this.inventoryChartOptions = {
  //     title: 'Inventory Counts',
  //     hAxis: {
  //       title: 'Item Name'
  //     },
  //     vAxis: {
  //       title: 'Count'
  //     },
  //     legend: { position: 'top' },
  //     colors: ['#ff6666', '#3399ff'],
  //     backgroundColor: '#f9f9f9',
  //   };
  //   this.inventoryChartColumns = [
  //     { type: 'string', label: 'Item Name' },
  //     { type: 'number', label: 'Assigned Count' },
  //     { type: 'number', label: 'Available Count' }
  //   ];
  // }
}
