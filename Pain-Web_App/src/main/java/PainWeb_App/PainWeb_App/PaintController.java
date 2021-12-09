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


}