import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  selectedCategory:any;

  Groceries=[ {"id":1, "todo":"buy groceries"},
{"id":2, "todo":"buy samples"}];

tools=[ {"id":1, "todo":"buy tools"},
{"id":2, "todo":"buy hair tools"}];
Mise=[ {"id":1, "todo":"buy Mise"},
{"id":2, "todo":"buy sample Mise"}];

plan4today=[ {"id":1, "todo":"plan 4 today"},
{"id":2, "todo":"buy samples plans"}];

model1:any={};
category;
  sub:any;
  checked:any;

  constructor(private route:ActivatedRoute, private router:Router) { 
    this.selectedCategory= sessionStorage.getItem('selectedCategory');
    this.checked=sessionStorage.getItem('saveUsername');
  }

  ngOnInit() {
    // this.selectedCategory= sessionStorage.getItem('selectedCategory');
    // console.log("from oninit",this.selectedCategory);
    this.route.paramMap.subscribe((params:ParamMap)=>{
      let catname=params.get('id');
      this.selectedCategory=catname;
    })

  }

  

  AddTodo()
  {
    console.log(this.selectedCategory);
    
    if(this.selectedCategory=='Groceries'){
      this.Groceries.push(this.model1);
      this.model1={};
      }
      else if(this.selectedCategory=='Mise'){
        this.Mise.push(this.model1);
        this.model1={};
      }
      else if(this.selectedCategory=="tools"){
        this.tools.push(this.model1);
        this.model1={};
      }
      else if(this.selectedCategory=="plan4today"){
        this.plan4today.push(this.model1);
        this.model1={};
      }
  }

  remove(i){
    if(this.selectedCategory=='Groceries'){
    this.Groceries.splice(i,1);
    }
    else if(this.selectedCategory=='Mise'){
      this.Mise.splice(i,1);
    }
    else if(this.selectedCategory=="tools"){
      this.tools.splice(i,1);
    }
    else if(this.selectedCategory=="plan4today"){
      this.plan4today.splice(i,1);
    }
  }

}
