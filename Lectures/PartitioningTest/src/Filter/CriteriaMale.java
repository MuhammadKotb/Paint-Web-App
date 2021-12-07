package Filter;
import java.util.List;
import java.util.ArrayList;


//STEP 3: BUILD THE CONCRETE CLASSES THAT IMPLEMENTS INTERFACE
//IN OTHER WORDS, BUILD YOUR FILTER OPTIONS WHERE EACH OPTION IS SINGULAR
public class CriteriaMale implements Criteria{

	public List<Person> meetCriteria (List<Person> people){
		List <Person> males = new ArrayList<>();
		for ( Person p : people) {
			if (p.getGender().equalsIgnoreCase("male")) {
				males.add(p);
			}
		}
		return males;
	}
}
