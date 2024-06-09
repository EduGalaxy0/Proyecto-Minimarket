package com.proyecto.marketin.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.proyecto.marketin.jwt.JwtAuthenticationFilter;;

@Configuration
@EnableWebSecurity

public class WebSecurityConfig {
	
	public WebSecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, AuthenticationProvider authProvider) {
		super();
		this.jwtAuthenticationFilter = jwtAuthenticationFilter;
		this.authProvider = authProvider;
	}


	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	private final  AuthenticationProvider authProvider;
	
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		
			return http
					.csrf(csrf -> csrf
							.disable())
					.authorizeHttpRequests(authRequest -> {
							authRequest.requestMatchers("/auth/**",
	        						"/js/**",
	        						"/v1/css/**",
	        						"/css/**", "/flags/**","/images/**","/plugins/**","/fonts/**"
	        					).permitAll();
							authRequest.requestMatchers("/ListUsuarios/**", "/v1/**").hasAuthority("ADMINISTRADOR");
							authRequest.requestMatchers("/caja").hasAnyAuthority("CAJERO","ADMINISTRADOR");
							authRequest.requestMatchers("/auth/v3/**").hasAnyAuthority("ALMACENERO","ADMINISTRADOR");
							authRequest.anyRequest().authenticated();})
					.formLogin(login -> login	
							.loginPage("/login")
							.defaultSuccessUrl("/index")
				            .failureUrl("/login?error=true")
							.permitAll()
			                )
					
					.sessionManagement(sessionManager -> sessionManager
							.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
					.authenticationProvider(authProvider)
					.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
					.build();
				
	}

}
