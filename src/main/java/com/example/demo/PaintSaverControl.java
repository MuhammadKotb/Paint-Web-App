package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(path="/PaintDMJK")
@CrossOrigin(origins="http://localhost:4200")
public class PaintSaverControl {
    //object filled or object added or (objected added and object removed) // recieved from angular

    //we did it using getMapping where object is passed from angular in the form of tostring without use of json
    //should be later edited to impelement the http request using json

    @PostMapping("/backup")
    public void save(@RequestBody  Shape objAdded
                   , @RequestBody  Shape objRem
                   , @RequestBody  Shape objFilled){

        new PaintSaver(objAdded,objRem,objFilled);

    }

    @PostMapping("/undo")
    public void undo(){
        PaintSaver c = new PaintSaver();
        c.undo();
    }

    @PostMapping("/redo")
    public void redo(){
        PaintSaver c = new PaintSaver();
        c.redo();
    }

}







/*
We use this if under any circumstances we werent able to use json
    @GetMapping
    public void save(@RequestParam (value="oa", required=false, defaultValue = "none") String objAdded
                   , @RequestParam (value="or",      defaultValue = "none") String objRem
                   , @RequestParam (value="of",  defaultValue = "none") String objFilled
                   , @RequestParam (value="foo",  defaultValue = "none") String foo){
                    */