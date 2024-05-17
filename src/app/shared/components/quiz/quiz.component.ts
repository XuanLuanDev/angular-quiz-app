import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
questions:any[]=[];
datas:any[]=[];
mode = 1;
numOfQuestion:number =0;
pages:any[]=[];
pageSize:number =5;
from:number =0;
answers:any[]=[];
limit =0;
categories:any[]=[];
category:any
constructor(private service:QuizService){

}
changeNum(e:any){
  if(e.target.value > this.datas.length){
    e.target.value = this.datas.length;
  }
}
  ngOnInit(): void {
    this.service.getAllCategory().subscribe(t=>{
      this.categories =t;
      if(this.categories.length>0){
        this.category =this.categories[0].path;
        this.service.getAllData(this.category).subscribe(c =>{
          this.datas = c;
        })
      }
    })
  }
  goToSetting(){
    this.mode =1;
    this.questions =[];
    this.answers =[];
    this.from =0;
  }
  start(){
    const shuffle = (array: string[]) => { 
      for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
      } 
      return array; 
    }; 
    this.datas = shuffle(this.datas);
    if(this.numOfQuestion > this.datas.length){
      this.numOfQuestion =this.datas.length;
    }
    this.from =0;
    this.mode = 2;
    this.questions =[];
    this.answers =[];
    for(let i =0;i<this.numOfQuestion;i++){
      this.datas[i].options = shuffle(this.datas[i].options);
      this.questions.push(this.datas[i]);
      this.answers.push({
        key:this.datas[i].title,
        value:""
      });
    }
   this.limit =(this.numOfQuestion < this.from+5)?this.numOfQuestion:this.from+5;
  }
  end(){
    this.mode = 3;
  }
  prev(){
    this.from =this.from -this.pageSize;
    this.limit =(this.numOfQuestion < this.from+5)?this.numOfQuestion:this.from+5;
  }
  next(){
    this.from =this.from + this.pageSize;
    this.limit =(this.numOfQuestion < this.from+5)?this.numOfQuestion:this.from+5;
  }
  selectOption(q:any,opt:any){
    for(let i =0;i<this.numOfQuestion;i++){
      if(this.answers[i].key == q.title){
        this.answers[i].value =opt;
      }
    }
  }
}
