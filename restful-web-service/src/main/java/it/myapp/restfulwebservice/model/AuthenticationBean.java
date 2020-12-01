package it.myapp.restfulwebservice.model;

public class AuthenticationBean {
	private String message;
	public AuthenticationBean(String message) {
		super();
		this.message = message;
	}
	public AuthenticationBean() {
		super();
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
}
