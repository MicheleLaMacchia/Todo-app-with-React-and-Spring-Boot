package it.myapp.basic.auth;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

// ho modificato il package di questa classe in modo tale che non abbia effetto.
// infatti di default le configurazione della sicurezza incide solo sulle sotto-cartelle
@Configuration
@EnableWebSecurity
public class SpringSecurityBasicAuth extends WebSecurityConfigurerAdapter{

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http
			.csrf().disable()
			.authorizeRequests()
			.antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
				.anyRequest().authenticated()
				.and()
		//	.formLogin().and()
			.httpBasic();
	}
}
