import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { paintServices } from './app.services';
import { range } from 'rxjs';
import { leadingComment } from '@angular/compiler';




 //container to hold all different shapes on it
var shapesBack:shapeBack[] = [];
let canvasArea = new Map<string, Path2D>();

//flag to activate buttons
var remove_flag :boolean = false;
var move_flag :boolean = false;
var resize_flag :boolean = false;
var fill_flag :boolean = false;
var copy_flag : boolean = false;
var undo_flag : boolean = false;
var redo_flag : boolean = false;

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
export interface shapeBack{
  x:number;
  y:number;
  width:number;
  height:number;
  fiCo:string;
  stCo:string;
  stWi:number;
  type:string;
  is_filled:number;
  shapeID:string;
}





//----------------------------------------------------------------------//

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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
        if(isfilled == 1){
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
        if(isfilled == 1){
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
        if(isfilled == 1){
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
          if(isfilled == 1){

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
          if(isfilled == 1){
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

    fill_flag = true;
    boardGlobal.addEventListener("mousedown",e =>{
      if(fill_flag){
        for (var shape of shapesBack){
          if(canvasGlobal.isPointInPath(canvasArea.get(shape.shapeID), e.offsetX, e.offsetY)){

            shape.is_filled = 1;
            this.drawShape(shape, fillcolor);
            

          }
        }
      }
    });
    boardGlobal.addEventListener("mouseup", e => {
      if(fill_flag){

        this.paintServ.postCanvas(shapesBack).subscribe();
        fill_flag = false;
        document.getElementById("fill")!.style.backgroundColor = "rgb(246, 129, 60)";
        fillcolor = null;

      }
    })
    if(fill_flag){
      document.getElementById("fill")!.style.backgroundColor = "rgba(47, 24, 10, 0.856)"

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
      var line : shapeBack;
      this.paintServ.createShape("line").subscribe((data : shapeBack) => {line = data});
  
      create_line_flag = true;
      created_line = false;
      var selectLine = false;
      boardGlobal.addEventListener("mousedown",e=>{
  
        if(!created_line && (line != null) && lineButtonFlag){
  
          line.x = e.offsetX;
          line.y = e.offsetY;
          line.stCo = strokeColor
          line.stWi = strokeWidth
          line.shapeID = get_new_ID();
          selectLine = true;
          created_line = true;
  
        }
  
  
      });
  
      boardGlobal.addEventListener("mousemove", e => {
        if(create_line_flag && selectLine && (line != null) && lineButtonFlag && created_line){
          canvasGlobal.clearRect(0,0,1380,675);
          canvasArea.delete(line.shapeID);
  
          line.width = e.offsetX;
          line.height = e.offsetY;
          
          this.drawShape(line, "");
          for(var i = 0; i < shapesBack.length; i++){
            this.drawShape(shapesBack[i], "");
          }
        }
  
      });
      boardGlobal.addEventListener("mouseup", e => {
        if(lineButtonFlag){
          create_line_flag =false;
          created_line = true;
          selectLine = false;
        if(line != null && (line.width != 0 && line.height != 0)){
          this.paintServ.postShape({
            x:line.x,
            y:line.y,
            width:line.width,
            height:line.height,
            fiCo:line.fiCo,
            stCo:line.stCo,
            stWi:line.stWi,
            type:line.type,
            is_filled:line.is_filled,
            shapeID : line.shapeID
    
            }).subscribe((data : shapeBack) => {
              this.drawShape(data, "");
              shapesBack.push(data);
              this.paintServ.postCanvas(shapesBack).subscribe();

    
            })

  
        }
        
        line = null;
  
        document.getElementById("line")!.style.backgroundColor = "rgb(246, 129, 60)"
        }
  
      });
  
      if(create_line_flag){
        document.getElementById("line")!.style.backgroundColor = "rgba(47, 24, 10, 0.856)"
  
      }
  
  
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
        width:triangle.width,
        height:parseInt((Math.sqrt(3/2) * 60).toString()),
        fiCo:triangle.fiCo,
        stCo:triangle.stCo,
        stWi:triangle.stWi,
        type:triangle.type,
        is_filled:triangle.is_filled,
        shapeID : get_new_ID()

        }).subscribe((data : shapeBack) => {
          this.drawShape(data, "");
          shapesBack.push(data);
          this.paintServ.postCanvas(shapesBack).subscribe();

        })

      }


    });

    boardGlobal.addEventListener("mouseup",e=>{
      if(triangleButtonFlag){

        created_triangle = true;
        create_triangle_flag = false;


        document.getElementById("triangle")!.style.backgroundColor = "rgb(246, 129, 60)"
        triangle = null;


      }
      console.log(shapesBack);


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



    boardGlobal.addEventListener("mousedown", e=> {

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
          shapesBack.push(data);
          this.paintServ.postCanvas(shapesBack).subscribe();


        })
        circle = null
        }

    });


    boardGlobal.addEventListener("mouseup",e=>{
      if(circleButtonFlag){

        created_circle = true;
        create_circle_flag = false;

        console.log(shapesBack);

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
            width:rect.width,
            height:rect.height,
            fiCo:rect.fiCo,
            stCo:rect.stCo,
            stWi:rect.stWi,
            type: rect.type,
            is_filled:rect.is_filled,
            shapeID : get_new_ID()

          }).subscribe((data : shapeBack) => {
            this.drawShape(data, "");
            shapesBack.push(data);
            this.paintServ.postCanvas(shapesBack).subscribe();


          })

        }

    });


    boardGlobal.addEventListener("mouseup",e=>{
      if(rectButtonFlag){
        created_rect = true;
        create_rect_flag = false;

        console.log(shapesBack);
        rect = null;




        document.getElementById("rect")!.style.backgroundColor = "rgb(246, 129, 60)"
        console.log(shapesBack);

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
            shapesBack.push(data);
            this.paintServ.postCanvas(shapesBack).subscribe();


          })
          square = null;

        }

    });


    boardGlobal.addEventListener("mouseup",e=>{
      if(squareButtonFlag){
        created_square = true;
        create_square_flag = false;
        console.log(shapesBack);
        square = null;



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
        width:ellipse.width,
        height:ellipse.height,
        fiCo:ellipse.fiCo,
        stCo:ellipse.stCo,
        stWi:ellipse.stWi,
        type:ellipse.type,
        is_filled:ellipse.is_filled,
        shapeID : get_new_ID()
        }).subscribe((data : shapeBack) => {
          this.drawShape(data, "");
          shapesBack.push(data);
          this.paintServ.postCanvas(shapesBack).subscribe();


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
    remove_flag = true;
    var isSelected : boolean = false;
    console.log(canvasArea)
    boardGlobal.addEventListener("mousedown",event => {
      if(remove_flag){
        for (var shape of shapesBack){

          if(canvasGlobal.isPointInPath(canvasArea.get(shape.shapeID), event.offsetX, event.offsetY) || canvasGlobal.isPointInStroke(canvasArea.get(shape.shapeID), event.offsetX, event.offsetY)){
            shapesBack = shapesBack.filter(obj => obj !== shape);
            canvasArea.delete(shape.shapeID);
            canvasGlobal.clearRect(0,0,1380,675);

            for(var i = 0; i < shapesBack.length; i++){
              this.drawShape(shapesBack[i],"");
            }
            isSelected = true;
          }
        }
      }
      for(var i = 0; i < shapesBack.length; i++){
        this.drawShape(shapesBack[i],"");
      }
    });
    boardGlobal.addEventListener("mouseup", e => {
      if(remove_flag && isSelected){  
        this.paintServ.postCanvas(shapesBack).subscribe();
        document.getElementById("remove")!.style.backgroundColor = "rgb(246, 129, 60)"
        remove_flag = false;
        

      }
    })
    if(remove_flag){
      document.getElementById("remove")!.style.backgroundColor = "rgba(47, 24, 10, 0.856)"

    }
   
  }
  move(){
    var temp_shape : number = 0;
    var is_selected :boolean = false;
    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;
    move_flag = true;

    boardGlobal.addEventListener("mousedown",  e => {
      if(move_flag){
        for (var i = 0; i < shapesBack.length; i++){
          if(canvasGlobal.isPointInPath(canvasArea.get(shapesBack[i].shapeID), e.offsetX, e.offsetY) || canvasGlobal.isPointInStroke(canvasArea.get(shapesBack[i].shapeID), e.offsetX, e.offsetY)){
            temp_shape = i;
            is_selected = true;
          }
        }
      }
    });

    boardGlobal.addEventListener("mousemove", e => {
      if(move_flag && is_selected){
        canvasGlobal.clearRect(0,0,1380,675);
        canvasArea.delete(shapesBack[temp_shape].shapeID);

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
        this.drawShape(shapesBack[temp_shape], "");
        for(var i = 0; i < shapesBack.length; i++){
          this.drawShape(shapesBack[i], "");
        }

      }
    });

    boardGlobal.addEventListener("mouseup", e => {
      if(is_selected && move_flag){
        is_selected = false;
        for(var i = 0; i < shapesBack.length; i++){
          this.drawShape(shapesBack[temp_shape], "");
        }
        this.paintServ.postCanvas(shapesBack).subscribe();
        move_flag = false;
        document.getElementById("move")!.style.backgroundColor = "rgb(246, 129, 60)"
      }
    
    });

    if(move_flag){
      document.getElementById("move")!.style.backgroundColor = "rgba(47, 24, 10, 0.856)"

    }

  }
  copy(){
    var temp_shape : number = 0;
    var is_selected :boolean = false;
    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;
    copy_flag = true;
    found = true;
    var copy_shape : shapeBack;


    boardGlobal.addEventListener("mousedown",  e => {

      if(found){

        for (var i = 0; i < shapesBack.length; i++){
          if(canvasGlobal.isPointInPath(canvasArea.get(shapesBack[i].shapeID), e.offsetX, e.offsetY) || canvasGlobal.isPointInStroke(canvasArea.get(shapesBack[i].shapeID), e.offsetX, e.offsetY)){

            this.paintServ.createShape(shapesBack[i].type).subscribe((data : shapeBack) =>{


              copy_shape = data;
              copy_shape.x = shapesBack[i].x;
              copy_shape.y = shapesBack[i].y;
              copy_shape.width = shapesBack[i].width;
              copy_shape.height = shapesBack[i].height;
              copy_shape.fiCo = shapesBack[i].fiCo;
              copy_shape.stCo = shapesBack[i].stCo;
              copy_shape.stWi = shapesBack[i].stWi;
              copy_shape.is_filled = shapesBack[i].is_filled;
              copy_shape.type = shapesBack[i].type;
              copy_shape.shapeID = get_new_ID();


              console.log(copy_shape);

              shapesBack.push(copy_shape);



              temp_shape = shapesBack.length - 1;

            });
            found = false;

            is_selected = true;

            break;

          }
        }
      }
    });

    boardGlobal.addEventListener("mousemove", e => {
      if(copy_flag && is_selected){
        console.log(canvasArea);
        console.log(copy_shape.shapeID)
        console.log(shapesBack[temp_shape - 1].shapeID)

        canvasGlobal.clearRect(0,0,1380,675);
        canvasArea.delete(shapesBack[temp_shape].shapeID);

        var oldRealWidth = shapesBack[temp_shape].width - shapesBack[temp_shape].x;
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

        this.drawShape(shapesBack[temp_shape], "");
        for(var i = 0; i < shapesBack.length; i++){
          this.drawShape(shapesBack[i], "");
        }

      }


    });


    boardGlobal.addEventListener("mouseup", e => {
      if(copy_flag && is_selected){
        is_selected = false;
        found = false;
        this.paintServ.postCanvas(shapesBack).subscribe();

        for(var i = 0; i < shapesBack.length; i++){
          this.drawShape(shapesBack[i], "");
        }
        copy_flag = false;
        copy_shape = null;

        document.getElementById("copy")!.style.backgroundColor = "rgb(246, 129, 60)"
      }


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
    resize_flag = true;

    boardGlobal.addEventListener("mousedown",  e => {
      if(resize_flag){
        for (var i = 0; i < shapesBack.length; i++){
          if(canvasGlobal.isPointInPath(canvasArea.get(shapesBack[i].shapeID), e.offsetX, e.offsetY) || canvasGlobal.isPointInStroke(canvasArea.get(shapesBack[i].shapeID), e.offsetX, e.offsetY)) {
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
        canvasArea.delete(shapesBack[temp_shape].shapeID);

        if(shapesBack[temp_shape].type == 'line'){
          if(e.offsetX > oldx && e.offsetY > oldy){
            shapesBack[temp_shape].width +=2;
            shapesBack[temp_shape].height += 2;

          }
          else if(e.offsetX < oldx && e.offsetY < oldy){
            if(shapesBack[temp_shape].width > 2 || shapesBack[temp_shape].height > 2) {
              shapesBack[temp_shape].width -= 2;
              shapesBack[temp_shape].height -= 2;

            }
          }
          oldx = e.offsetX;
          oldy = e.offsetY;
          this.drawShape(shapesBack[temp_shape], "");
          
        }
        if(shapesBack[temp_shape].type == 'circle'){
          if(e.offsetX > oldx && e.offsetY > oldy){

            shapesBack[temp_shape].width += 2;
            shapesBack[temp_shape].height += 2;
          }
          else if(e.offsetX < oldx || e.offsetY < oldy){
            if(shapesBack[temp_shape].width > 2 && shapesBack[temp_shape].height > 2 ){
              shapesBack[temp_shape].width -= 2;
              shapesBack[temp_shape].height -= 2;
            }
          }
          oldx = e.offsetX;
          oldy = e.offsetY;
          this.drawShape(shapesBack[temp_shape], "");

        }
        if(shapesBack[temp_shape].type == 'square'){
          if(e.offsetX > oldx && e.offsetY > oldy){
            shapesBack[temp_shape].width += 2;
            shapesBack[temp_shape].height += 2;

          }
          else if(e.offsetX < oldx || e.offsetY < oldy){
            if(shapesBack[temp_shape].width > 2 && shapesBack[temp_shape].height > 2 ){
              shapesBack[temp_shape].width -= 2;
              shapesBack[temp_shape].height -= 2;
            }
          }
          oldx = e.offsetX;
          oldy = e.offsetY;
          this.drawShape(shapesBack[temp_shape], "");
          
        }
        if(shapesBack[temp_shape].type == 'rect'){
          if(e.offsetX > oldx && e.offsetY > oldy){
            shapesBack[temp_shape].width += 2;
            shapesBack[temp_shape].height += 2;
          }
          else if(e.offsetX < oldx && e.offsetY < oldy){
            if(shapesBack[temp_shape].width > 2 && shapesBack[temp_shape].height > 2 ){
              shapesBack[temp_shape].width -= 2;
              shapesBack[temp_shape].height -= 2;
            }
          }
          oldx = e.offsetX;
          oldy = e.offsetY;
          this.drawShape(shapesBack[temp_shape], "");

        }
        if(shapesBack[temp_shape].type == 'triangle'){
          if(e.offsetX > oldx && e.offsetY > oldy){

            shapesBack[temp_shape].width += 2;
            shapesBack[temp_shape].height += 2;
          }
          else if(e.offsetX < oldx && e.offsetY < oldy){
            if(shapesBack[temp_shape].width > 2 && shapesBack[temp_shape].height > 2 ){
              shapesBack[temp_shape].width -= 2;
              shapesBack[temp_shape].height -= 2;
            }


          }
          oldx = e.offsetX;
          oldy = e.offsetY;
          this.drawShape(shapesBack[temp_shape], "");

        }
        if(shapesBack[temp_shape].type == 'ellipse'){
          if(e.offsetX > oldx && e.offsetY > oldy){
            shapesBack[temp_shape].width +=2;
            shapesBack[temp_shape].height += 2;
          }
          else if(e.offsetX < oldx && e.offsetY < oldy){
            if(shapesBack[temp_shape].width > 2 && shapesBack[temp_shape].height > 2 ){
              shapesBack[temp_shape].width -= 2;
              shapesBack[temp_shape].height -= 2;
            }
          }
          oldx = e.offsetX;
          oldy = e.offsetY;
          this.drawShape(shapesBack[temp_shape], "");

        }
        canvasGlobal.clearRect(0,0,1380,675);

      }
      for(var i = 0; i < shapesBack.length; i++){
        this.drawShape(shapesBack[i], "");
      }
    });

    boardGlobal.addEventListener("mouseup", e => {
      if(resize_flag && is_selected){
        is_selected = false;
        for(var i = 0; i < shapesBack.length; i++){
          this.drawShape(shapesBack[i], "");
        }
        this.paintServ.postCanvas(shapesBack).subscribe();
        document.getElementById("resize")!.style.backgroundColor = "rgb(246, 129, 60)"
      }
      resize_flag = false;
      

    });
    if(resize_flag){
      document.getElementById("resize")!.style.backgroundColor = "rgba(47, 24, 10, 0.856)"

    }
    



  }

  undo(){
    undo_flag = true;

      
      if(undo_flag){
        this.paintServ.undoBoard().subscribe((data : shapeBack[]) => {
          var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
          var canvasGlobal = boardGlobal.getContext("2d")!;
          canvasGlobal.clearRect(0, 0, boardGlobal.width, boardGlobal.height);
          shapesBack = data;
          canvasArea.clear();
          console.log(shapesBack);

          for(var i = 0; i < shapesBack.length; i++){
            this.drawShape(shapesBack[i], "");
          }

        });
  
  
       }
       undo_flag = false;
       
  }

  redo(){

    redo_flag = true;

      
      if(redo_flag){
        this.paintServ.redoBoard().subscribe((data : shapeBack[]) => {
          var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
          var canvasGlobal = boardGlobal.getContext("2d")!;
          canvasGlobal.clearRect(0, 0, boardGlobal.width, boardGlobal.height);
          shapesBack = data;
          canvasArea.clear();
          console.log(shapesBack);

          for(var i = 0; i < shapesBack.length; i++){
            this.drawShape(shapesBack[i], "");
          }

        });
  
  
       }
       redo_flag = false;

  }
  openSaveForm(){
    document.getElementById("saveForm").style.display = "block";

  }

  openLoadForm(){
    document.getElementById("loadForm").style.display = "block";
  }

  closeSaveForm(){
    document.getElementById("saveForm").style.display = "none";
    alert("File saved successfully");
  }

  closeLoadForm(){
    document.getElementById("loadForm").style.display = "none";
  }

  sendPathSave(){
    var filePath = <HTMLInputElement>document.getElementById("saveHere2");
    var fileName = <HTMLInputElement>document.getElementById("saveHere1");
    var fname = fileName.value;
    var lengthOfFname = fname.length
    if (fname.includes(".") && fname.substring(lengthOfFname-5,lengthOfFname)!=".json" && fname.substring(lengthOfFname-4,lengthOfFname)!=".xml"){
      alert("Please enter a file with your choice of the following extentions ('.json','.xml')");
      this.openSaveForm();
    }else{
      if (!fname.includes("."))
        fname = fname + ".json"
      var fullPath = filePath.value + "\\" + fname;
      fullPath = this.reverseSlashes(fullPath);
      console.log(filePath);
      this.paintServ.saveBoard(fullPath).subscribe((msg : String) => {
        alert(msg);
      }) ;
      this.closeSaveForm();
    }
  }

  sendPathLoad(){
    var boardGlobal = (<HTMLCanvasElement>document.getElementById("board"));
    var canvasGlobal = boardGlobal.getContext("2d")!;
    var fp = <HTMLInputElement>document.getElementById("loadHere");
    var filePath = fp.value ;
    filePath = this.reverseSlashes(filePath);
    console.log(filePath);
    this.paintServ.loadBoard(filePath).subscribe((data : shapeBack[]) => {
      if (data[0].type=="Error")
        alert(data[0].shapeID)
      else{
        canvasGlobal.clearRect(0,0,1380,675)
        canvasArea.clear()
        shapesBack = data
        for(var shape of shapesBack)
          this.drawShape(shape,"")
      }
    });
    this.closeLoadForm();
  }

  reverseSlashes(path: string){
    for (var i = 0; i < path.length; i++) {
      if(path.charAt(i)=="\\")
        path = path.substring(0,i) + "/" + path.substring(i+1,path.length)
    }
    return path;
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



