
public class Shop {
	public static  void  main(String args[]) {
		//we use set methods to give parameters values but not all 
		//which is why we use builder DP
		Phone p = new  PhoneBuilder().setOs("IOS").setCamera(8).getPhone();
		System.out.println(p);
	}
	
	
}
