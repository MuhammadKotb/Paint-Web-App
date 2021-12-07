package Singleton;
//singleton class
public class lol {
	//create static instance
	static lol obj = new lol();
	//make constructor private so that main cannot call a new instance from lol
	private lol() {}
	//define the getInstance method to be used in main
	public static lol getInstance () {
		return obj;
	}
