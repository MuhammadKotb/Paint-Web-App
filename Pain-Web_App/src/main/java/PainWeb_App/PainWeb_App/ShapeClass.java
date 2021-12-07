package PainWeb_App.PainWeb_App;

import org.glassfish.jersey.message.internal.StringHeaderProvider;

import java.util.ArrayList;
import java.util.List;

public class ShapeClass implements ShapeI {
    private int x = 0;
    private int y = 0;
    private int width = 0;
    private int height = 0;
    private String fiCo = null;
    private String stCo = null;
    private int stWi = 0;
    private String type = null;
    private boolean isFilled = false;

    private List<ShapeClass> shapes = new ArrayList<>();

    public void addShape(ShapeClass shape){
        this.shapes.add(shape);
    }


    public ShapeClass(){

    }
    public ShapeClass(String type){
        this.type = type;
    }

    public int getX() {
        return x;
    }


    public int getY() {
        return y;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }

    public String getFiCo() {
        return fiCo;
    }

    public String getStCo() {
        return stCo;
    }


    public int getStWi() {
        return stWi;
    }


    public String getType() {
        return type;
    }

    public boolean isFilled() {
        return isFilled;
    }




}
