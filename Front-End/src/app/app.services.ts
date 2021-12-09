import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shapeBack } from '../app/app.component'

@Injectable({
    providedIn: 'root'
})

export class paintServices{
    constructor(private http: HttpClient) { }

    postShape(shape : shapeBack) : Observable<shapeBack>{
        return this.http.post<shapeBack>("http://localhost:8080/paint", shape);
    }
    createShape(type : String) : Observable<shapeBack> {
        return this.http.post<shapeBack>("http://localhost:8080/create", type);
    }
    editShape(shape : shapeBack){
        return this.http.post("http://localhost:8080/edit", shape);
    }
    getCanvas() : Observable<shapeBack[]> {
        return this.http.get<shapeBack[]>("http://localhost:8080/canvas");
    }
    removeShape(shape : shapeBack) : Observable<shapeBack[]>  {
        return this.http.post<shapeBack[]>("http://localhost:8080/remove", shape);
    }
    undoBoard() : Observable<shapeBack[]> {
        return this.http.get<shapeBack[]>("http://localhost:8080/undo");
    }
    redoBoard() : Observable<shapeBack[]> {
        return this.http.get<shapeBack[]>("http://localhost:8080/redo");
    }
    saveBoard(path: string){
        return this.http.get("http://localhost:8080/save?path=" + path);
    }
    loadBoard(path: string) : Observable<shapeBack[]> {
        return this.http.get<shapeBack[]>("http://localhost:8080/load?path=" + path);
    }
    

}
