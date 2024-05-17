package com.proyecto.marketin.model;


import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;




@Entity
public class Perfil implements GrantedAuthority
{
	
	public Perfil(Integer id, String nombre) {
		super();
		this.id = id;
		this.nombre = nombre;
	}
	public Perfil() {
		
	}

	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private Integer id;
	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getNombre() {
		return nombre;
	}


	public void setNombre(String nombre) {
		this.nombre = nombre;
	}


	private String nombre;

	
	@Override
    public String getAuthority() {
        return "ROLE_" + nombre;
    }

}