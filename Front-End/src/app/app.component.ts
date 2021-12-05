import { Component } from '@angular/core';


 //container to hold all different shapes on it
var shapes:shape[] = []
//flag to activate buttons
var remove_flag :boolean = false;
var move_flag :boolean = false;
var resize_flag :boolean = false;

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
  color:String;
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
	color = "black";
  type = "circle";
  area: Path2D = new Path2D;


	draw(canvasGlobal:CanvasRenderingContext2D) {
    this.area = new Path2D
    this.area.arc(this.x, this.y, 0.5*this.width, 0, 2*Math.PI);
    canvasGlobal.beginPath();
    canvasGlobal.arc(this.x, this.y, 0.5*this.width, 0, 2*Math.PI);
    canvasGlobal.stroke();


	}
}

//---------------------------------------------------------------------------//

class rect implements shape{
  x = getRandomInt(108,1260);
  y = getRandomInt(4,614);
  width = 120;
  height = 60;
  color = "black";
  type = "rect";
  area: Path2D = new Path2D;


  draw(canvasGlobal:CanvasRenderingContext2D) {
    this.area = new Path2D
    this.area.rect(this.x,this.y,this.width,this.height);
    canvasGlobal.beginPath();
    canvasGlobal.rect(this.x,this.y,this.width,this.height);
    canvasGlobal.stroke();

  }
}

//---------------------------------------------------------------------------//

class square implements shape{
	x = getRandomInt(108,1386);
	y = getRandomInt(4,614);
	width = 60;
  height = 60;
  color = "black"
  type = "square";
  area: Path2D = new Path2D;

	draw(canvasGlobal:CanvasRenderingContext2D) {
    this.area = new Path2D
    this.area.rect(this.x,this.y,this.width, this.width);
    canvasGlobal.beginPath();
    canvasGlobal.rect(this.x,this.y,this.width, this.width);
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
                shapes = shapes.filter(obj => obj !== shape)
                break;
              default:
                canvasGlobal.clearRect(shape.x-1,shape.y-1,shape.width+2,shape.height+2);
                shapes = shapes.filter(obj => obj !== shape)
                break;
            }
          }
        }
      }
    });
    if(remove_flag){
      document.getElementById("remove")!.style.backgroundColor = "rgb(0, 0, 0)"

    }
    else{
      document.getElementById("remove")!.style.backgroundColor = "rgb(246, 129, 60)"

    }
  }
  move(){
    var temp_shape : number = 0;
    var is_selected :boolean = false;
    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;
    move_flag = !move_flag;

    boardGlobal.addEventListener("mousedown",  e => {
      if(move_flag){
        for (var i = 0; i < shapes.length; i++){
          if(canvasGlobal.isPointInPath(shapes[i].area, e.offsetX, e.offsetY)){
            temp_shape = i;
            is_selected = true;
          }
        }
      }
    });

    boardGlobal.addEventListener("mousemove", e => {
      if(move_flag && is_selected){
        switch(shapes[temp_shape].type){
          case "circle":
            canvasGlobal.clearRect(shapes[temp_shape].x-(0.5*shapes[temp_shape].height)-1,shapes[temp_shape].y-(0.5*shapes[temp_shape].height)-1,shapes[temp_shape].width+2,shapes[temp_shape].height+2);

            break;
          default:
            canvasGlobal.clearRect(shapes[temp_shape].x-1,shapes[temp_shape].y-1,shapes[temp_shape].width+2,shapes[temp_shape].height+2);
            break;
        }
        shapes[temp_shape].x = e.offsetX;
        shapes[temp_shape].y = e.offsetY;
        shapes[temp_shape].draw(canvasGlobal)
      }
    });

    boardGlobal.addEventListener("mouseup", e => {
      is_selected = false;
    });

    if(move_flag){
      document.getElementById("move")!.style.backgroundColor = "rgb(0, 0, 0)"

    }
    else{
      document.getElementById("move")!.style.backgroundColor = "rgb(246, 129, 60)"

    }

  }

  resize(){

    var temp_shape : number = 0;
    var is_selected :boolean = false;
    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;
    resize_flag = !resize_flag;

    boardGlobal.addEventListener("mousedown",  e => {
      if(resize_flag){
        for (var i = 0; i < shapes.length; i++){
          if(canvasGlobal.isPointInPath(shapes[i].area, e.offsetX, e.offsetY)) {
            temp_shape = i;
            is_selected = true;
          }
        }
      }
    });

    boardGlobal.addEventListener("mousemove", e => {
      if(resize_flag && is_selected){
        switch(shapes[temp_shape].type){
          case "circle":
            canvasGlobal.clearRect(shapes[temp_shape].x-(0.5*shapes[temp_shape].height)-1,shapes[temp_shape].y-(0.5*shapes[temp_shape].height)-1,shapes[temp_shape].width+2,shapes[temp_shape].height+2);
            break;
          default:
            canvasGlobal.clearRect(shapes[temp_shape].x-1,shapes[temp_shape].y-1,shapes[temp_shape].width+2,shapes[temp_shape].height+2);
            break;
        }
        shapes[temp_shape].width += 2;
        shapes[temp_shape].height += 2;
        shapes[temp_shape].draw(canvasGlobal);
        console.log(e.offsetX);
        console.log(e.offsetY);

      }
    });

    boardGlobal.addEventListener("mouseup", e => {
      is_selected = false;

    });
    if(resize_flag){
      document.getElementById("resize")!.style.backgroundColor = "rgb(0, 0, 0)"

    }
    else{
      document.getElementById("resize")!.style.backgroundColor = "rgb(246, 129, 60)"

    }


  }


}
