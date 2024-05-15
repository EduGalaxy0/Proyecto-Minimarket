package com.proyecto.marketin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AlmaceneroController {
	
	@GetMapping("/productos")
	public String mostrarProductos() {
		return "productos";
	}
}
