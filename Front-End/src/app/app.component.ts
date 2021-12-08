import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { paintServices } from './app.services';
import { range } from 'rxjs';




 //container to hold all different shapes on it
var shapes:shape[] = [];
var shapesBack:shapeBack[] = [];
let canvasArea = new Map<string, Path2D>();

//flag to activate buttons
var remove_flag :boolean = false;
var move_flag :boolean = false;
var resize_flag :boolean = false;
var fill_flag :boolean = false;
var copy_flag : boolean = false;

var create_line_flag : boolean = false;
var created_line : boolean = false;

var create_circle_flag : boolean = false;
var created_circle : boolean = false;

var create_rect_flag : boolean = false;
var created_rect : boolean = false;

var create_square_flag : boolean = false;
var created_square : boolean = false;

var create_ellipse_flag : boolean = false;
var created_ellipse : boolean = false;

var create_triangle_flag : boolean = false;
var created_triangle : boolean = false;

var circleButtonFlag : boolean = false;
var squareButtonFlag : boolean = false;
var rectButtonFlag : boolean = false;
var lineButtonFlag : boolean = false;
var triangleButtonFlag : boolean = false;
var ellipseButtonFlag : boolean = false;


var found : boolean = false;

var strokeColor:string = 'black';
var strokeWidth:number = 3;
var serial = Array.from(Array(1000000).keys());

//randomizer function :pick  a random value between two edges
function getRandomInt(min:number, max:number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get_new_ID():string {
  var ID =   serial.pop()
  return (ID.toString())

}

//shape interface to cover all shapes under restricted contract
interface shape{
  x:number;
  y:number;
  width:number;
  height:number;
  fiCo:String;
  stCo:String;
  stWi:number;
  area:Path2D;
  type:String;
  is_filled:boolean;

  draw(canvasGlobal:CanvasRenderingContext2D,fillcolor:string):void;

}
export interface shapeBack{
  x:number;
  y:number;
  width:number;
  height:number;
  fiCo:string;
  stCo:string;
  stWi:number;
  type:string;
  is_filled:boolean;
  shapeID:string;
}

//factory class to produce all kinds of shapes according to the given string
class factory{
  create(shape_name:String):shape{
    var shape:shape
    switch(shape_name.toLowerCase()){
      case "line":
        shape = new line();
        break;
      default:
        throw new Error;
    }
    return shape;
  }
}


//---------------------------------------------------------------------------//

class line implements shape{
  x = getRandomInt(124,1380);
	y = getRandomInt(70,580);
  width = 0;
	height = 0;
  type = "line";
  fiCo = "";
  stCo = strokeColor;
  stWi = strokeWidth;
  area: Path2D = new Path2D;
  is_filled = false

  draw(canvasGlobal:CanvasRenderingContext2D,fillcolor:string) {

      this.area = new Path2D
      this.area.moveTo(this.x, this.y);
      this.area.lineTo(this.width,  this.height);
      this.area.closePath;
      canvasGlobal.beginPath();
      canvasGlobal.strokeStyle = this.stCo;
      canvasGlobal.lineWidth = this.stWi;
      canvasGlobal.moveTo(this.x, this.y);
      canvasGlobal.lineTo(this.width, this.height);
      canvasGlobal.closePath();
      canvasGlobal.stroke();

  }
}



//----------------------------------------------------------------------//

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  factory :factory = new factory();
  title = 'Front-End';

  constructor(private paintServ: paintServices) {}

  getCanvas()  {

    this.paintServ.getCanvas().subscribe((data : shapeBack[])=> {shapesBack = data; console.log(shapesBack);console.log(canvasArea)});
  }




  drawShape(shape : shapeBack, fillcolor : string){
    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;

    var x = shape.x;
    var y = shape.y;
    var width = shape.width;
    var height = shape.height;
    var stCo = shape.stCo;
    var fiCo = shape.fiCo;
    var stWi = shape.stWi;
    var isfilled = shape.is_filled;
    var type = shape.type;
    var ID = shape.shapeID;

    var area:Path2D|null = new Path2D();
    switch(type){
      case "circle":
        if(fillcolor != ""){
          shape.fiCo = fillcolor
          fiCo = fillcolor;
        }
        if(isfilled){
          area.arc(x, y, 0.5*width, 0, 2*Math.PI);
          canvasGlobal.beginPath();
          canvasGlobal.strokeStyle = stCo;
          canvasGlobal.lineWidth = stWi;
          canvasGlobal.fillStyle = fiCo;
          canvasGlobal.arc(x, y, 0.5*width, 0, 2*Math.PI);
          canvasGlobal.fill();
          canvasGlobal.stroke();
        }
        else{
          area.arc(x, y, 0.5*width, 0, 2*Math.PI);
          canvasGlobal.beginPath();
          canvasGlobal.strokeStyle = stCo;
          canvasGlobal.lineWidth = stWi;
          canvasGlobal.arc(x, y, 0.5*width, 0, 2*Math.PI);
          canvasGlobal.stroke();
        }
        canvasArea.set(ID, area);
        area = null;
        break;
      case "square" :
        if(fillcolor != ""){
          shape.fiCo = fillcolor
          fiCo = fillcolor;
        }
        if(isfilled){
          area.rect(x, y, width, width);
          canvasGlobal.strokeStyle = stCo;
          canvasGlobal.lineWidth = stWi;
          canvasGlobal.fillStyle = fiCo;
          canvasGlobal.beginPath();
          canvasGlobal.rect(x, y, width, width);
          canvasGlobal.fill()
          canvasGlobal.stroke();
        }
        else{
          area.rect(x, y, width, width);
          canvasGlobal.strokeStyle = stCo;
          canvasGlobal.lineWidth = stWi;
          canvasGlobal.beginPath();
          canvasGlobal.rect(x, y, width, width);
          canvasGlobal.stroke();
        }
        canvasArea.set(ID, area);
        area = null;
        break;
      case "rect" :
        if(fillcolor != ""){
          shape.fiCo = fillcolor
          fiCo = fillcolor;
        }
        if(isfilled){
          area.rect(x, y, width, height);
          canvasGlobal.strokeStyle = stCo;
          canvasGlobal.lineWidth = stWi;
          canvasGlobal.fillStyle = fiCo;
          canvasGlobal.beginPath();
          canvasGlobal.rect(x, y, width, height);
          canvasGlobal.fill()
          canvasGlobal.stroke();
        }
        else{
          area.rect(x, y, width, height);
          canvasGlobal.strokeStyle = stCo;
          canvasGlobal.lineWidth = stWi;
          canvasGlobal.beginPath();
          canvasGlobal.rect(x, y, width, height);
          canvasGlobal.stroke();
        }
        canvasArea.set(ID, area);
        area = null;
        break;

        case "triangle" :
          if(fillcolor != ""){
            shape.fiCo = fillcolor
            fiCo = fillcolor;
          }
          if(isfilled){

            area.moveTo(x, y);
            area.lineTo(x - width/2, y + height);
            area.lineTo(x + width/2, y + height);
            area.lineTo(x, y);
            canvasGlobal.strokeStyle = stCo;
            canvasGlobal.lineWidth = stWi;
            canvasGlobal.fillStyle = fiCo;
            canvasGlobal.beginPath();
            canvasGlobal.moveTo(x, y);
            canvasGlobal.lineTo(x - width/2, y + height);
            canvasGlobal.lineTo(x + width/2, y + height);
            canvasGlobal.lineTo(x, y);
            canvasGlobal.fill()
            canvasGlobal.stroke();
          }
          else{
            area.moveTo(x, y);
            area.lineTo(x - width/2, y + height);
            area.lineTo(x + width/2, y + height);
            area.lineTo(x, y);
            canvasGlobal.strokeStyle = stCo;
            canvasGlobal.lineWidth = stWi;
            canvasGlobal.beginPath();
            canvasGlobal.moveTo(x, y);
            canvasGlobal.lineTo(x - width/2, y + height);
            canvasGlobal.lineTo(x + width/2, y + height);
            canvasGlobal.lineTo(x, y);
            canvasGlobal.stroke();
          }
          canvasArea.set(ID, area);
          area = null;
          break;

        case "ellipse":
          if(fillcolor != ""){
            shape.fiCo = fillcolor
            fiCo = fillcolor;
          }
          if(isfilled){
            area.ellipse(x, y, width/2, height/2, 0, 0, 2*Math.PI);
            canvasGlobal.strokeStyle = stCo;
            canvasGlobal.lineWidth = stWi;
            canvasGlobal.fillStyle = fiCo;
            canvasGlobal.beginPath();
            canvasGlobal.ellipse(x, y, width/2, height/2, 0, 0, 2*Math.PI);
            canvasGlobal.fill()
            canvasGlobal.stroke();
          }else{
            area.ellipse(x, y, width/2, height/2, 0, 0, 2*Math.PI);
            canvasGlobal.strokeStyle = stCo;
            canvasGlobal.lineWidth = stWi;
            canvasGlobal.beginPath();
            canvasGlobal.ellipse(x, y, width/2, height/2, 0, 0, 2*Math.PI);
            canvasGlobal.stroke();
          }
          canvasArea.set(ID, area);
          area = null;
          break;

        case "line":
          area.moveTo(x, y);
          area.lineTo(width,  height);
          area.closePath;
          canvasGlobal.beginPath();
          canvasGlobal.strokeStyle = stCo;
          canvasGlobal.lineWidth = stWi;
          canvasGlobal.moveTo(x, y);
          canvasGlobal.lineTo(width, height);
          canvasGlobal.closePath();
          canvasGlobal.stroke();

          canvasArea.set(ID, area);
          area = null;
          break;
        default:
          break;
    }

  }



  confirm_stroke() {
    var sc = <HTMLInputElement>document.getElementById("stroke_color");
    strokeColor = sc.value;
    var sw = <HTMLInputElement>document.getElementById("stroke_width");
    var strwid : number = parseInt(sw.value);
    strokeWidth = strwid;
  }
  fill_color() {
    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;

    var fc = <HTMLInputElement>document.getElementById("fill_color");
    var fillcolor = fc.value;

    fill_flag = !fill_flag;
    boardGlobal.addEventListener("mousedown",e =>{
      if(fill_flag){


        this.paintServ.getCanvas().subscribe((data : shapeBack[]) =>{
          shapesBack = data
          for (var shape of shapesBack){

            if(canvasGlobal.isPointInPath(canvasArea.get(shape.shapeID), e.offsetX, e.offsetY)){

              shape.is_filled = true;
              this.drawShape(shape,fillcolor);
              this.paintServ.postCanvas(shapesBack)



            }
          }
        });

      }
    });

    if(fill_flag){
      document.getElementById("fill")!.style.backgroundColor = "rgba(47, 24, 10, 0.856)"

    }
    else{
      document.getElementById("fill")!.style.backgroundColor = "rgb(246, 129, 60)"

    }
  }



  create_line(){
    create_circle_flag = false;
    create_square_flag = false;
    create_rect_flag = false;
    create_triangle_flag = false;
    create_ellipse_flag = false;


    created_circle = false;
    created_square = false;
    created_rect = false;
    created_triangle = false;
    created_ellipse = false;

    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;
    var line :any= this.factory.create("line");
    create_line_flag = true;
    created_line = false;
    var selectLine = false;
    boardGlobal.addEventListener("mousedown",e=>{

      if(!created_line && (line != null) && lineButtonFlag){

        line.x = e.offsetX;
        line.y = e.offsetY;
        selectLine = true;
        created_line = true;

      }


    });

    boardGlobal.addEventListener("mousemove", e => {
      if(create_line_flag && selectLine && (line != null) && lineButtonFlag){
        canvasGlobal.clearRect(0,0,1380,675);

        line.width = e.offsetX;
        line.height = e.offsetY;
        line.draw(canvasGlobal,"");
        for(var i = 0; i < shapes.length; i++){
          shapes[i].draw(canvasGlobal,"");
        }
      }

    });
    boardGlobal.addEventListener("mouseup", e => {
      if(lineButtonFlag){
        create_line_flag =false;
        created_line = true;
        selectLine = false;
        if(line != null && (line.width != 0 && line.height != 0)){
          shapes.push(line);

      }
      line = null;

        document.getElementById("line")!.style.backgroundColor = "rgb(246, 129, 60)"
      }

    });

    if(create_line_flag){
      document.getElementById("line")!.style.backgroundColor = "rgba(47, 24, 10, 0.856)"

    }


  }

  createLine(){

    create_circle_flag = false;
    create_square_flag = false;
    create_rect_flag = false;
    create_triangle_flag = false;
    create_ellipse_flag = false;


    created_circle = false;
    created_square = false;
    created_rect = false;
    created_triangle = false;
    created_ellipse = false;

    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;
    var line :any= this.factory.create("line");
    create_line_flag = true;
    created_line = false;

  }


  createTriangle(){

    create_square_flag = false;
    create_line_flag = false;
    create_circle_flag = false;
    create_rect_flag = false;
    create_ellipse_flag = false;

    created_square = false;
    created_line = false;
    created_circle = false;
    created_rect = false;
    created_ellipse = false;

    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;

    create_triangle_flag = true;
    created_triangle = false;

    var triangle : shapeBack|null;


    this.paintServ.createShape("triangle").subscribe((data : shapeBack) =>{triangle = data});

    boardGlobal.addEventListener("mousedown",e=>{

      if(!created_triangle && (triangle != null) && triangleButtonFlag){

        triangle.x = parseInt(e.offsetX.toString());
        triangle.y = parseInt(e.offsetY.toString());
        triangle.stCo = strokeColor
        triangle.stWi = strokeWidth
        console.log(triangle.x);
        console.log(triangle.y);
        create_triangle_flag =false;
        created_triangle = true;
        this.paintServ.postShape({
        x:triangle.x,
        y:triangle.y,
        width:60,
        height:parseInt((Math.sqrt(3/2) * 60).toString()),
        fiCo:triangle.fiCo,
        stCo:triangle.stCo,
        stWi:triangle.stWi,
        type:triangle.type,
        is_filled:triangle.is_filled,
        shapeID : get_new_ID()

        }).subscribe((data : shapeBack) => {
          this.drawShape(data, "");
          shapesBack.push(data)
        })
        triangle = null;

      }


    });

    boardGlobal.addEventListener("mouseup",e=>{
      if(triangleButtonFlag){

        created_triangle = true;
        create_triangle_flag = false;
<<<<<<< HEAD
        triangle = null;
      
=======

>>>>>>> 6d16ecc1f5101b351ef83a4890e76515b5a9ea35

        document.getElementById("triangle")!.style.backgroundColor = "rgb(246, 129, 60)"

      }

    });
    if(create_triangle_flag){
      document.getElementById("triangle")!.style.backgroundColor = "rgba(47, 24, 10, 0.856)"

    }
  }

  createCircle(){
    create_square_flag = false;
    create_line_flag = false;
    create_rect_flag = false;
    create_triangle_flag = false;
    create_ellipse_flag = false;

    created_square = false;
    created_line = false;
    created_rect = false;
    created_triangle = false;
    created_ellipse = false;

    create_circle_flag = true;
    created_circle = false;


    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;

    var circle : shapeBack|null;
    this.paintServ.createShape("circle").subscribe((data : shapeBack) =>{circle = data});



    boardGlobal.addEventListener("mousedown",e=>{

      if(!created_circle && (circle != null) && circleButtonFlag){

        circle.x = parseInt(e.offsetX.toString());
        circle.y = parseInt(e.offsetY.toString());
        circle.stCo = strokeColor
        circle.stWi = strokeWidth
        console.log(circle.x);
        console.log(circle.y);
        create_circle_flag = false;
        created_circle = true;
        this.paintServ.postShape({
          x:circle.x,
          y:circle.y,
          width:circle.width,
          height:circle.height,
          fiCo:circle.fiCo,
          stCo:circle.stCo,
          stWi:circle.stWi,
          type:circle.type,
          is_filled:circle.is_filled,
          shapeID : get_new_ID()

        }).subscribe((data : shapeBack) => {
          this.drawShape(data, "");
          shapesBack.push(data)

        })
        circle = null
        }

    });


    boardGlobal.addEventListener("mouseup",e=>{
      if(circleButtonFlag){

        created_circle = true;
        create_circle_flag = false;
        circle = null;

        document.getElementById("circle")!.style.backgroundColor = "rgb(246, 129, 60)"

      }

    });
    if(create_circle_flag){
      document.getElementById("circle")!.style.backgroundColor = "rgba(47, 24, 10, 0.856)"

    }
}

  createRect(){
    create_square_flag = false;
    create_line_flag = false;
    create_circle_flag = false;
    create_triangle_flag = false;
    create_ellipse_flag = false;

    created_square = false;
    created_line = false;
    created_circle = false;
    created_triangle = false;
    created_ellipse = false;

    create_rect_flag = true;
    created_rect = false;


    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;

    var rect : shapeBack|null;
    this.paintServ.createShape("rect").subscribe((data : shapeBack) =>{rect = data});

    boardGlobal.addEventListener("mousedown",e=>{

      if(!created_rect && (rect != null) && rectButtonFlag){

        rect.x = parseInt(e.offsetX.toString());
        rect.y = parseInt(e.offsetY.toString());
        rect.stCo = strokeColor
        rect.stWi = strokeWidth
        console.log(rect.x);
        console.log(rect.y);
          create_rect_flag =false;
          created_rect = true;
          this.paintServ.postShape({
            x:rect.x,
            y:rect.y,
            width:150,
            height:90,
            fiCo:rect.fiCo,
            stCo:rect.stCo,
            stWi:rect.stWi,
            type:rect.type,
            is_filled:rect.is_filled,
            shapeID : get_new_ID()

          }).subscribe((data : shapeBack) => {
            this.drawShape(data, "");
            shapesBack.push(data)

          })
          rect = null;

        }

    });


    boardGlobal.addEventListener("mouseup",e=>{
      if(rectButtonFlag){
        created_rect = true;
        create_rect_flag = false;


        document.getElementById("rect")!.style.backgroundColor = "rgb(246, 129, 60)"

      }

    });
    if(create_rect_flag){
      document.getElementById("rect")!.style.backgroundColor = "rgba(47, 24, 10, 0.856)"

    }
  }

  createSquare(){
    create_circle_flag = false;
    create_line_flag = false;
    create_rect_flag = false;
    create_triangle_flag = false;
    create_ellipse_flag = false;

    created_circle = false;
    created_line = false;
    created_rect = false;
    created_triangle = false;
    created_ellipse = false;

    create_square_flag = true;
    created_square = false;

    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;


    var square : shapeBack|null;
    this.paintServ.createShape("square").subscribe((data : shapeBack) =>{square = data});



    boardGlobal.addEventListener("mousedown",e=>{

      if(!created_square && (square != null) && squareButtonFlag){

        square.x = parseInt(e.offsetX.toString());
        square.y = parseInt(e.offsetY.toString());
        square.stCo = strokeColor
        square.stWi = strokeWidth
        console.log(square.x);
        console.log(square.y);
        create_rect_flag =false;
        created_rect = true;
        this.paintServ.postShape({
          x:square.x,
          y:square.y,
          width:square.width,
          height:square.height,
          fiCo:square.fiCo,
          stCo:square.stCo,
          stWi:square.stWi,
          type:square.type,
          is_filled:square.is_filled,
          shapeID : get_new_ID()

          }).subscribe((data : shapeBack) => {
            this.drawShape(data, "");
            shapesBack.push(data)

          })
          square = null;

        }

    });


    boardGlobal.addEventListener("mouseup",e=>{
      if(squareButtonFlag){
        created_square = true;
        create_square_flag = false;


        document.getElementById("square")!.style.backgroundColor = "rgb(246, 129, 60)"

      }

    });
    if(create_square_flag){
      document.getElementById("square")!.style.backgroundColor = "rgba(47, 24, 10, 0.856)"

    }
  }

  createEllipse(){
    create_square_flag = false;
    create_line_flag = false;
    create_circle_flag = false;
    create_rect_flag = false;
    create_triangle_flag = false;

    created_square = false;
    created_line = false;
    created_circle = false;
    created_rect = false;
    created_triangle = false;



    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;
    var ellipse : shapeBack|null;
    create_ellipse_flag = true;
    created_ellipse = false;

    this.paintServ.createShape("ellipse").subscribe((data : shapeBack) =>{ellipse = data});

    boardGlobal.addEventListener("mousedown",e=>{

      if(!created_ellipse && (ellipse != null) && ellipseButtonFlag){

        ellipse.x = parseInt(e.offsetX.toString());
        ellipse.y = parseInt(e.offsetY.toString());
        ellipse.stCo = strokeColor
        ellipse.stWi = strokeWidth
        console.log(ellipse.x);
        console.log(ellipse.y);
        create_ellipse_flag =false;
        created_ellipse = true;
        this.paintServ.postShape({
        x:ellipse.x,
        y:ellipse.y,
        width:120,
        height:80,
        fiCo:ellipse.fiCo,
        stCo:ellipse.stCo,
        stWi:ellipse.stWi,
        type:ellipse.type,
        is_filled:ellipse.is_filled,
        shapeID : get_new_ID()
        }).subscribe((data : shapeBack) => {
          this.drawShape(data, "");
          shapesBack.push(data)

        })
        ellipse = null;

      }


    });

    boardGlobal.addEventListener("mouseup",e=>{
      if(ellipseButtonFlag){
        created_ellipse = true;
        create_ellipse_flag = false;

        document.getElementById("ellipse")!.style.backgroundColor = "rgb(246, 129, 60)"

      }

    });
    if(create_ellipse_flag){
      document.getElementById("ellipse")!.style.backgroundColor = "rgba(47, 24, 10, 0.856)"

    }



  }

  remove(){

    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;
    remove_flag = !(remove_flag);
    console.log(canvasArea)
    boardGlobal.addEventListener("mousedown",event => {
      if(remove_flag){
<<<<<<< HEAD
        this.paintServ.getCanvas().subscribe((data : shapeBack[]) =>{
          var shapesBack = data;
          for (var shape of shapesBack){        
            if(canvasGlobal.isPointInPath(canvasArea.get(shape.shapeID), event.offsetX, event.offsetY) || canvasGlobal.isPointInStroke(canvasArea.get(shape.shapeID), event.offsetX, event.offsetY)){
             
              removedShape = shape;
              shapesBack = shapesBack.filter(obj => obj !== shape);
              canvasArea.delete(shape.shapeID);
              canvasGlobal.clearRect(0,0,1380,675);

              for(var i = 0; i < shapesBack.length; i++){
                this.drawShape(shapesBack[i], "");
              }
              break;
=======
        for (var shape of shapesBack){

          if(canvasGlobal.isPointInPath(canvasArea.get(shape.shapeID), event.offsetX, event.offsetY) || canvasGlobal.isPointInStroke(canvasArea.get(shape.shapeID), event.offsetX, event.offsetY)){
            shapesBack = shapesBack.filter(obj => obj !== shape);
            canvasArea.delete(shape.shapeID);
            canvasGlobal.clearRect(0,0,1380,675);
>>>>>>> 6d16ecc1f5101b351ef83a4890e76515b5a9ea35

            for(var i = 0; i < shapesBack.length; i++){
              this.drawShape(shapesBack[i],"");
            }
<<<<<<< HEAD

          }
          for(var i = 0; i < shapesBack.length; i++){
            this.drawShape(shapesBack[i], "");
          }
        
        })

        
      }
     
    });

    boardGlobal.addEventListener("mouseup", e => {
      if(removedShape != null){
        this,this.paintServ.removeShape(removedShape).subscribe();
        shapesBack = null;
        removedShape = null;
        
=======
          }
        }
      }
      for(var i = 0; i < shapesBack.length; i++){
        this.drawShape(shapesBack[i],"");
>>>>>>> 6d16ecc1f5101b351ef83a4890e76515b5a9ea35
      }
    });
    if(remove_flag){
      document.getElementById("remove")!.style.backgroundColor = "rgba(47, 24, 10, 0.856)"

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
          if(canvasGlobal.isPointInPath(shapes[i].area, e.offsetX, e.offsetY) || canvasGlobal.isPointInStroke(shapes[i].area, e.offsetX, e.offsetY)){
            temp_shape = i;
            is_selected = true;
          }
        }
      }
    });

    boardGlobal.addEventListener("mousemove", e => {
      if(move_flag && is_selected){
        canvasGlobal.clearRect(0,0,1380,675);

        var oldRealWidth = shapes[temp_shape].width - shapes[temp_shape].x;;
        var oldRealHeight = shapes[temp_shape].height -  shapes[temp_shape].y;
        if(shapes[temp_shape].type == "line"){
          shapes[temp_shape].width = e.offsetX
          shapes[temp_shape].height = e.offsetY
          shapes[temp_shape].x = shapes[temp_shape].width - oldRealWidth;
          shapes[temp_shape].y = shapes[temp_shape].height - oldRealHeight;
        }
        else{
          shapes[temp_shape].x = e.offsetX;
          shapes[temp_shape].y = e.offsetY;
        }
        shapes[temp_shape].draw(canvasGlobal,"");
        for(var i = 0; i < shapes.length; i++){
          shapes[i].draw(canvasGlobal,"");
        }

      }
    });

    boardGlobal.addEventListener("mouseup", e => {
      is_selected = false;
      for(var i = 0; i < shapes.length; i++){
        shapes[i].draw(canvasGlobal,"");
      }
    });

    if(move_flag){
      document.getElementById("move")!.style.backgroundColor = "rgba(47, 24, 10, 0.856)"

    }
    else{
      document.getElementById("move")!.style.backgroundColor = "rgb(246, 129, 60)"

    }

  }
  copy(){
    var temp_shape : number = 0;
    var is_selected :boolean = false;
    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;
    copy_flag = true;
    found = true;


    boardGlobal.addEventListener("mousedown",  e => {

      if(found){
        this.paintServ.getCanvas().subscribe((data : shapeBack[]) =>{
          shapesBack = data
          for (var i = 0; i < shapesBack.length; i++){
            if(canvasGlobal.isPointInPath(canvasArea.get(shapesBack[i].shapeID), e.offsetX, e.offsetY) || canvasGlobal.isPointInStroke(canvasArea.get(shapesBack[i].shapeID), e.offsetX, e.offsetY)){
                this.paintServ.postShape({
                x:shapesBack[i].x,
                y:shapesBack[i].y,
                width:shapesBack[i].width,
                height:shapesBack[i].height,
                fiCo:shapesBack[i].fiCo,
                stCo:shapesBack[i].stCo,
                stWi:shapesBack[i].stWi,
                type:shapesBack[i].type,
                is_filled:shapesBack[i].is_filled,
                shapeID : get_new_ID()

                }).subscribe((data : shapeBack) => {
                  shapesBack.push(data)
                })

                is_selected = true;
                temp_shape = shapesBack.length - 1;
                found = false;
                break;
            }
          }
        })
      }
    });

    boardGlobal.addEventListener("mousemove", e => {
      if(copy_flag && is_selected ){
        canvasGlobal.clearRect(0,0,1380,675);
        canvasArea.delete(shapesBack[temp_shape].shapeID)

        var oldRealWidth = shapesBack[temp_shape].width - shapesBack[temp_shape].x;;
        var oldRealHeight = shapesBack[temp_shape].height -  shapesBack[temp_shape].y;
        if(shapesBack[temp_shape].type == "line"){
          shapesBack[temp_shape].width = e.offsetX
          shapesBack[temp_shape].height = e.offsetY
          shapesBack[temp_shape].x = shapesBack[temp_shape].width - oldRealWidth;
          shapesBack[temp_shape].y = shapesBack[temp_shape].height - oldRealHeight;
        }
        else{
          shapesBack[temp_shape].x = e.offsetX;
          shapesBack[temp_shape].y = e.offsetY;

        }
        for(var i = 0; i < shapesBack.length; i++){
            this.drawShape(shapesBack[i],"");

        }

      }
    });


    boardGlobal.addEventListener("mouseup", e => {
      is_selected = false;
      found = false;
      for(var i = 0; i < shapesBack.length; i++){
        this.drawShape(shapesBack[i],"");
      }
      console.log(shapesBack)

      this.paintServ.postCanvas(shapesBack)

      document.getElementById("copy")!.style.backgroundColor = "rgb(246, 129, 60)"
    });

    if(copy_flag){
      document.getElementById("copy")!.style.backgroundColor = "rgba(47, 24, 10, 0.856)"

    }

  }

  resize(){
    var oldx = 0;
    var oldy = 0;

    var temp_shape : number = 0;
    var is_selected :boolean = false;
    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;
    resize_flag = !resize_flag;

    boardGlobal.addEventListener("mousedown",  e => {
      if(resize_flag){
        for (var i = 0; i < shapes.length; i++){
          if(canvasGlobal.isPointInPath(shapes[i].area, e.offsetX, e.offsetY) || canvasGlobal.isPointInStroke(shapes[i].area, e.offsetX, e.offsetY)) {
            temp_shape = i;
            is_selected = true;
          }
        }
      }
      oldx = e.offsetX;
      oldy = e.offsetY;
    });


    boardGlobal.addEventListener("mousemove", e => {
      if(resize_flag && is_selected){
        canvasGlobal.clearRect(0,0,1380,675);

        if(shapes[temp_shape].type == 'line'){
          if(e.offsetX > oldx && e.offsetY > oldy){
            shapes[temp_shape].width +=2;
            shapes[temp_shape].height += 2;

          }
          else if(e.offsetX < oldx && e.offsetY < oldy){
            if(shapes[temp_shape].width > 2 || shapes[temp_shape].height > 2) {
              shapes[temp_shape].width -= 2;
              shapes[temp_shape].height -= 2;

            }
          }
          oldx = e.offsetX;
          oldy = e.offsetY;
          shapes[temp_shape].draw(canvasGlobal,"");
        }
        if(shapes[temp_shape].type == 'circle'){
          if(e.offsetX > oldx && e.offsetY > oldy){

            shapes[temp_shape].width += 2;
            shapes[temp_shape].height += 2;
          }
          else if(e.offsetX < oldx || e.offsetY < oldy){
            if(shapes[temp_shape].width > 2 && shapes[temp_shape].height > 2 ){
              shapes[temp_shape].width -= 2;
              shapes[temp_shape].height -= 2;
            }
          }
          oldx = e.offsetX;
          oldy = e.offsetY;
          shapes[temp_shape].draw(canvasGlobal,"");

        }
        if(shapes[temp_shape].type == 'square'){
          if(e.offsetX > oldx && e.offsetY > oldy){
            shapes[temp_shape].width += 2;
            shapes[temp_shape].height += 2;

          }
          else if(e.offsetX < oldx || e.offsetY < oldy){
            if(shapes[temp_shape].width > 2 && shapes[temp_shape].height > 2 ){
              shapes[temp_shape].width -= 2;
              shapes[temp_shape].height -= 2;
            }
          }
          oldx = e.offsetX;
          oldy = e.offsetY;
          shapes[temp_shape].draw(canvasGlobal,"");
        }
        if(shapes[temp_shape].type == 'rect'){
          if(e.offsetX > oldx && e.offsetY > oldy){
            shapes[temp_shape].width += 2;
            shapes[temp_shape].height += 2;
          }
          else if(e.offsetX < oldx && e.offsetY < oldy){
            if(shapes[temp_shape].width > 2 && shapes[temp_shape].height > 2 ){
              shapes[temp_shape].width -= 2;
              shapes[temp_shape].height -= 2;
            }
          }
          oldx = e.offsetX;
          oldy = e.offsetY;
          shapes[temp_shape].draw(canvasGlobal,"");
        }
        if(shapes[temp_shape].type == 'triangle'){
          if(e.offsetX > oldx && e.offsetY > oldy){

            shapes[temp_shape].width += 2;
            shapes[temp_shape].height += 2;
          }
          else if(e.offsetX < oldx && e.offsetY < oldy){
            if(shapes[temp_shape].width > 2 && shapes[temp_shape].height > 2 ){
              shapes[temp_shape].width -= 2;
              shapes[temp_shape].height -= 2;
            }


          }
          oldx = e.offsetX;
          oldy = e.offsetY;
          shapes[temp_shape].draw(canvasGlobal,"");
        }
        if(shapes[temp_shape].type == 'ellipse'){
          if(e.offsetX > oldx && e.offsetY > oldy){
            shapes[temp_shape].width +=2;
            shapes[temp_shape].height += 2;
          }
          else if(e.offsetX < oldx && e.offsetY < oldy){
            if(shapes[temp_shape].width > 2 && shapes[temp_shape].height > 2 ){
              shapes[temp_shape].width -= 2;
              shapes[temp_shape].height -= 2;
            }
          }
          oldx = e.offsetX;
          oldy = e.offsetY;
          shapes[temp_shape].draw(canvasGlobal,"");
        }
        canvasGlobal.clearRect(0,0,1380,675);

      }
      for(var i = 0; i < shapes.length; i++){
        shapes[i].draw(canvasGlobal,"");
      }
    });

    boardGlobal.addEventListener("mouseup", e => {
      is_selected = false;
      for(var i = 0; i < shapes.length; i++){
        shapes[i].draw(canvasGlobal,"");
      }

    });
    if(resize_flag){
      document.getElementById("resize")!.style.backgroundColor = "rgba(47, 24, 10, 0.856)"

    }
    else{
      document.getElementById("resize")!.style.backgroundColor = "rgb(246, 129, 60)"

    }


  }

  disableButtons(){
    if(create_line_flag){

      circleButtonFlag = false;
      squareButtonFlag  = false;
      rectButtonFlag  = false;
      triangleButtonFlag  = false;
      ellipseButtonFlag  = false;

      lineButtonFlag = true;

    }
    if(create_square_flag){

      circleButtonFlag = false;
      rectButtonFlag  = false;
      lineButtonFlag  = false;
      triangleButtonFlag  = false;
      ellipseButtonFlag  = false;

      squareButtonFlag = true;


    }
    if(create_circle_flag){



      squareButtonFlag = false;
      rectButtonFlag = false;
      lineButtonFlag = false;
      triangleButtonFlag = false;
      ellipseButtonFlag = false;

      circleButtonFlag = true;

    }
    if(create_rect_flag){

      circleButtonFlag  = false;
      squareButtonFlag = false;
      lineButtonFlag = false;
      triangleButtonFlag = false;
      ellipseButtonFlag = false;

      rectButtonFlag = true;

    }
    if(create_triangle_flag){

      circleButtonFlag = false;
      squareButtonFlag = false;
      rectButtonFlag  = false;
      lineButtonFlag = false;
      ellipseButtonFlag = false;

      triangleButtonFlag = true;

    }
    if(create_ellipse_flag){


      circleButtonFlag = false;
      squareButtonFlag = false;
      rectButtonFlag = false;
      lineButtonFlag = false;
      triangleButtonFlag = false;

      ellipseButtonFlag = true;

    }

    if(!create_square_flag){
      document.getElementById("square")!.style.backgroundColor = "rgb(246, 129, 60)"

    }
    if(!create_rect_flag){
      document.getElementById("rect")!.style.backgroundColor = "rgb(246, 129, 60)"

    }
    if(!create_circle_flag){
      document.getElementById("circle")!.style.backgroundColor = "rgb(246, 129, 60)"

    }
    if(!create_line_flag){
      document.getElementById("line")!.style.backgroundColor = "rgb(246, 129, 60)"

    }
    if(!create_ellipse_flag){
      document.getElementById("ellipse")!.style.backgroundColor = "rgb(246, 129, 60)"

    }
    if(!create_triangle_flag){
      document.getElementById("triangle")!.style.backgroundColor = "rgb(246, 129, 60)"

    }

  }



}



