package com.proyecto.marketin.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


public class NuevaVentaBoletaRequest  {
	  	//cliente
	     String documento;
	     String nombreCliente;
	     String direccionCliente;
	     String telefonoCliente;
	     String emailCliente;
	     //venta
	     LocalDateTime fechaVenta;
	     Long idCaja;
	     BigDecimal montoPagado;
	     int metodoPago;
	     public int getMetodoPago() {
			return metodoPago;
		}
		public void setMetodoPago(int metodoPago) {
			this.metodoPago = metodoPago;
		}
		List<ProductoVendidoRequest> productosVendidos;
	     
	     
	     
	     
		public String getDocumento() {
			return documento;
		}
		public void setDocumento(String documento) {
			this.documento = documento;
		}
		public List<ProductoVendidoRequest> getProductosVendidos() {
			return productosVendidos;
		}
		public void setProductosVendidos(List<ProductoVendidoRequest> productosVendidos) {
			this.productosVendidos = productosVendidos;
		}
		
		public String getNombreCliente() {
			return nombreCliente;
		}
		public void setNombreCliente(String nombreCliente) {
			this.nombreCliente = nombreCliente;
		}
		public String getDireccionCliente() {
			return direccionCliente;
		}
		public void setDireccionCliente(String direccionCliente) {
			this.direccionCliente = direccionCliente;
		}
		public String getTelefonoCliente() {
			return telefonoCliente;
		}
		public void setTelefonoCliente(String telefonoCliente) {
			this.telefonoCliente = telefonoCliente;
		}
		public String getEmailCliente() {
			return emailCliente;
		}
		public void setEmailCliente(String emailCliente) {
			this.emailCliente = emailCliente;
		}
		
		public LocalDateTime getFechaVenta() {
			return fechaVenta;
		}
		public void setFechaVenta(LocalDateTime fechaVenta) {
			this.fechaVenta = fechaVenta;
		}
		public Long getIdCaja() {
			return idCaja;
		}
		public void setIdCaja(Long idCaja) {
			this.idCaja = idCaja;
		}
		public BigDecimal getMontoPagado() {
			return montoPagado;
		}
		public void setMontoPagado(BigDecimal montoPagado) {
			this.montoPagado = montoPagado;
		}
		
		
	     
}
