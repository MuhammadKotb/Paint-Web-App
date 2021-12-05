import { Component } from '@angular/core';

function getRandomInt(min:number, max:number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}



//shape interface to cover all shapes under restricted contract
interface shape{
  x:number;
  y:number;
  color:String;
  board:HTMLCanvasElement | undefined;
  canvas:CanvasRenderingContext2D | undefined;
  draw(canvas:CanvasRenderingContext2D,board:HTMLCanvasElement):void;
  getDim(n : number) : number;

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
	radius = 40;
	color = "black";
  board: HTMLCanvasElement | undefined;
  canvas: CanvasRenderingContext2D | undefined;
	getDim(n : number){
		var res : number = 0;
		if(n == 1){
			res = this.radius;
		}
		return res;
	}
	draw(canvas:CanvasRenderingContext2D,board:HTMLCanvasElement) {
    this.canvas=canvas;
    this.board=board;
		canvas.beginPath();
		canvas.arc(this.x,this.y,this.radius,0,2*Math.PI);
		canvas.stroke();
	}
}

//---------------------------------------------------------------------------//

class rect implements shape{
  x = getRandomInt(108,1260);
  y = getRandomInt(4,614);
  width = 120;
  height = 60;
  color = "black";
  board: HTMLCanvasElement | undefined;
  canvas: CanvasRenderingContext2D | undefined;
  getDim(n : number){
	var res : number = 0;
	if(n == 1){
		res = this.width;
	}
	else if(n == 2){
		res = this.height;
	}
	return res;
}
  draw(canvas:CanvasRenderingContext2D,board:HTMLCanvasElement) {
    this.canvas=canvas;
    this.board=board;
    canvas.beginPath();
    canvas.rect(this.x,this.y,this.width,this.height);
    canvas.stroke();
  }
}

//---------------------------------------------------------------------------//

class square implements shape{
	x = getRandomInt(108,1386);
	y = getRandomInt(4,614);
	width = 60;
	color = "black";
  board: HTMLCanvasElement | undefined;
  canvas: CanvasRenderingContext2D | undefined;

	getDim(n : number){
		var res : number = 0;
		if(n == 1){
			res = this.width;
		}
		return res;
	}
	draw(canvas:CanvasRenderingContext2D,board:HTMLCanvasElement) {
    this.canvas=canvas;
    this.board=board;
		canvas.beginPath();
		canvas.rect(this.x,this.y,this.width,this.width);
		canvas.stroke();
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
	  var board = document.createElement('canvas');
	  var canvas = board.getContext('2d')!;
    var circle: shape = this.factory.create("circle");
    circle.draw(canvas,board);
	  canvasGlobal.drawImage(board, circle.x, circle.y);
  }
  create_rect(){
    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;
    var board = document.createElement('canvas');
	  var canvas = board.getContext('2d')!;
    var rect: shape = this.factory.create("rect");
    rect.draw(canvas,board);
    canvasGlobal.drawImage(board, rect.x, rect.y);

  }
  create_square(){
    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;
    var board = document.createElement('canvas');
	  var canvas = board.getContext('2d')!;
    var square: shape = this.factory.create("square");
    square.draw(canvas,board);
    canvasGlobal.drawImage(board, square.x, square.y);

  }
}
