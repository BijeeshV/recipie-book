import {Routes} from '@angular/Router'
import {RecipeStartComponent} from './recipe-start.component'
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component'
import {RecipeAddComponent} from './recipe-add/recipe-add.component'
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component'
export const RECIPE_ROUTES:Routes=[
    {path:'',component:RecipeStartComponent},
    {path:'new',component:RecipeAddComponent},
    {path:':id',component:RecipeDetailComponent},
    {path:':id/edit',component:RecipeEditComponent}
];
