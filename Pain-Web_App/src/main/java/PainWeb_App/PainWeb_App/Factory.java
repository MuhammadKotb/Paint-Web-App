package PainWeb_App.PainWeb_App;

public class Factory{

    ShapeClass createShape(String shape){

        return new ShapeClass(shape);

    }
}
