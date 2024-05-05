package com.proyecto.marketin.controller;


public class AuthResponse 
{
	String token;

	public AuthResponse(String token) {
		super();
		this.token = token;
	}
	public AuthResponse() {
		
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
}
