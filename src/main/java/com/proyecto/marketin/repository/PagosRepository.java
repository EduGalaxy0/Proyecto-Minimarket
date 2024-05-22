package com.proyecto.marketin.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyecto.marketin.model.MetodoPago;
import com.proyecto.marketin.model.Pago;

public interface PagosRepository extends JpaRepository<Pago, Long>{
	
	List<Pago> findByCajaId(Long idCaja);
	
	List<Pago> findByVentaId(Long idVenta);

    List<Pago> findByFechaPagoBetween(LocalDate fechaInicio, LocalDate fechaFin);

    List<Pago> findByMetodoPago(MetodoPago metodoPago);
}
