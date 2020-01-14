import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories=[
    {"id":1, "categoryName":"Groceries"},
  {"id":2, "categoryName":"tools"},
  {"id":3, "categoryName":"Mise"},
  {"id":4, "categoryName":"plan4today"}

  ];

  categories1=[
    {"id":1, "categoryName":"Groceries",
    "todo":[
      {"id":1,"todoName":"Groceries_todo1"},
      {"id":2,"todoName":"Groceries_todo2"}
      ]},
  {"id":2, "categoryName":"tools",
  "todo":[
      {"id":1,"todoName":"tools_todo1"},
      {"id":2,"todoName":"tools_todo2"}
      ]}
  ];
 // categories: any=[];
add:boolean=false;
// seleced:boolean:false;
public show:number;
  model:any={};
  constructor(private router:Router,private cat:HttpService) { }

  ngOnInit() {
  // this.getCategories();
  }
   AddCategory()
    {
    this.categories.push(this.model);
    this.add=true;
     this.model={};
   }

  // getCategories() {
  //   return this.cat.getChapters().subscribe((data: {}) => {
  //     this.categories = data;
  //   })
  // }

  
  selectedCategory(category)
  {
    console.log(category);  
    sessionStorage.setItem("selectedCategory",category.categoryName);
    this.router.navigate(['/categories/todos',category.categoryName]);
  }

  myfunc(index){
this.show = index;
  }

  remove(c,index){

  let newArr = this.categories1;
    let cc = JSON.stringify(c);
    console.log(cc+'-'+index);
   //cc.splice(index, 1);
  this.categories1.forEach(ea =>{
    ea.todo.splice(index, 1);
  })


  }
}
