import java.lang.String;
//STEP 3: CREATE FACTORY TO SPECIFY DESIRED CLASS
public class AbstractFactory {
	//this class is a factory class that chooses which class we should return according to shape
	public Shape getShape(String shapeType) {
		//The following doesnt count as this method is overwritten by classes shapeFactory and RoundedShapefactory
		if (shapeType == null)
			return null;
		if (shapeType.equalsIgnoreCase("RECTANGLE")) 
			return new Rectangle();
		else if (shapeType.equalsIgnoreCase("SQUARE")) 
			return new Square();
		return null;
	}
}
