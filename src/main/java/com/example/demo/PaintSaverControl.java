package com.example.demo;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="paint-web-app")
@CrossOrigin(origins="http://localhost:4200")
public class PaintSaverControl {

    //public String[] str = {"36","sqrt"}; // recieved from angular

    @GetMapping
    public void save(){//@RequestParam (value="expression", required=false, defaultValue = "0 + 0") String expression){
        //take param
        //add it to array of objects
        PaintSaver c = new PaintSaver(/*var*/);

    }

}