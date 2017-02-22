import { Ingredient } from '../ingrediant';

export class ShoppingListService {

private items:Ingredient[]=[];
  constructor() { }
  getItems(){
    return this.items;
  }
  pushItems(items:Ingredient[]){
    Array.prototype.push.apply(this.items,items);
  }
}
