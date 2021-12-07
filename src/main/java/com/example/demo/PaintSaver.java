package com.example.demo;
import java.util.ArrayList;
import java.util.List;


public class PaintSaver {
    private ArrayList <Shape> objOfOneAction = new ArrayList();
    private List <ArrayList <Shape> > database = new ArrayList();
    private List <Shape> objOnScreen = new ArrayList();

    public PaintSaver(String objAdded, String objRem, String objFilled) {
        Shape objAddedShape = new Shape();
        join(objAddedShape,objAdded);
        objOfOneAction.add(objAddedShape);
        objOnScreen.add(objAddedShape);

        Shape objRemShape = new Shape();
        join(objRemShape,objRem);
        objOfOneAction.add(objRemShape);
        remObjFromScreen(objRemShape);

        Shape objFilledShape = new Shape();
        join(objFilledShape,objFilled);
        objOfOneAction.add(objFilledShape);
        fillerFoo(objFilledShape);
    }

    void join (Shape o, String s){
        if (o.getType() == "none")
            o = null;
        String[] splitObj = s.split(" ");
        o.setX(Integer.parseInt(splitObj[0]));
        o.setY(Integer.parseInt(splitObj[1]));
        o.setWidth(Integer.parseInt(splitObj[2]));
        o.setHeight(Integer.parseInt(splitObj[3]));
        o.setFlCo(splitObj[4]);
        o.setStCo(splitObj[5]);
        o.setWidth(Integer.parseInt(splitObj[6]));
        o.setType(splitObj[7]);
        o.setFill(splitObj[8]=="true" ? true : false);
    }

    void remObjFromScreen(Shape o){
        for ( Shape s : objOnScreen){
            if (s.equals(o)) {
                objOnScreen.remove(o);
                break;
            }
        }
    }

    //fillerfoo missing

    //undo missing

    //redo missing

    //save missing

    //load missing


}
