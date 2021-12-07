package com.example.demo;

public class Calculator {
    private boolean isSingle;
    private String result;
    public String[] exp;
    private boolean isError;

    public Calculator(String[] exp) {
        this.exp = exp;
        this.isSingle = exp.length==2;
        this.isError = false;
    }

    public void solve(){
        double n1 = Double.parseDouble(exp[0]);
        double res;
        if (isSingle){
            switch(exp[1]){
                case "inv": res = 1.0/n1;
                            break;
                case "sq":  res =  n1*n1;
                            break;
                case "sqrt":res = Math.sqrt(n1);
                            break;
                case "ai":  res =  n1*(-1);
                            break;
                default:    res = 0;
            }
        }else{
            double n2 = Double.parseDouble(exp[2]);
            switch(exp[1]){
                case "mod":  res =  n1%n2;
                           break;
                case "*":  res =  n1*n2;
                           break;
                case "/":  res =  n1/n2;
                           break;
                case "plus":  res =  n1+n2;
                           break;
                case "-":  res =  n1-n2;
                           break;
                default:   res =  0;
            }
        }
        result = String.valueOf(res);

        boolean cut = true;
        int i;
        for ( i=result.length()-1; i>1; i--){
            if (result.charAt(i)=='0'){
                continue;
            }else if (result.charAt(i)=='.'){
                break;
            }else{
                cut = false;
                break;
            }
        }
        if (cut==true)
            result = result.substring(0,i);

        if (result.length()>12)
            if (result.contains("."))
                result = result.substring(0,12);
            else
                result = "Too Large!";

    }

    public String send(){
        return result;
        //send result to angular
    }




}
