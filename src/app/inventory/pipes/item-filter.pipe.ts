import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/inventory';

@Pipe({
  name: 'itemFilter'
})
export class ItemFilterPipe implements PipeTransform {

  transform(items: Item[] | null, searchText: string): Item[] | null{
    console.log("Inside pipe", searchText);
    if (!items || !searchText) {
      return items;
    }
    return items.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
  }

}
