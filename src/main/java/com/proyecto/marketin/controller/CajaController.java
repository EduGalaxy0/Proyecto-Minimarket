package com.proyecto.marketin.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class CajaController {
	
	@GetMapping(value = "caja")
	public String caja() {
		return "caja";
	}
}
