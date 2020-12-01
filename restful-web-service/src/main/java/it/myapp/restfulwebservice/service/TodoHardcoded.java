package it.myapp.restfulwebservice.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import it.myapp.restfulwebservice.model.Todo;

@Service
public class TodoHardcoded {

	private static List<Todo> todos = new ArrayList<Todo>();
	private static Long idCounter = 0L;
	
	static {
		todos.add(new Todo(++idCounter, "Michele", "Studiare React", 
				LocalDate.of(2020, 11, 25), false));
		todos.add(new Todo(++idCounter, "Michele", "Comprare la torta", 
				LocalDate.of(2020, 11, 25), false));
		todos.add(new Todo(++idCounter, "Michele", "Lavare i piatti", 
				LocalDate.of(2020, 11, 25), false));
	}
	
	public Todo save(Todo todo) {
		if (todo.getId()== -1 || todo.getId()== 0) {
			todo.setId(++idCounter);
			todos.add(todo);
		} else {
			deleteById(todo.getId());
			todos.add(todo);
		}
		return todo;
	}
	
	public List<Todo> findAll() {
		return todos;
	}
	public Todo deleteById(Long id) {
		Todo todo = findById(id);
		if (todo == null) {
			return null;
		}
		todos.remove(todo);
		return todo;
	}
	public Todo findById(Long id) {
		for (Todo todo : todos) {
			if (todo.getId() == id) {
				return todo;
			}
		}
		return null;
	}
}
