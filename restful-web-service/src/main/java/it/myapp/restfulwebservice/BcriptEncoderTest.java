package it.myapp.restfulwebservice;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BcriptEncoderTest {

	public static void main(String[] args) {
		
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String encodedPsw = encoder.encode("Michele");
		System.out.println(encodedPsw);
		
		

	}

}
