package PainWeb_App.PainWeb_App;

import org.glassfish.jersey.message.internal.StringHeaderProvider;

import java.util.ArrayList;
import java.util.List;

public class Triangle implements ShapeI {
    private int x = 0;
    private int y = 0;
    private int width = 120;
    private int height = 80;
    private String fiCo = "";
    private String stCo = "";
    private int stWi = 3;
    private String type = "triangle";
    private int is_filled = 0;
    private String shapeID = null;





    public Triangle(){}
    public Triangle(String type){
        this.type = type;
    }




    public int getX() {
        return this.x;
    }

    public int getY() {
        return this.y;
    }

    public int getWidth(){
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


}
