package com.proyecto.marketin.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller

public class AdministradorController {
	
	@GetMapping("/ListUsuarios")
	public String showUsers(){
		return "usuario";
		
	}
	
}
