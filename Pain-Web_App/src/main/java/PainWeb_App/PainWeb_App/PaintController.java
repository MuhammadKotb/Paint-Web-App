package PainWeb_App.PainWeb_App;

import com.fasterxml.jackson.core.exc.StreamWriteException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Component
public class PaintController {
    ShapeClass shape = new ShapeClass();
    Factory factory = new Factory();
    private int undo_count = 0;
    private Stack<List <ShapeClass> > database = new Stack<>();
    private Stack<List <ShapeClass> > redoStack = new Stack<>();

    public void updateDatabase(){
        List <ShapeClass> listTemp = new ArrayList<>(shape.getListofShapes());
        this.database.push((ArrayList<ShapeClass>) listTemp);

    }

    public Stack<List<ShapeClass>> getDatabase() {
        return database;
    }

    public void setDatabase(Stack<List<ShapeClass>> database) {
        this.database = database;
    }


    @PostMapping("/paint")
    ShapeI addShapes(@RequestBody ShapeClass paintShape) {
        undo_count = 0;

        return paintShape;
    }

    @PostMapping("/create")
    ShapeI createShape(@RequestBody String type) {
        undo_count = 0;
        return factory.createShape(type);
    }

    @GetMapping("/getCanvas")
    List<ShapeClass> getCanvas() {
        return shape.getListofShapes();
    }

    @PostMapping("/postCanvas")
    void postCanvas(@RequestBody List<ShapeClass> shapes) {
        // this.database.pop();
        this.database.push(shapes);
        System.out.println("Canvas size after post -->" + this.database.peek().size());
        System.out.println("Database size after post -->" + this.database.size());


    }

    /**
     * remove and edit should be implemented as undo, redo and database depend on them
     **/

    @GetMapping("/undo")
    public List<ShapeClass> undo() {
        try{

            this.redoStack.push(this.database.pop());
            System.out.println("Canvas size after pop -->" + this.database.peek().size());
            System.out.println("Database size after pop -->" + this.database.size());
            if(this.database.size() == 0){
                return new ArrayList<ShapeClass>(0);
            }
            return this.database.peek();
        }
        catch (Exception e){
            return new ArrayList<ShapeClass>(0);
        }

        // this.database.pop();





    }

    @GetMapping("/redo")
    public List<ShapeClass> redo() {
        try {
            this.database.push(this.redoStack.pop());
            return this.database.peek();


        } catch (Exception e) {
            return this.database.peek();

        }
    }

    //XML implementation still missing in save and load

    @PostMapping("/save")
    public String save(@RequestBody String path) {

        try {
            ObjectMapper map = new ObjectMapper();
            File file = new File(path);
            file.createNewFile();
            map.writeValue(file, this.database.peek());
            System.out.println("File Saved Successfully");
            return("File Saved Successfully :)");
        }catch (StreamWriteException e) {
            return "Couldn't save. Data doesn't match file type :(";
        } catch (DatabindException e) {
            return "Couldn't save. Data doesn't match file type :(";
        } catch (IOException e) {
            return "Couldn't save. No such directory :(";
        }

    }

    @PostMapping("/load")
    public List<ShapeClass> load(@RequestBody String path) {
        try {
            ObjectMapper map = new ObjectMapper();
            InputStream input = new FileInputStream(new File(path));
            TypeReference tr = new TypeReference<List<ShapeClass>>() {};
            this.database.push((List<ShapeClass>) map.readValue(input, tr));
            return this.database.peek();
        } catch (IOException e) {
            List<ShapeClass> errorList = new ArrayList ();
            errorList.add(new ShapeClass("Error", "Couldn't save. No such directory :("));
            return errorList;
        }
    }

}