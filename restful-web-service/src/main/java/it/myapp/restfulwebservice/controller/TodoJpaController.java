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
import it.myapp.restfulwebservice.service.TodoJpaRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class TodoJpaController {

//		@Autowired
//		TodoHardcoded todoHardcoded;
		@Autowired
		TodoJpaRepository todoJpaRepository;
	
	@GetMapping(path = "/jpa/users/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable("username") String username) {
		System.out.println(username);
		return todoJpaRepository.findByUsername(username);
	}
	
	@GetMapping(path = "/jpa/users/{username}/todos/{id}")
	public Todo getATodo(@PathVariable("username") String username,
			@PathVariable("id") Long id) {
		System.out.println(username +" "+ id);
			if (id == -1) return null;
		return todoJpaRepository.findById(id).get();
	}
	
	@DeleteMapping(path = "/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable("username") String username,  
		@PathVariable("id") Long id) {
		todoJpaRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(path = "/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable("username") String username,
			@PathVariable("id") Long id, @RequestBody Todo todo) {
		System.out.println(username +" -update- "+ todo);
		todo.setUsername(username);
		Todo todoUpdated = todoJpaRepository.save(todo);
		return new ResponseEntity<Todo>(todoUpdated,HttpStatus.OK);
	}
	
	@PostMapping(path = "/jpa/users/{username}/todos")
	public ResponseEntity<Void> insertTodo(@PathVariable("username") String username,
			@RequestBody Todo todo) {
		System.out.println(username +" -save- "+ todo);
		todo.setUsername(username);
		Todo todoCreated = todoJpaRepository.save(todo);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
			.buildAndExpand(todoCreated.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
}
