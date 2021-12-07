package com.example.demo;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="calculator")
@CrossOrigin(origins="http://localhost:4200")
public class CalControl {

    //public String[] str = {"36","sqrt"}; // recieved from angular

    @GetMapping
    public String calculate(@RequestParam (value="expression", required=false, defaultValue = "0 + 0") String expression){
        String[] str = expression.split(" ");
        Calculator c = new Calculator(str);
        c.solve();
        return c.send();
    }

}
