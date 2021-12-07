//chooses which factory to pick according to a boolean parameter
public class FactoryProducer {
	public static AbstractFactory getFactory(Boolean round) {
		if (round)
			return new RoundedShapesFactory();
		else
			return new ShapeFactory();
	}

}
