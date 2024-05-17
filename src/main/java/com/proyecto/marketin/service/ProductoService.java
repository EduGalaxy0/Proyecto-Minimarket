package com.proyecto.marketin.service;


import org.springframework.stereotype.Service;

import com.proyecto.marketin.model.Categoria;
import com.proyecto.marketin.model.Producto;
import com.proyecto.marketin.repository.CategoriaRepository;
import com.proyecto.marketin.repository.ProductoRepository;
import com.proyecto.marketin.request.AgregarProductoRequest;


@Service
public class ProductoService {
	
	private final ProductoRepository productoRepository;
	private final CategoriaRepository categoriaRepository;
	
	
	public ProductoService(ProductoRepository productoRepository, CategoriaRepository categoriaRepository) {
		super();
		this.productoRepository = productoRepository;
		this.categoriaRepository = categoriaRepository;
	}


	public void nuevoProducto(AgregarProductoRequest request) {

		Producto producto = new Producto();
		if (productoRepository.existsByNombre(request.getNombre())) {	
            throw new RuntimeException("Error: El producto con este nombre ya existe.");
        }
		Categoria categoria = new Categoria();
		categoria = categoriaRepository.findByNombre(request.getCategoria());
				producto.setNombre(request.getNombre());
				producto.setCantidad(request.getCantidad());
				producto.setPrecio(request.getPrecio());
				producto.setCategoria_id(categoria);
				producto.setDescripcion(request.getDescripcion());
		productoRepository.save(producto);
		
	}
	public void editarProducto(AgregarProductoRequest request){
		Producto producto = productoRepository.findByNombre(request.getNombre()).orElse(null);
        if (producto != null) {

        	if(request.getCategoria()!=null) {
        		
        		Categoria categoria = categoriaRepository.findByNombre(request.getCategoria());	
        		    producto.setCategoria_id(categoria);
 		
        	}

	    		if(request.getCantidad()!=null) {
	        		producto.setCantidad(request.getCantidad());
	        	}
    		
	    		if(request.getDescripcion()!=null) {
	        		producto.setDescripcion(request.getDescripcion());
	        	}
	    		if(request.getPrecio()!=null) {
	        		producto.setPrecio(request.getPrecio());
	        	}

                productoRepository.save(producto);
        }

	}
	
	public void eliminarProducto(Integer id) {
		if (productoRepository.existsById(id)) {	
            throw new RuntimeException("Error: El producto con el id no existe.");
        }
		productoRepository.deleteById(id);
	}
}
