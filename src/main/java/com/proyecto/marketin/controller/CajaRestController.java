package com.proyecto.marketin.controller;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.marketin.model.Caja;
import com.proyecto.marketin.request.AperturaCajaRequest;
import com.proyecto.marketin.request.CerrarCajaRequest;
import com.proyecto.marketin.service.CajaService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/cajas")
public class CajaRestController {
	
	@Autowired
    private CajaService cajaService;

    @PostMapping("/abrir")
    public ResponseEntity<Caja> abrirCaja(@RequestBody AperturaCajaRequest request) {
        try {
            String username = request.getUsername();
            BigDecimal montoInicial = request.getMontoInicial();

            Caja cajaAbierta = cajaService.abrirCaja(username, montoInicial);
            return ResponseEntity.ok(cajaAbierta);
        } catch (IllegalArgumentException e) {
        	
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/cerrar")
    public Caja cerrarCaja(@RequestBody CerrarCajaRequest request) {
        
        	
            Caja cajaCerrada = cajaService.cerrarCaja(request);
            System.out.println(cajaCerrada);
            return cajaCerrada;
        
    }
    
    @GetMapping("/caja/{idCaja}")
    public ResponseEntity<Caja> obtenerCajaPorId(@PathVariable Long idCaja) {
        try {
            Caja caja = cajaService.obtenerCajaPorId(idCaja);
            if (caja != null) {
                return ResponseEntity.ok(caja);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
	
}
