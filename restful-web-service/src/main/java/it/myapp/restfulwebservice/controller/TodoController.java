package it.myapp.restfulwebservice.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import it.myapp.restfulwebservice.model.Todo;
import it.myapp.restfulwebservice.service.TodoHardcoded;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class TodoController {

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
	
	@PutMapping(path = "/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable("username") String username,
			@PathVariable("id") long id, @RequestBody Todo todo) {
		System.out.println(username +" -update- "+ todo);
		Todo todoUpdated = todoHardcoded.save(todo);
		return new ResponseEntity<Todo>(todoUpdated,HttpStatus.OK);
	}
	
	@PostMapping(path = "/users/{username}/todos")
	public ResponseEntity<Void> insertTodo(@PathVariable("username") String username,
			@RequestBody Todo todo) {
		System.out.println(username +" -save- "+ todo);
		Todo todoCreated = todoHardcoded.save(todo);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
			.buildAndExpand(todoCreated.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
}
