import { Component, OnInit,Output ,EventEmitter} from '@angular/core';
import{Recipe} from '../recipe';
import{Ingredient} from '../../ingrediant';
@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

recipes:Recipe[]=[
  new Recipe("Summer Salad","Substantial salads for summer picnics and barbecues.","http://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/beetroot-feta-grain-salad.jpg",[]),
  new Recipe("Schnitzel","A schnitzel is meat, usually thinned by pounding with a meat tenderizer, that is fried in some kind of oil or fat","http://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-5.jpg",[])
];


  constructor() { }
@Output() recipeSelected=new EventEmitter<Recipe>();
  ngOnInit() {
  }
onSelected(recipe:Recipe){
  this.recipeSelected.emit(recipe);
}

}
