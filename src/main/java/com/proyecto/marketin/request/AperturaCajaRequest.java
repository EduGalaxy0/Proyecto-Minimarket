package com.proyecto.marketin.request;

import java.math.BigDecimal;


public class AperturaCajaRequest {

    private String username;
    private BigDecimal montoInicial;

    // Getters y setters

    

    public BigDecimal getMontoInicial() {
        return montoInicial;
    }

    public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setMontoInicial(BigDecimal montoInicial) {
        this.montoInicial = montoInicial;
    }
}