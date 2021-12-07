package Composite;

import java.util.ArrayList;
import java.util.List;

public class Demo {
	public static void main(String a[]) {
		
		Employee CEO = new Employee ("John","CEO",30000);
		
		Employee headsales = new Employee ("Robert","Head Sales",20000);

		Employee headmarketing = new Employee ("Michael","Head Marketing",20000);

		Employee clerk1 = new Employee ("Laura","Marketing",10000);

		Employee clerk2 = new Employee ("Bob","Marketing",10000);

		Employee salesExecutive1 = new Employee ("Richard","Sales",10000);

		Employee salesExecutive2 = new Employee ("Rob","Sales",10000);
		
		//Building tree
		CEO.add(headsales);
		CEO.add(headmarketing);
		
		headsales.add(salesExecutive1);
		headsales.add(salesExecutive2);
		
		headmarketing.add(clerk1);
		headmarketing.add(clerk2);
		
		//root
		System.out.println(CEO.toString());
		for (Employee head : CEO.getSubordinates()) {
			System.out.println(head.toString());
			for (Employee emp : head.getSubordinates())
				//leafs
				System.out.println(emp.toString());
		}

		
	}
}
