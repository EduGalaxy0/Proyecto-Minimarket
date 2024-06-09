package com.proyecto.marketin.request;

import java.math.BigDecimal;


public class CerrarCajaRequest {

    private Long idCaja;
    private BigDecimal montoFinal;
    
	public Long getIdCaja() {
		return idCaja;
	}
	public void setIdCaja(Long idCaja) {
		this.idCaja = idCaja;
	}
	public BigDecimal getMontoFinal() {
		return montoFinal;
	}
	public void setMontoFinal(BigDecimal montoFinal) {
		this.montoFinal = montoFinal;
	}

    // Getters y setters

  
}