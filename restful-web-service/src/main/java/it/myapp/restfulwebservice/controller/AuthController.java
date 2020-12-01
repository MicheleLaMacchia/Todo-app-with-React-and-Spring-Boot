package it.myapp.restfulwebservice.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import it.myapp.restfulwebservice.model.AuthenticationBean;
// controller utilizzato per autenticazione con BasicAuth
@RestController
@CrossOrigin(origins="http://localhost:4200")
public class AuthController {
	
	@GetMapping(path = "/basicauth")
	public AuthenticationBean getAllTodos() {
		System.out.println("sei autentitcato");
		return new AuthenticationBean("Sei autenticato");
	}

}
