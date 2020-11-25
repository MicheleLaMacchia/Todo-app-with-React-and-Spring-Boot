package it.myapp.restfulwebservice.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import it.myapp.restfulwebservice.model.Message;

@RestController
@CrossOrigin
public class BaseController {

	@GetMapping(path = "/hello-world/{nome}")
	public Message HelloWorld(@PathVariable("nome") String nome ) {
		return new Message(String.format("Benvenuto %s", nome));
	}
}
