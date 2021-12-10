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

/**
 * Controller Class to Update the Canvas after each change that happens in the front-end
 * It also manages save, load, undo and redo
 * It Creates Objects of accroding to Type Request from the front-end and returns that object with predefined attributes
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Component
public class PaintController {
    ShapeClass shape = new ShapeClass();
    Factory factory = new Factory();
    private Stack<List <ShapeClass> > database = new Stack<>();
    private Stack<List <ShapeClass> > redoStack = new Stack<>();


    public Stack<List<ShapeClass>> getDatabase() {
        return database;
    }

    public void setDatabase(Stack<List<ShapeClass>> database) {
        this.database = database;
    }

    /**
     * This method gets the Shape to be drawn from the front-end.
     * @param paintShape a ShapeClass Object with defined attributes.
     * @return a ShapeI Object to send it to front-end to draw it.
     */
    @PostMapping("/paint")
    ShapeI addShapes(@RequestBody ShapeClass paintShape) {
        return paintShape;
    }


    /**
     * This method requests the Type of the Object to be created by factory and send it to the front-end.
     * @param type String that defines the type of Object to be created.
     * @return a ShapeI object with pre-defined attributes
     */
    @PostMapping("/create")
    ShapeI createShape(@RequestBody String type) {

        return factory.createShape(type);
    }

    /**
     * This Method responds to the front-end with latest Canvas to draw.
     * @return List of ShapeClass Objects to be drawn in front-end.
     */
    @GetMapping("/getCanvas")
    List<ShapeClass> getCanvas() {
        return this.database.peek();
    }

    /**
     * This Method requests A List of Shapeclass Objects to save in the Database stack.
     * @param shapes List of ShapeClass Objects
     */
    @PostMapping("/postCanvas")
    void postCanvas(@RequestBody List<ShapeClass> shapes) {
        this.database.push(shapes);
    }

    /**
     * This Method Undo the current canvas by poping it from the the database stack and pushing it to redoStack
     * @return the List of ShapeClass Objects .. Canvas to be drawn after undo
     */
    @GetMapping("/undo")
    public List<ShapeClass> undo() {
        try{

            this.redoStack.push(this.database.pop());

            if(this.database.size() == 0){
                return new ArrayList<ShapeClass>(0);
            }
            return this.database.peek();
        }
        catch (Exception e){
            return new ArrayList<ShapeClass>(0);
        }
    }

    /**
     * This Method saves Changes after Undo so that the user can redo by poping from redoStack and pushing into Database Stack
     * @return The list of ShapClass Objects to be drawn afer Redo
     */
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
