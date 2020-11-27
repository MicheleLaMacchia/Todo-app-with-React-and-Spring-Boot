package it.myapp.restfulwebservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import it.myapp.restfulwebservice.model.Todo;
import it.myapp.restfulwebservice.service.TodoHardcoded;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class BaseController {

		@Autowired
		TodoHardcoded todoHardcoded;
	
	@GetMapping(path = "/users/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable("username") String username) {
		System.out.println(username);
		return todoHardcoded.findAll();
	}
	
	@GetMapping(path = "/users/{username}/todos/{id}")
	public Todo getATodo(@PathVariable("username") String username,
			@PathVariable("id") long id) {
		System.out.println(username +" "+ id);
		return todoHardcoded.findById(id);
	}
	
	@DeleteMapping(path = "/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable("username") String username,  
		@PathVariable("id") long id) {
		Todo todo = todoHardcoded.deleteById(id);
		if (todo!= null) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
	
}
