package com.proyecto.marketin.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyecto.marketin.model.Caja;

public interface CajaRepository extends JpaRepository<Caja, Long>{
	
	List<Caja> findByEmpleadoId(Long idEmpleado);

    List<Caja> findByFechaAperturaBetween(LocalDateTime fechaInicio, LocalDateTime fechaFin);

    List<Caja> findByFechaCierreBetween(LocalDateTime fechaInicio, LocalDateTime fechaFin);
}
