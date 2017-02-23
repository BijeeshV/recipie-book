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
selectedRecipe:Recipe;
  constructor(private formBuilder: FormBuilder,
            private sls:ShoppingListService,
  private route:ActivatedRoute,
  private recipeService:RecipeService,
  private router:Router
  ) {
  /*  this.myForm = new FormGroup({
      'recipe': new FormGroup({
        'name': new FormControl('', Validators.required),
        'description': new FormControl('', Validators.required),
        'imagePath': new FormControl('', Validators.required)
      }),
      'ingredients': new FormArray([
        new FormGroup({
          'name': new FormControl('', Validators.required),
          'amount': new FormControl('', Validators.required)
        })
      ])
    });
    */
    this.myForm = formBuilder.group({
      'recipe': formBuilder.group({
        'name': ['', Validators.required],
        'description': ['', Validators.required],
        'imagePath': ['', Validators.required]
      }),
      'ingredients': formBuilder.array([]/*[
        formBuilder.group({
          'name': ['', Validators.required],
          'amount': ['', Validators.required]
        })
      ]*/)
    });
  }

  ngOnInit() {
    this.subscription=this.route.params.subscribe(
      (params:any)=>{
this.recipeIndex=params['id'];
this.selectedRecipe=this.recipeService.getRecipe(this.recipeIndex);
      }
    );
    (<FormGroup>this.myForm.controls['recipe']).patchValue({
      'name':this.selectedRecipe.name,
      'description':this.selectedRecipe.description,
      'imagePath':this.selectedRecipe.imagePath
      
    });
    this.selectedRecipe.ingredients.forEach(element => {
      (<FormArray>this.myForm.controls['ingredients']).push(this.formBuilder.group({
      'name':element.name,
      'amount':element.amount
    }));
    });
    
  }
  onAddIngredient() {
    (<FormArray>this.myForm.controls['ingredients']).push(new FormGroup({
      'name': new FormControl('', Validators.required),
      'amount': new FormControl('', Validators.required)
    }))
  }
  onSubmit() {
    this.selectedRecipe.name=this.myForm.value.recipe.name;
    this.selectedRecipe.description=this.myForm.value.recipe.description;
    this.selectedRecipe.imagePath=this.myForm.value.recipe.imagePath;
    this.selectedRecipe.ingredients=this.myForm.value.ingredients;
    this.recipeService.updateRecipe(this.recipeIndex,this.selectedRecipe);
    this.router.navigate(['/recipes',this.recipeIndex])
    //console.log(this.selectedRecipe);
    //console.log(this.recipeIndex);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
