package PainWeb_App.PainWeb_App;

import org.glassfish.jersey.message.internal.StringHeaderProvider;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.POST;
import javax.xml.parsers.SAXParser;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Component
public class PaintController {
    ShapeClass shape = new ShapeClass();
    Factory factory = new Factory();



    @PostMapping("/paint")
    ShapeI addShapes(@RequestBody ShapeClass paintShape){

        shape.addShape(paintShape);
        return paintShape;
    }

    @PostMapping("/create")
    ShapeI createShape(@RequestBody String type){
        System.out.println(type);
        return factory.createShape(type);
    }

    @GetMapping("/getCanvas")
    List<ShapeI> getCanvas(){
        return shape.getListofShapes();
    }

    @PostMapping("/postCanvas")
    void postCanvas(@RequestBody List<ShapeI> shapes){shape.setListofShapes(shapes);
    }

    /*@PostMapping("/remove")
    List<ShapeClass> removeShape(@RequestBody ShapeClass removeShape){

        try{
            for(int i = 0; i < shape.getListofShapes().size(); i++){
                if(shape.getListofShapes().get(i).getShapeID().equals(removeShape.getShapeID())){
                    System.out.println("removed");
                    shape.getListofShapes().remove(i);
                    break;
                }
            }
            System.out.println("delte");
            System.out.println(shape.getListofShapes().size());
            return shape.getListofShapes();

        }
        catch (Exception e){
            System.out.println("Error");
            throw e;
        }


    }

    @PostMapping("/edit")
    void editShape(@RequestBody ShapeClass newShape){
        try{
            for(int i = 0; i < shape.getListofShapes().size(); i++){
                if (shape.getListofShapes().get(i).getShapeID().equals(newShape.getShapeID())) {
                    System.out.println("Edit");
                    shape.setFiCo(newShape.getFiCo());
                    shape.setFilled(newShape.isFilled());
                    shape.setHeight(newShape.getHeight());
                    shape.setWidth(newShape.getWidth());
                    shape.setX(newShape.getX());
                    shape.setY(newShape.getY());
                    shape.setStCo(newShape.getStCo());
                    shape.setType(newShape.getType());
                    shape.setStWi(newShape.getStWi());
                    System.out.println(shape.getListofShapes().get(i).getX());

                    break;
                }
            }
            System.out.println(newShape.getFiCo());
        }
        catch (Exception e){
            System.out.println(e);
        }
    }*/
}