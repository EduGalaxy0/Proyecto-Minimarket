package com.proyecto.marketin.request;

public class RegisterPerfilRequest {

	String perfil;

	public RegisterPerfilRequest(String perfil) {
		super();
		this.perfil = perfil;
	}

	public String getPerfil() {
		return perfil;
	}

	public void setPerfil(String perfil) {
		this.perfil = perfil;
	}
	
}
