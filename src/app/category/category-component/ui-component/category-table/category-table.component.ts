import { Component, Input} from '@angular/core';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.scss'
})

export class CategoryTableComponent {
  @Input() categories: Category[] | null = null;

}
