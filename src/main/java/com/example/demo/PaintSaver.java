package com.example.demo;
import java.util.ArrayList;
import java.util.List;


public class PaintSaver {
    private static List <ArrayList <Shape> > database = new ArrayList();
    private static ArrayList <Shape> objOnScreen = new ArrayList();
    private static int undo_count;

    public PaintSaver(Shape objAdded, Shape objRem, Shape objFilled) {
        if (objAdded!=null)
            objOnScreen.add(objAdded);

        if (objRem!=null)
            remObjFromScreen(objRem);

        if (objFilled!=null)
            fillerFoo(objFilled);

        database.add(objOnScreen);
        undo_count = 0;
    }

    public PaintSaver() {
    }


    void remObjFromScreen(Shape o){
        for ( Shape s : objOnScreen){
            if (s.equals(o)) {
                objOnScreen.remove(o);
                break;
            }
        }
    }

    void fillerFoo(Shape o){
        for ( Shape s : objOnScreen){
            if (s.equalsWithoutFill(o)) {
                s.setFill(true);
                s.setFlCo(o.getFlCo());
                break;
            }
        }
    }

    void undo(){
        undo_count++;
        ArrayList <Shape> prevScreen = database.get(database.size()-undo_count-1);
        //send this to angular in json and let it view the objects in the array exclusively
    }

    void redo(){
        if (undo_count!=0){
            undo_count--;
            ArrayList <Shape> nextScreen = database.get(database.size()-undo_count-1);
            //send this to angular in json and let it view the objects in the array exclusively
        }

    }

    void save(){
        //save to json file
    }

    void load(){
        //load from saved json file
    }


}







    /*
We use this if under any circumstances we werent able to use json
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
    }*/