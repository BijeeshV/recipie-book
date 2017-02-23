import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder
} from '@angular/forms'
import { ActivatedRoute,Router} from '@angular/router';
import {Recipe} from '../recipe';
import {RecipeService} from '../recipe.service';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'rb-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit {

myForm: FormGroup;
private recipeIndex:number;
selectedRecipe:Recipe=new Recipe('qqq','qq','qq',[]);
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
      'ingredients': formBuilder.array([
        formBuilder.group({
          'name': ['', Validators.required],
          'amount': ['', Validators.required]
        })
      ])
    });
  }

  ngOnInit() {
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
   this.recipeService.addRecipe(this.selectedRecipe);
   this.router.navigate(['/recipes'])
   
  }
}
