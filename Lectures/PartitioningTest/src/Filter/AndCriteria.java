package Filter;

import java.util.ArrayList;
import java.util.List;


//STEP 2: BUILD THE CONCRETE CLASSES THAT IMPLEMENTS INTERFACE
//THIS CLASS IS USED TO JOIN TWO FILTERS BY LOGICAL AND
public class AndCriteria implements Criteria{
	private Criteria criteria;
	private Criteria criteria2;
	public AndCriteria(Criteria criteria, Criteria criteria2) {
		super();
		//looks as interfaces but each is implemented by one of the 4 concrete classes
		//so by calling meetCriteria, they act as implemented in classes
		this.criteria = criteria;
		this.criteria2 = criteria2;
	}
	
	public List<Person> meetCriteria (List<Person> people){
		List <Person> firstCriteriaPeople = criteria.meetCriteria(people);
		return criteria2.meetCriteria(firstCriteriaPeople);
	}

}
