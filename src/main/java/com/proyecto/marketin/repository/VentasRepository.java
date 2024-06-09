package com.proyecto.marketin.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyecto.marketin.model.TipoComprobante;
import com.proyecto.marketin.model.Venta;

public interface VentasRepository extends JpaRepository<Venta, Long> {
	
	

	
	List <Venta> findByCajaId(Long idCaja);
	
	List<Venta> findByFechaVentaBetween(LocalDate fechaInicio, LocalDate fechaFin);

    Optional <Venta> findByClienteId(Long idCliente);

    List<Venta> findByTipoComprobante(TipoComprobante tipoComprobante);
    
    Optional <Venta> findByFechaVenta(LocalDateTime fechaVenta);
    
}
