package com.example.demo;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/PaintDMJK")
@CrossOrigin(origins="http://localhost:4200")
public class PaintSaverControl {

    //object filled or object added or (objected added and object removed) // recieved from angular
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

    @PostMapping("/save")
    public void save(){
        PaintSaver c = new PaintSaver();
        c.save();
    }

    @PostMapping("/load")
    public void load(){
        PaintSaver c = new PaintSaver();
        c.load();
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