import { Component, OnInit,OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder
} from '@angular/forms'
import { ActivatedRoute,Router} from '@angular/router';
import {Recipe} from '../recipe';
//import {Ingredient} from '../../Ingrediant';
import {Subscription} from 'rxjs/Rx';
import {RecipeService} from '../recipe.service';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
/*
class ingredients{
  constructor(public name:FormControl,public amount:number){}
}
*/

export class RecipeEditComponent implements OnInit,OnDestroy {
  myForm: FormGroup;
private subscription:Subscription;
private recipeIndex:number;
private isNew=true;
selectedRecipe:Recipe;
  constructor(private formBuilder: FormBuilder,
            private sls:ShoppingListService,
  private route:ActivatedRoute,
  private recipeService:RecipeService,
  private router:Router
  ) {
  

  }

  ngOnInit() {
    
    this.subscription=this.route.params.subscribe(
      (params:any)=>{
if(params.hasOwnProperty('id')){
  this.isNew=false;
      this.recipeIndex=params['id'];
      this.selectedRecipe=this.recipeService.getRecipe(this.recipeIndex);
}else{
  this.isNew=true;
  this.selectedRecipe=null;
}
this.initForm();
      }
   );
 
  }
  initForm(){
    
    let recipeName='';
    let recipeImageUrl='';
    let recipeContent='';
    let recipeIngredients:FormArray=new FormArray([]);
    if(!this.isNew){
for(let i=0;i<this.selectedRecipe.ingredients.length;i++){
  recipeIngredients.push(
    this.formBuilder.group({
      name:[this.selectedRecipe.ingredients[i].name,Validators.required],
      amount:[this.selectedRecipe.ingredients[i].amount,[Validators.required,Validators.pattern("\\d+")]]
      })
  );
}
recipeName=this.selectedRecipe.name;
  recipeImageUrl=this.selectedRecipe.imagePath;
  recipeContent=this.selectedRecipe.description;
  
    }else{

    }
    this.myForm=this.formBuilder.group({
    name:[recipeName,Validators.required],
    imagePath:[recipeImageUrl,Validators.required],
    description:[recipeContent,Validators.required],
    ingredients:recipeIngredients
  });
    }
  
  onSubmit() {
    const newRecipe=this.myForm.value;
    if(this.isNew){
      this.recipeService.addRecipe(newRecipe);
    }else{
      this.recipeService.editRecipe(this.selectedRecipe,newRecipe);
    }
    this.navigateBack();
  }
  onCancel(){
    this.navigateBack();
  }
  onAddItem(name:string,amount:string){
 (<FormArray>this.myForm.controls['ingredients']).push(
   this.formBuilder.group({
     name:[name,Validators.required],
      amount:[amount,[Validators.required,Validators.pattern("\\d+")]]
   })
 )
  }
  onRemoveItem(index:number){
    (<FormArray>this.myForm.controls['ingredients']).removeAt(index);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  private navigateBack(){
    this.router.navigate(["../"]);
  }
}
