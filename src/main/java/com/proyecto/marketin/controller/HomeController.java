package com.proyecto.marketin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping
public class HomeController {
	
	
	@GetMapping("/login")
	public String Login() {
		return "authentication-signin";

	}
	
	
	
	@GetMapping("/index")
	public String home(){
		return "index";
	}
	
	
	
	@GetMapping("/boleta")
	public String boleta(){
		return "boleta";
	}
	@GetMapping("/factura")
	public String factura(){
		return "factura";
	}
	
	
	
	@GetMapping("/comprar")
	public String comprar(){
		return "comprar";
	}
	@GetMapping("/proveedores")
	public String proveedores(){
		return "proveedores";
	}
	
	
	
	@GetMapping("/categoria")
	public String categorias(){
		return "categoria";
	}
	
	
	
	@GetMapping("/productos")
	public String productos(){
		return "productos";
	}
	
	
	
	@GetMapping("/rventas")
	public String rventas(){
		return "rventas";
	}
}