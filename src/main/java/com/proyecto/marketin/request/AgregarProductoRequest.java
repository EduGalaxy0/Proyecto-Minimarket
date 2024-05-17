package com.proyecto.marketin.request;

import java.math.BigDecimal;

public class AgregarProductoRequest {
		String nombre;
		Integer cantidad;
		String categoria;
		BigDecimal precio;
		String descripcion;
		
		public String getDescripcion() {
			return descripcion;
		}
		public void setDescripcion(String descripcion) {
			this.descripcion = descripcion;
		}
		public String getNombre() {
			return nombre;
		}
		public void setNombre(String nombre) {
			this.nombre = nombre;
		}
		public Integer getCantidad() {
			return cantidad;
		}
		public void setCantidad(Integer cantidad) {
			this.cantidad = cantidad;
		}
		public String getCategoria() {
			return categoria;
		}
		public void setCategoria(String categoria) {
			this.categoria = categoria;
		}
		public BigDecimal getPrecio() {
			return precio;
		}
		public void setPrecio(BigDecimal precio) {
			this.precio = precio;
		}
}
