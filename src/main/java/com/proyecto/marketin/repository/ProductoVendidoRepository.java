package com.proyecto.marketin.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyecto.marketin.model.ProductoVendido;

public interface ProductoVendidoRepository extends JpaRepository<ProductoVendido, Long>{
	
	ProductoVendido findByVentaId(Long idVenta);

    List<ProductoVendido> findByProductoId(Long idProducto);

    List<ProductoVendido> findByPrecioVentaBetween(BigDecimal precioMinimo, BigDecimal precioMaximo);
}	
