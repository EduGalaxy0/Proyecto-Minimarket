package com.proyecto.marketin.service;

public class AgregarPerfilEmpleadoRequest {
	public AgregarPerfilEmpleadoRequest(String username, String perfil) {
		super();
		this.username = username;
		this.perfil = perfil;
	}
	String username;
	String perfil;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPerfil() {
		return perfil;
	}
	public void setPerfil(String perfil) {
		this.perfil = perfil;
	}
	
	
}
