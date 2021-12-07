package PainWeb_App.PainWeb_App;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Component
public class PaintController {
    ShapeClass shape = new ShapeClass();


    @PostMapping("/paint")
    ShapeClass controlPaint(@RequestBody ShapeClass paintShape, String control){

        return null;
    }


}
