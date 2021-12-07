
public class main {
	//TEST
	public static void main (String args[]) {
		ShapeFactory sf = new ShapeFactory();
		//now sf has method getShape
		Shape s1 = sf.getShape("CIRCLE");
		s1.draw();
		Shape s2 = sf.getShape("Square");
		s2.draw();
		Shape s3 = sf.getShape("rEctangle");
		s3.draw();
	}
}
