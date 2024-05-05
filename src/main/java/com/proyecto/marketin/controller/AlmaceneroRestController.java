package com.proyecto.marketin.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping(value = "/v3")

public class AlmaceneroRestController {
	
	@GetMapping(value = "almacenero")
	public String Almacenero() {
		return "Todas las funcionalidades del Almacenero";
	}
}
