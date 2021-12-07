package Filter;
import java.util.List;
import java.util.ArrayList;


//STEP 3: BUILD THE CONCRETE CLASSES THAT IMPLEMENTS INTERFACE
//IN OTHER WORDS, BUILD YOUR FILTER OPTIONS WHERE EACH OPTION IS SINGULAR
public class CriteriaTaken implements Criteria{

	public List<Person> meetCriteria (List<Person> people){
		List <Person> taken = new ArrayList<>();
		for ( Person p : people) {
			if (p.getMartialStatus().equalsIgnoreCase("taken")) {
				taken.add(p);
			}
		}
		return taken;
	}
}
