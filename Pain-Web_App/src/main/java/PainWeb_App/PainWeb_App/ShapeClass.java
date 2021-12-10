package PainWeb_App.PainWeb_App;


import java.util.ArrayList;
import java.util.List;

public class ShapeClass implements ShapeI {

    private int x = 0;
    private int y = 0;
    private int width = 80;
    private int height = 80;
    private String fiCo = "";
    private String stCo = "";
    private int stWi = 3;
    private String type = null;
    private int is_filled = 0;
    private String shapeID = null;

    public List<ShapeClass> shapes = new ArrayList<>();

    public void addShape(ShapeClass shape){
        this.shapes.add(shape);
    }





    public ShapeClass(){

    }
    public ShapeClass(String type, String error){ this.shapeID = error;this.type = type;}
    public ShapeClass(String type){
        this.type = type;
    }

    public List<ShapeClass> getListofShapes(){
        return this.shapes;
    }
    public void setListofShapes(List<ShapeClass> shapes){
        this.shapes = shapes;
    }

    public ShapeClass getShape(int index){
        return this.shapes.get(index);
    }

    public int getX() {
        return this.x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public void setFiCo(String fiCo) {
        this.fiCo = fiCo;
    }

    public void setStCo(String stCo) {
        this.stCo = stCo;
    }

    public void setStWi(int stWi) {
        this.stWi = stWi;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setFilled(int is_filled) {
        this.is_filled = is_filled;
    }

    public void setShapeID(String shapeID) {
        this.shapeID = shapeID;
    }

    public int getY() {
        return this.y;
    }

    public int getWidth() {
        return this.width;
    }

    public int getHeight() {
        return this.height;
    }

    public String getFiCo() {
        return this.fiCo;
    }

    public String getStCo() {
        return this.stCo;
    }


    public int getStWi() {
        return this.stWi;
    }


    public String getType() {
        return this.type;
    }

    public int getIs_filled() {
        return this.is_filled;
    }
    public String getShapeID(){
        return this.shapeID;
    }



    public List<ShapeClass> getShapes() {
        return shapes;
    }

    public void setShapes(ArrayList<ShapeClass> shapes) {
        this.shapes = shapes;
    }



}
<<<<<<< HEAD
=======

>>>>>>> 6a0c0061f42cb568e3c4f884a8223d26c0caf486
