package com.proyecto.marketin.request;

import java.math.BigDecimal;
import java.time.LocalDate;


public class NuevaVentaFacturaRequest {
	//cliente
    Long idCliente;
    String nombreCliente;
    String direccionCliente;
    String telefonoCliente;
    String emailCliente;
    String ruc;
    //venta
    LocalDate fechaVenta;
    Long idCaja;
    BigDecimal montoPagado;
    
}
