package Filter;
import java.util.List;
import java.util.ArrayList;

//STEP 3: BUILD THE CONCRETE CLASSES THAT IMPLEMENTS INTERFACE
//IN OTHER WORDS, BUILD YOUR FILTER OPTIONS WHERE EACH OPTION IS SINGULAR
public class CriteriaFemale implements Criteria{

	public List<Person> meetCriteria (List<Person> people){
		List <Person> females = new ArrayList<>();
		for ( Person p : people) {
			if (p.getGender().equalsIgnoreCase("female")) {
				females.add(p);
			}
		}
		return females;
	}
}
