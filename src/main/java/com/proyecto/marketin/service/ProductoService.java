package com.proyecto.marketin.service;


import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.proyecto.marketin.model.Categoria;
import com.proyecto.marketin.model.Empleado;
import com.proyecto.marketin.model.Perfil;
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
				producto.setCategoria(categoria);
				producto.setDescripcion(request.getDescripcion());
		productoRepository.save(producto);
		
	}
	public void editarProducto(AgregarProductoRequest request){
		Producto producto = productoRepository.findByNombre(request.getNombre()).orElse(null);
        if (producto != null) {
        	
        	Set<Perfil> perfil = new HashSet<>();
        	if(request.getPerfil()!=null) {
        		
        		Optional<Perfil> perfilOptional = perfilRepository.findByNombre(request.getPerfil());
        		if (perfilOptional.isPresent()) {
        		    Perfil perfilEncontrado = perfilOptional.get();
        		    perfil.add(perfilEncontrado);
        		} else {
        		    throw new RuntimeException("Error: El perfil no fue encontrado");
        		}
        	}

	    		if(request.getFirstname()!=null) {
	        		empleado.setFirstname(request.getFirstname());
	        	}
    		
	    		if(request.getLastname()!=null) {
	        		empleado.setLastname(request.getLastname());
	        	}
	    		
	    		if(request.getEmail()!=null) {
            		empleado.setEmail(request.getEmail());
            	}
	    		
	    		if(request.getNumberphone()!=null) {
            		empleado.setNumberphone(request.getNumberphone());
            	}
	    		
            	if(request.getAddress()!=null) {
            		empleado.setAddress(request.getAddress());
            	}
            	
            	if(request.getPassword()!=null) {
            		empleado.setPassword(request.getPassword());
            	}
            	
            	if(request.getPerfil()!=null) {
            		empleado.setPerfiles(perfil);
            	}
            	
                empleadoRepository.save(empleado);
	}

}
