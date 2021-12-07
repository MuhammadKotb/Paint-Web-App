package com.example.demo;

import java.util.Objects;

public class Shape {
    private int x;
    private int y;
    private int width;
    private int height;
    private String flCo;
    private String stCo;
    private int stWi;
    private String type;
    private boolean isFill;

    public Shape(int x, int y, int width, int height, String flCo, String stCo, int stWi, String type, boolean isFill) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.flCo = flCo;
        this.stCo = stCo;
        this.stWi = stWi;
        this.type = type;
        this.isFill = isFill;
    }

    public Shape() {
    }

    @Override
    public String toString() {
        return "Shape{" +
                "x=" + x +
                ", y=" + y +
                ", width=" + width +
                ", height=" + height +
                ", flCo='" + flCo + '\'' +
                ", stCo='" + stCo + '\'' +
                ", stWi=" + stWi +
                ", type='" + type + '\'' +
                ", isFill=" + isFill +
                '}';
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public void setFlCo(String flCo) {
        this.flCo = flCo;
    }

    public void setStCo(String stCo) {
        this.stCo = stCo;
    }

    public void setStWi(int stWi) {
        this.stWi = stWi;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setFill(boolean fill) {
        isFill = fill;
    }

    public String getType() {
        return type;
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

    public String getFlCo() {
        return flCo;
    }

    public String getStCo() {
        return stCo;
    }

    public int getStWi() {
        return stWi;
    }

    public boolean isFill() {
        return isFill;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Shape)) return false;
        Shape shape = (Shape) o;
        return getX() == shape.getX() && getY() == shape.getY() && getWidth() == shape.getWidth() && getHeight() == shape.getHeight() && getStWi() == shape.getStWi() && isFill() == shape.isFill() && getFlCo().equals(shape.getFlCo()) && getStCo().equals(shape.getStCo()) && getType().equals(shape.getType());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getX(), getY(), getWidth(), getHeight(), getFlCo(), getStCo(), getStWi(), getType(), isFill());
    }
}
