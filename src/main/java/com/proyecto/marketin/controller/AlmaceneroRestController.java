package com.proyecto.marketin.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.marketin.model.Producto;
import com.proyecto.marketin.repository.ProductoRepository;



@RestController
@RequestMapping(value = "/v3")

public class AlmaceneroRestController {
	
	private final ProductoRepository productoRepository;
	
	public AlmaceneroRestController(ProductoRepository productoRepository) {
		super();
		this.productoRepository = productoRepository;
	}

	@GetMapping(value = "productos")
	public List<Producto> getAllProductos() {
		return productoRepository.findAll();
	}
}
