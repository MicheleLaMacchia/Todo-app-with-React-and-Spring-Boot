package it.myapp.restfulwebservice.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Service;

import it.myapp.restfulwebservice.model.Todo;

@Service
public class TodoHardcoded {

	private static List<Todo> todos = new ArrayList();
	private static int idCounter = 0;
	
	static {
		todos.add(new Todo(++idCounter, "Michele", "Studiare React", 
				LocalDate.of(2020, 11, 25), false));
		todos.add(new Todo(++idCounter, "Michele", "Comprare la torta", 
				LocalDate.of(2020, 11, 25), false));
		todos.add(new Todo(++idCounter, "Michele", "Lavare i piatti", 
				LocalDate.of(2020, 11, 25), false));
	}
	
	public List<Todo> findAll() {
		return todos;
	}
	public Todo deleteById(long id) {
		Todo todo = findById(id);
		if (todo == null) {
			return null;
		}
		todos.remove(todo);
		return todo;
	}
	public Todo findById(long id) {
		for (Todo todo : todos) {
			if (todo.getId() == id) {
				return todo;
			}
		}
		return null;
	}
}
