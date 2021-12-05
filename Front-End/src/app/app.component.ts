import { Component } from '@angular/core';



//container to hold all different shapes on it
var shapes:shape[] = []
//flag to activate remove button
var remove_flag :boolean = false;

var fillColor:string = 'white';
var strokeColor:string = 'black';
var strokeWidth:number = 3;


//randomizer function :pick  a random value between two edges
function getRandomInt(min:number, max:number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}



//shape interface to cover all shapes under restricted contract
interface shape{
  x:number;
  y:number;
  width:number;
  height:number;
  fiCo:String;
  stCo:String;
  stWi:Number;
  area:Path2D;
  type:String;
  draw(canvasGlobal:CanvasRenderingContext2D):void;

}

//factory class to produce all kinds of shapes according to the given string
class factory{
  create(shape_name:String):shape{
    var shape:shape
    switch(shape_name.toLowerCase()){
      case "circle":
        shape = new circle();
        break;
      case "rect":
        shape = new rect();
        break;
      case "square":
        shape = new square();
        break;
      default:
        throw new Error;
    }
    return shape;
  }
}

//---------------------------------------------------------------------------//

class circle implements shape{
	x = getRandomInt(108,1300);
	y = getRandomInt(4,614);
  width = 80;
	height = 80;
  type = "circle";
  fiCo = fillColor;
  stCo = strokeColor;
  stWi = strokeWidth;
  area: Path2D = new Path2D;


	draw(canvasGlobal:CanvasRenderingContext2D) {

    this.area.arc(this.x, this.y, 0.5*this.width, 0, 2*Math.PI);
    canvasGlobal.beginPath();
    canvasGlobal.fillStyle = this.fiCo;
    canvasGlobal.strokeStyle = this.stCo;
    canvasGlobal.lineWidth = this.stWi;
    canvasGlobal.arc(this.x, this.y, 0.5*this.width, 0, 2*Math.PI);
    canvasGlobal.fill();
    canvasGlobal.stroke();

	}
}

//---------------------------------------------------------------------------//

class rect implements shape{
  x = getRandomInt(108,1260);
  y = getRandomInt(4,614);
  width = 120;
  height = 60;
  type = "rect";
  fiCo = fillColor;
  stCo = strokeColor;
  stWi = strokeWidth;
  area: Path2D = new Path2D;


  draw(canvasGlobal:CanvasRenderingContext2D) {

    this.area.rect(this.x,this.y,this.width,this.height);
    canvasGlobal.fillStyle = this.fiCo;
    canvasGlobal.strokeStyle = this.stCo;
    canvasGlobal.beginPath();
    canvasGlobal.rect(this.x,this.y,this.width,this.height);
    canvasGlobal.fill();
    canvasGlobal.stroke();
  }
}

//---------------------------------------------------------------------------//

class square implements shape{
	x = getRandomInt(108,1386);
	y = getRandomInt(4,614);
	width = 60;
  height = 60;
  type = "square";
  fiCo = fillColor;
  stCo = strokeColor;
  stWi = strokeWidth;
  area: Path2D = new Path2D;

	draw(canvasGlobal:CanvasRenderingContext2D) {

    this.area.rect(this.x,this.y,this.width, this.width);
    canvasGlobal.fillStyle = this.fiCo;
    canvasGlobal.strokeStyle = this.stCo;
    canvasGlobal.beginPath();
    canvasGlobal.rect(this.x,this.y,this.width, this.width);
    canvasGlobal.fill();
    canvasGlobal.stroke();
	}
}

//---------------------------------------------------------------------------//

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  factory :factory = new factory();
  title = 'Front-End';
  
  Pick_Color() {
    var fc = <HTMLInputElement>document.getElementById("fill_color");
    fillColor = fc.value;
    var sc = <HTMLInputElement>document.getElementById("stroke_color");
    strokeColor = sc.value;
    var sw = <HTMLInputElement>document.getElementById("stroke_width");
    var strwid : number = parseInt(sw.value);
    strokeWidth = strwid;
  }

  create_circle() {
    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;
    var circle: shape = this.factory.create("circle");
    circle.draw(canvasGlobal);
    shapes.push(circle);
  }
  create_rect(){
    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;
    var rect: shape = this.factory.create("rect");
    rect.draw(canvasGlobal);
    shapes.push(rect);

  }
  create_square(){
    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;
    var square: shape = this.factory.create("square");
    square.draw(canvasGlobal);
    shapes.push(square);

  }
  remove(){
    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;
    remove_flag = !(remove_flag);
    boardGlobal.addEventListener("mousedown",function (event) {
      if(remove_flag){
        for (var shape of shapes){
          if(canvasGlobal.isPointInPath(shape.area, event.offsetX, event.offsetY)){
            switch(shape.type){
              case "circle":
                canvasGlobal.clearRect(shape.x-(0.5*shape.height)-1,shape.y-(0.5*shape.height)-1,shape.width+2,shape.height+2);
                break;
              default:
                canvasGlobal.clearRect(shape.x-1,shape.y-1,shape.width+2,shape.height+2);

                break;
            }
          }
        }
      }
    })


  }
  resize(){

  }
}