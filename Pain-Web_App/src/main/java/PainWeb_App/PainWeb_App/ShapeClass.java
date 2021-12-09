package PainWeb_App.PainWeb_App;


import java.util.ArrayList;
import java.util.List;

public class ShapeClass implements ShapeI {
    private List <ArrayList <ShapeClass> > database = new ArrayList();
    private int x = 0;
    private int y = 0;
    private int width = 80;
    private int height = 80;
    private String fiCo = null;
    private String stCo = null;
    private int stWi = 3;
    private String type = null;
    private boolean isFilled = false;
    private String shapeID = null;

    private List<ShapeClass> shapes = new ArrayList<>();

    public void addShape(ShapeClass shape){
        this.shapes.add(shape);
    }



    public void updateDatabase(){
        List <ShapeClass> listTemp = new ArrayList<>(this.shapes);
        this.database.add((ArrayList<ShapeClass>) listTemp);
        for (ArrayList <ShapeClass> list : this.getDatabase())
            for (ShapeClass s : list)
                System.out.println(s.toString());
    }

    public ShapeClass(){

    }

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

    public void setFilled(boolean filled) {
        isFilled = filled;
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

    public boolean isFilled() {
        return this.isFilled;
    }
    public String getShapeID(){
        return this.shapeID;
    }

    public List<ArrayList<ShapeClass>> getDatabase() {
        return database;
    }

    public List<ShapeClass> getShapes() {
        return shapes;
    }

    public void setShapes(ArrayList<ShapeClass> shapes) {
        this.shapes = shapes;
    }

    public void setDatabase(List<ArrayList<ShapeClass>> database) {
        this.database = database;
    }

    @Override
    public String toString() {
        return "ShapeClass{" +
                "x=" + x +
                ", y=" + y +
                ", fiCo='" + fiCo + '\'' +
                ", type='" + type + '\'' +
                ", shapeID='" + shapeID + '\'' +
                '}';
    }
}
/*
  public ShapeClass(JSONObject copiedShape) {
        this.x = (int) copiedShape.get("x");
        this.y = (int) copiedShape.get("y");
        this.width = (int) copiedShape.get("width");
        this.height = (int) copiedShape.get("height");
        this.fiCo = (String) copiedShape.get("fiCo");
        this.stCo = (String) copiedShape.get("stCo");
        this.stWi = (int) copiedShape.get("stWi");
        this.type = (String) copiedShape.get("type");
        this.isFilled = (String)(copiedShape.get("isFilled"))=="true";
        this.shapeID = (String) copiedShape.get("shapeID");
    }
 */