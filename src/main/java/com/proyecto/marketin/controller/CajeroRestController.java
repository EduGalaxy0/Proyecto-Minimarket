package com.proyecto.marketin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.marketin.model.Venta;
import com.proyecto.marketin.request.NuevaVentaBoletaRequest;
import com.proyecto.marketin.service.VentasService;


@RestController
@RequestMapping(value = "/auth/v2")

public class CajeroRestController {
	
	private final VentasService ventasService;
	
	
	public CajeroRestController(VentasService ventasService) {
		super();
		this.ventasService = ventasService;
	}
	
	@GetMapping(value = "cajero")
	public String Cajero() {
		return "Todas las funcionalidades del Cajero";
	}
	@PostMapping("/cajero/realizarventa")
	public ResponseEntity<Venta> nuevaVenta(@RequestBody NuevaVentaBoletaRequest nuevaBoleta ){
		return ResponseEntity.ok(ventasService.guardarBoleta(nuevaBoleta));
	}
	
}

