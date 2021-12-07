import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';


@Component({
  selector: '.app-test', //select comp
  templateUrl: './test.component.html', //point to file containing html
 
  styleUrls: ['./test.component.css']   //point to file containing css
 
})


export class TestComponent implements OnInit {

  public scrNo;
  public isPoint;
  private curOp;
  private opReady;
  private prevNo;
  private resMode;
  private isError;

  constructor(private http: HttpClient) {
    this.scrNo = "0";
    this.curOp = new opo("plus",false,false)
    this.opReady = false;
    this.prevNo = "n";
    this.resMode = false;
    this.isError = false;
    this.isPoint = false;
   }

  ngOnInit(){
  }

  numPressed(n: any){
    if(!this.isError){
      this.resMode = false;
      if (!this.curOp.isPrev){
        if (this.scrNo.length>11){
          alert("The number you entered exceeded calculator precision!");
          this.clear();
        }
        if (n!="." || !this.isPoint){
          if(this.scrNo!="0") 
            this.scrNo += n;
          else
            this.scrNo = n;
        }else{
          alert("You cannot use '.' twice in the sam enumber." )
        }
        if(n==".")
          this.isPoint= true;
      }else{
        this.increment(n);
      }
      this.curOp.isPrev = false;
    }
  }

  op1Pressed(op: any){
    if(!this.isError){
        this.curOp = new opo(op,true,true);
        this.equal();
    }
    this.isPoint = false;
    }

  op2Pressed(op: any){
    if(!this.isError){
      if (this.opReady)
      this.equal();
    this.curOp = new opo(op,true,false);
    }
    this.isPoint = false;
  }

  clear(){
    this.scrNo = "0";
    this.curOp = new opo("plus",true,false)
    this.opReady = false;
    this.prevNo = "n";
    this.isError = false;
    this.isPoint = false;
  }

  equal(){
    let sent;
    if(this.curOp.isSingle){
      sent = this.scrNo + "%20" + this.curOp.op
    }else{
      sent = this.prevNo + "%20" + this.curOp.op + "%20" + this.scrNo
      if (this.curOp.op=="/" && this.scrNo=="0"){
        alert("Error.");
        this.clear();
      }

    }
    let link = "http://localhost:8081/calculator";
    this.http.get(link + "?expression=" + sent).subscribe(data=>{this.scrNo= data.toString(); });
    this.prevNo = "n";
    if (this.scrNo.length>12){
      alert("Result is too large!");
      this.clear();
    }
    this.opReady = false;
    this.resMode = true;
  }

  increment(n: any){
    this.prevNo = this.scrNo;
    this.scrNo = n;
    this.opReady = true;
  }

  bs(){
    if (this.resMode)
      alert("You cannot backspace a result");
    else if (this.scrNo.length>1)
      this.scrNo = this.scrNo.slice(0, -1);
    else
      this.scrNo = "0";
  }


}

class opo{
  op: String;
  isPrev: boolean;
  isSingle: boolean;
  constructor(o: String, p: boolean, s: boolean){
    this.op = o;
    this.isPrev = p;
    this.isSingle = s;
  }
}