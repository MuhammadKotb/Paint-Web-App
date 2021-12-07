package delgationInterfaceTest;

public class main {
	public static void main(String args []) {
		Cat c = new Cat();
		//Marker interface
		if (c instanceof java.io.Serializable) {
			// Delegation
			c.makeSound();//Output: Meow
		}else{
			c.lol();
		}
			
		// now to change the sound it makes 
		ISoundBehaiviour newsound = new RoarSound();
		c.setSoundBehaiviour(newsound);
		//Delegation
		c.makeSound ();//Output : Roar
	}
}
