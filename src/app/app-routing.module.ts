import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriesComponent} from '../app/categories/categories.component';
import { TodoComponent } from './todo/todo.component';


const routes: Routes = [
  {path:"", redirectTo:"/categories", pathMatch:"full"},
 {path:"categories", component:CategoriesComponent,children:[
 {path:"todos/:id",component:TodoComponent}]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
