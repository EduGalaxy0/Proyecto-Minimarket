package com.proyecto.marketin.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.proyecto.marketin.model.Caja;
import com.proyecto.marketin.model.Cliente;
import com.proyecto.marketin.model.MetodoPago;
import com.proyecto.marketin.model.Producto;
import com.proyecto.marketin.model.ProductoVendido;
import com.proyecto.marketin.model.TipoComprobante;
import com.proyecto.marketin.model.Venta;
import com.proyecto.marketin.repository.CajaRepository;
import com.proyecto.marketin.repository.ClientesRepository;
import com.proyecto.marketin.repository.ProductoRepository;
import com.proyecto.marketin.repository.ProductoVendidoRepository;
import com.proyecto.marketin.repository.VentasRepository;
import com.proyecto.marketin.request.NuevaVentaBoletaRequest;
import com.proyecto.marketin.request.ProductoVendidoRequest;

@Service
public class VentasService {
 
	
	public VentasService(VentasRepository ventasRepository, ClientesRepository clienteRepository,
			ProductoVendidoRepository productoVendidoRepository, CajaRepository cajaRepository,
			ProductoRepository productoRepository) {
		super();
		this.ventasRepository = ventasRepository;
		this.clienteRepository = clienteRepository;
		this.productoVendidoRepository = productoVendidoRepository;
		this.cajaRepository = cajaRepository;
		this.productoRepository = productoRepository;
	}
	
    private final VentasRepository ventasRepository;
	private final ClientesRepository clienteRepository;   
    private final ProductoVendidoRepository productoVendidoRepository;   
    private final CajaRepository cajaRepository;
    private final ProductoRepository productoRepository;
    
    
    //Metodos de busqueda

    public Venta guardarBoleta(NuevaVentaBoletaRequest boletaRequest) {
        // Validar datos de boletaRequest

        // Buscar o crear cliente
    	if(clienteRepository.findByDocumento(boletaRequest.getDocumento()) == null) {
    	
                    Cliente nuevoCliente = new Cliente();
                    nuevoCliente.setDocumento(boletaRequest.getDocumento());
                    nuevoCliente.setNombre(boletaRequest.getNombreCliente());
                    nuevoCliente.setDireccion(boletaRequest.getDireccionCliente());
                    nuevoCliente.setTelefono(boletaRequest.getTelefonoCliente());
                    nuevoCliente.setEmail(boletaRequest.getEmailCliente());
                    clienteRepository.save(nuevoCliente);
    	}
    	Cliente cliente =  clienteRepository.findByDocumento(boletaRequest.getDocumento()).orElseThrow();

        // Crear venta
        Venta venta = new Venta();
        venta.setFechaVenta(boletaRequest.getFechaVenta());
        Caja caja = cajaRepository.findById(boletaRequest.getIdCaja()).orElseThrow();
        venta.setCaja(caja);
        if(boletaRequest.getMetodoPago() == 1) {
        	venta.setMetodoPago(MetodoPago.EFECTIVO);
        }
        else if(boletaRequest.getMetodoPago() == 2) {
        	venta.setMetodoPago(MetodoPago.TARJETA);
        }
        else if(boletaRequest.getMetodoPago() == 3) {
        	venta.setMetodoPago(MetodoPago.TRANSFERENCIA);
        }
        venta.setTipoComprobante(TipoComprobante.BOLETA);
        venta.setMontoPagado(boletaRequest.getMontoPagado());
        venta.setCliente(cliente);
        ventasRepository.save(venta);
        venta = ventasRepository.findByFechaVenta(boletaRequest.getFechaVenta()).orElseThrow();
        List<ProductoVendido> productoVendidos = new ArrayList<>();
       
        
        for (ProductoVendidoRequest productoVendidoRequest : boletaRequest.getProductosVendidos()) {
            ProductoVendido productoVendido = new ProductoVendido();
            // Set ProductoVendido attributes from ProductoVendidoRequest
            productoVendido.setVenta(venta); // Assuming you have access to the 'venta' object
            Producto producto = productoRepository.findById(productoVendidoRequest.getIdProducto()).orElseThrow();
            productoVendido.setProducto(producto);
            productoVendido.setCantidad(productoVendidoRequest.getCantidad());
            productoVendido.setPrecioVenta(productoVendidoRequest.getPrecioVenta());
            productoVendido.setDescuento(productoVendidoRequest.getDescuento());
            productoVendido.setImpuesto(productoVendidoRequest.getImpuesto());
            productoVendido.setSubTotal(productoVendidoRequest.getSubTotal());
            productoVendidoRepository.save(productoVendido);
            ProductoVendido productoVendidoDone = productoVendidoRepository.findByVentaId(venta.getId());
            productoVendidos.add(productoVendidoDone);
            System.out.println(productoVendidoDone.toString());
        }
        return venta;
    }

    
}