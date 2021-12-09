package PainWeb_App.PainWeb_App;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Component
public class PaintController {
    ShapeClass shape = new ShapeClass();
    Factory factory = new Factory();
    private int undo_count = 0;


    @PostMapping("/paint")
    ShapeI addShapes(@RequestBody ShapeClass paintShape) {
        undo_count = 0;
        shape.addShape(paintShape);
        shape.updateDatabase();
        return paintShape;
    }

    @PostMapping("/create")
    ShapeI createShape(@RequestBody String type) {
        System.out.println(type);
        undo_count = 0;
        return factory.createShape(type);
    }

    @GetMapping("/getCanvas")
    List<ShapeClass> getCanvas() {
        return shape.getListofShapes();
    }

    @PostMapping("/postCanvas")
    void postCanvas(@RequestBody List<ShapeClass> shapes) {
        shape.setListofShapes(shapes);
    }

    /**
     * remove and edit should be implemented as undo, redo and database depend on them
     **/

    @GetMapping("/undo")
    public ArrayList<ShapeClass> undo() {
        try {
            undo_count++;
            System.out.println(undo_count);
            return shape.getDatabase().get(shape.getDatabase().size() - undo_count - 1);
        } catch (Exception e) {
            undo_count = 0;
            return new ArrayList();
        }
    }

    @GetMapping("/redo")
    public ArrayList<ShapeClass> redo() {
        try {
            if (undo_count != 0) {
                undo_count--;
                System.out.println(undo_count);
                return shape.getDatabase().get(shape.getDatabase().size() - undo_count - 1);
            } else {
                return shape.getDatabase().get(shape.getDatabase().size() - 1);
            }
        } catch (Exception e) {
            undo_count = 0;
            return new ArrayList();
        }
    }

    //XML implementation still missing in save and load

    @GetMapping("/save")
    public void save(@RequestParam(value = "path") String path) {
        try {
            ObjectMapper map = new ObjectMapper();
            File file = new File(path);
            file.createNewFile();
            map.writeValue(file, shape.getListofShapes());
            System.out.println("File Saved Successfully");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/load")
    public List<ShapeClass> load(@RequestParam(value = "path") String path) {
        try {
            ObjectMapper map = new ObjectMapper();
            InputStream input = new FileInputStream(new File(path));
            TypeReference tr = new TypeReference<List<ShapeClass>>() {
            };
            shape.setListofShapes((ArrayList<ShapeClass>) map.readValue(input, tr));
            for (ShapeI s : shape.getListofShapes())
                System.out.println(s.toString());
            return shape.getListofShapes();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
