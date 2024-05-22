package com.proyecto.marketin.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto.marketin.model.Cliente;
import com.proyecto.marketin.model.MetodoPago;
import com.proyecto.marketin.model.Pago;
import com.proyecto.marketin.model.ProductoVendido;
import com.proyecto.marketin.model.TipoComprobante;
import com.proyecto.marketin.model.Venta;
import com.proyecto.marketin.repository.ClientesRepository;
import com.proyecto.marketin.repository.PagosRepository;
import com.proyecto.marketin.repository.ProductoVendidoRepository;
import com.proyecto.marketin.repository.VentasRepository;

@Service
public class VentasService {

    @Autowired
    private VentasRepository ventasRepository;

    @Autowired
    private PagosRepository pagosRepository;

    @Autowired
    private ClientesRepository clientesRepository;

    @Autowired
    private ProductoVendidoRepository productoVendidoRepository;
    
    //Metodos de busqueda
 
    public Venta buscarVentaPorCajaId(Long idCaja) {
        return ventasRepository.findByCajaId(idCaja).orElse(null);
    }


    public List<Venta> buscarVentasPorRangoFechaVenta(LocalDate fechaInicio, LocalDate fechaFin) {
        return ventasRepository.findByFechaVentaBetween(fechaInicio, fechaFin);
    }


    public Venta buscarVentaPorClienteId(Long idCliente) {
        return ventasRepository.findByClienteId(idCliente).orElse(null);
    }


    public List<Venta> buscarVentasPorTipoComprobante(TipoComprobante tipoComprobante) {
        return ventasRepository.findByTipoComprobante(tipoComprobante);
    }

  
    public List<Pago> buscarPagosPorCajaId(Long idCaja) {
        return pagosRepository.findByCajaId(idCaja);
    }


    public List<Pago> buscarPagosPorVentaId(Long idVenta) {
        return pagosRepository.findByVentaId(idVenta);
    }


    public List<Pago> buscarPagosPorRangoFechaPago(LocalDate fechaInicio, LocalDate fechaFin) {
        return pagosRepository.findByFechaPagoBetween(fechaInicio, fechaFin);
    }


    public List<Pago> buscarPagosPorMetodoPago(MetodoPago metodoPago) {
        return pagosRepository.findByMetodoPago(metodoPago);
    }


    public List<Cliente> buscarClientesPorNombre(String nombre) {
        return clientesRepository.findByNombre(nombre);
    }


    public List<Cliente> buscarClientesPorDireccion(String direccion) {
        return clientesRepository.findByDireccion(direccion);
    }


    public List<Cliente> buscarClientesPorTelefono(String telefono) {
        return clientesRepository.findByTelefono(telefono);
    }

 
    public List<ProductoVendido> buscarProductosVendidosPorVentaId(Long idVenta) {
        return productoVendidoRepository.findByVentaId(idVenta);
    }


    public List<ProductoVendido> buscarProductosVendidosPorProductoId(Long idProducto) {
        return productoVendidoRepository.findByProductoId(idProducto);
    }


    public List<ProductoVendido> buscarProductosVendidosPorRangoPrecioVenta(BigDecimal precioMinimo, BigDecimal precioMaximo) {
        return productoVendidoRepository.findByPrecioVentaBetween(precioMinimo, precioMaximo);
    }
}