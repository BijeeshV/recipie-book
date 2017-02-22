import { Injectable } from '@angular/core';
import{Recipe } from './recipe';
import{Ingredient } from '../ingrediant';
@Injectable()
export class RecipeService {
private recipes:Recipe[]=[
  new Recipe("Summer Salad","Substantial salads for summer picnics and barbecues.","http://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/beetroot-feta-grain-salad.jpg",[
    new Ingredient("French Fries",2),
    new Ingredient("Pork Meat",1)
  ]),
  new Recipe("Schnitzel","A schnitzel is meat, usually thinned by pounding with a meat tenderizer, that is fried in some kind of oil or fat","http://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-5.jpg",[])
];

  constructor() { }
  getRecipes(){
    return this.recipes;
  }
  getRecipe(id:number){
    return this.recipes[id];
  }
deleteRecipe(recipe:Recipe){
  this.recipes.splice(this.recipes.indexOf(recipe),1);
}
}
