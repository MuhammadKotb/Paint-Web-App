package PainWeb_App.PainWeb_App;

public class Factory{

    ShapeI createShape(String shape){
        switch (shape.toLowerCase()){
            case "circle":
                return new ShapeClass("circle") {
                };
            default:
                return null;
        }
    }
}
