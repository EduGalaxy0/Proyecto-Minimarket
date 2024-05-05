package com.proyecto.marketin.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller

public class AdministradorController {
	


    
	
	@GetMapping("/ListUsuarios")
	public String showUsers(){
		return "usuario2";
		
	}
	@GetMapping("/register")
	public String register(){
		return "crear-usuario2";
	}
	
	
	@GetMapping("/editarUsuario")
	public String editarEmpleado(){
		
		return "editar-usuario";
	}
}
