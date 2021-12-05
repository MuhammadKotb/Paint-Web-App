import { Component } from '@angular/core';
import { range } from 'rxjs';

var serial =range(1,100000000)

function getRandomInt(min:number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



//shape interface to cover all shapes under restricted contract
interface shape{
  x:Number;
  y:Number;
  color:String;
  draw(canvas:CanvasRenderingContext2D):void;

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

class circle implements shape{
  x = getRandomInt(108,1300);
  y = getRandomInt(4,614);
  radius = 40;
  color = "black";
  draw(canvas:CanvasRenderingContext2D) {
    canvas.beginPath();
    canvas.arc(this.x,this.y,this.radius,0,2*Math.PI);
    canvas.stroke();
  }
}
class rect implements shape{
  x = getRandomInt(108,1260);
  y = getRandomInt(4,614);
  width = 120;
  height = 60;
  color = "black";
  draw(canvas:CanvasRenderingContext2D) {
    canvas.beginPath();
    canvas.rect(this.x,this.y,this.width,this.height);
    canvas.stroke();
  }
}
class square implements shape{
  x = getRandomInt(108,1386);
  y = getRandomInt(4,614);
  width = 60;
  color = "black";
  draw(canvas:CanvasRenderingContext2D) {
    canvas.beginPath();
    canvas.rect(this.x,this.y,this.width,this.width);
    canvas.stroke();
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  factory :factory = new factory();
  title = 'Front-End';
  create_circle() {
    var board = (<HTMLCanvasElement>document.getElementById("board"));
    var canvas = board.getContext("2d")!;
    var circle: shape = this.factory.create("circle");
    circle.draw(canvas)
  }
  create_rect(){
    var board = (<HTMLCanvasElement>document.getElementById("board"));
    var canvas = board.getContext("2d")!;
    var rect: shape = this.factory.create("rect");
    rect.draw(canvas)
  }
  create_square(){
    var board = (<HTMLCanvasElement>document.getElementById("board"));
    var canvas = board.getContext("2d")!;
    var square: shape = this.factory.create("square");
    square.draw(canvas)
  }
}
