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

    public ShapeClass(){

    }

    public ShapeClass(int x, int y, int width, int height, String fiCo, String stCo, int stWi, String type, int is_filled, String shapeID) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fiCo = fiCo;
        this.stCo = stCo;
        this.stWi = stWi;
        this.type = type;
        this.is_filled = is_filled;
        this.shapeID = shapeID;
    }

    public ShapeClass(String type, String error){ this.shapeID = error;this.type = type;}
    public ShapeClass(String type){
        this.type = type;
    }

    public int getX() {
        return this.x;
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

    public void setIs_filled(int is_filled) {
        this.is_filled = is_filled;
    }

    public void setShapeID(String shapeID) {
        this.shapeID = shapeID;
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

