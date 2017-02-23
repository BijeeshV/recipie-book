import { Component, OnInit } from '@angular/core';
import {FormGroup,
  FormControl,
  Validators,
  FormArray
} from '@angular/forms'

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

export class RecipeEditComponent implements OnInit {
myForm:FormGroup;

  constructor() {
    this.myForm=new FormGroup({
      'recipe':new FormGroup({
        'name':new FormControl('',Validators.required),
      'description':new FormControl('',Validators.required),
      'imagePath':new FormControl('',Validators.required)
      }),
      'ingredients':new   FormArray([
         new FormGroup({
            'name':new FormControl('',Validators.required),
            'amount':new FormControl('',Validators.required)
         })       
      ])
    });
   }

  ngOnInit() {
  }
  onAddIngredient()
  {
    (<FormArray>this.myForm.controls['ingredients']).push(new FormGroup({
      'name':new FormControl('',Validators.required),
      'amount':new FormControl('',Validators.required)
    }))
  }
  onSubmit(){
    console.log(this.myForm);
  }
}
