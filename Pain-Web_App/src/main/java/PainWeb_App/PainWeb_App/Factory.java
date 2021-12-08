package PainWeb_App.PainWeb_App;

import org.springframework.stereotype.Component;

import java.util.Locale;
@Component

public class Factory{

    ShapeI createShape(String shape){

        switch (shape.toLowerCase()){
            case "circle":
                return new Circle();
            case "square":
                return new Square();
            case "rect" :
                return new Rect();
            case "triangle":
                return new Triangle();
            case "line":
                return new Line();
            case "ellipse":
                return new Ellipse();
            default:
                return null;
        }
    }
}
