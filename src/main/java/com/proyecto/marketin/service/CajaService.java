package com.proyecto.marketin.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.proyecto.marketin.model.Caja;
import com.proyecto.marketin.model.Empleado;
import com.proyecto.marketin.model.EstadoCaja;
import com.proyecto.marketin.model.Venta;
import com.proyecto.marketin.repository.CajaRepository;
import com.proyecto.marketin.repository.EmpleadoRepository;
import com.proyecto.marketin.repository.VentasRepository;
import com.proyecto.marketin.request.CerrarCajaRequest;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CajaService {

    private final CajaRepository cajaRepository;
	private final EmpleadoRepository empleadoRepository;
	private final VentasRepository	ventaRepository;
	
	public CajaService(CajaRepository cajaRepository, EmpleadoRepository empleadoRepository, VentasRepository	ventaRepository) {
		super();
		this.cajaRepository = cajaRepository;
		this.empleadoRepository = empleadoRepository;
		this.ventaRepository = ventaRepository;
	}

    public Caja abrirCaja(String username, BigDecimal montoInicial) {
        // Validar datos de entrada
        if (username == null || montoInicial == null || montoInicial.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Datos de entrada inválidos");
        }

        // Obtener empleado
        Empleado empleado = empleadoRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Empleado no encontrado"));

        // Crear caja
        Caja caja = new Caja();
        caja.setFechaApertura(LocalDateTime.now());
        caja.setEmpleado(empleado);
        caja.setMontoInicial(montoInicial);
        caja.setEstado(EstadoCaja.ABIERTO);

        // Guardar caja en la base de datos
        caja = cajaRepository.save(caja);

        return caja;
    }

    public Caja cerrarCaja(CerrarCajaRequest request) {
        // Validar id de caja
        if (request.getIdCaja() == null) {
            throw new IllegalArgumentException("ID de caja inválido");
        }
        System.out.println("aqui buscará la caja");
        // Obtener caja
        Caja caja = cajaRepository.findById(request.getIdCaja())
                .orElseThrow(() -> new EntityNotFoundException("Caja no encontrada"));
        
        // Calcular monto final
        BigDecimal ventasDiarias = calcularVentasDiarias(caja.getId());
        BigDecimal montoFinal = caja.getMontoInicial().add(ventasDiarias);
        //if(request.getMontoFinal() != montoFinal) {
        	//caja.setEstado(EstadoCaja.PROCESO);
        	//caja.setMontoFinal(montoFinal);
        //}
        //else {
            caja.setFechaCierre(LocalDateTime.now());
            caja.setMontoFinal(montoFinal);
            caja.setEstado(EstadoCaja.CERRADO);
        //}
        

        // Guardar cambios en la base de datos
        caja = cajaRepository.save(caja);
        return caja;
    }

    private BigDecimal calcularVentasDiarias(Long idCaja) {
        // Obtener ventas asociadas a la caja
        BigDecimal totalVentas = BigDecimal.ZERO;
        try {
            List<Venta> ventas = ventaRepository.findByCajaId(idCaja);
            for (Venta venta : ventas) {
                totalVentas = totalVentas.add(venta.getMontoPagado());
            }
        } catch (EmptyResultDataAccessException e) {
            // No se encontraron ventas para la caja
        }

        return totalVentas;
    }
    public Caja obtenerCajaPorId(Long idCaja) {
        return cajaRepository.findById(idCaja).orElse(null);
    }
}
