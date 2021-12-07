
public class PhoneBuilder {
	//have same attributes of phone class
	private String os;
	private String processor;
	private double screenSize;
	private int battery;
	private int camera;
	
	//has setters which help us pick and choose what to give
	//initial values and what to ignore
	public PhoneBuilder setOs(String os) {
		this.os = os;
		return this;
	}
	public PhoneBuilder setProcessor(String processor) {
		this.processor = processor;
		return this;
	}
	public PhoneBuilder setScreenSize(double screenSize) {
		this.screenSize = screenSize;
		return this;
	}
	public PhoneBuilder setBattery(int battery) {
		this.battery = battery;
		return this;
	}
	public PhoneBuilder setCamera(int camera) {
		this.camera = camera;
		return this;
	}
	//returns the phone we want
	public Phone getPhone() {
		return new Phone(os, processor, screenSize, battery, camera);
	}
	
	
}
