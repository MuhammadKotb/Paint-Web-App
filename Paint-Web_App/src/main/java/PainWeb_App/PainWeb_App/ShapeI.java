package PainWeb_App.PainWeb_App;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public interface ShapeI {
    int x = 0;
    int y = 0;
    int width = 0;
    int height = 0;
    String fiCo = "";
    String stCo = "";
    int stWi = 0;
    String type = null;
    int is_filled = 0;
    String shapeID = null;


    int getX();
    int getY();
    int getWidth();
    int getHeight();
    int getStWi();
    int getIs_filled();
    String getType();
    String getFiCo();
    String getStCo();
    String getShapeID();



}