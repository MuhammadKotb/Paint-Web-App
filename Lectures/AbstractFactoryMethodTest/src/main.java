
public class main {
	//TEST
	public static void main (String args[]) {
		AbstractFactory sf = FactoryProducer.getFactory(false);
		//now sf has method getShape
		Shape s2 = sf.getShape("Square");
		s2.draw();
		Shape s3 = sf.getShape("rEctangle");
		s3.draw();
		AbstractFactory sf2 = FactoryProducer.getFactory(true);
		//now sf2 has method getShape
		Shape s5 = sf2.getShape("Square");
		s5.draw();
		Shape s6 = sf2.getShape("rEctangle");
		s6.draw();
	}
}
