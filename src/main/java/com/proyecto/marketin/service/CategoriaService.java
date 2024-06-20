package com.proyecto.marketin.service;

import org.springframework.stereotype.Service;

import com.proyecto.marketin.model.Categoria;
import com.proyecto.marketin.repository.CategoriaRepository;
import com.proyecto.marketin.request.AgregarCategoriaRequest;
import com.proyecto.marketin.request.EditarCategoriaRequest;

@Service
public class CategoriaService {
	private final CategoriaRepository categoriaRepository;

	public CategoriaService(CategoriaRepository categoriaRepository) {
		super();
		this.categoriaRepository = categoriaRepository;
	}
	
	public void nuevoCategoria(AgregarCategoriaRequest request) {
		if (categoriaRepository.existsByNombre(request.getNombre())) {	
            throw new RuntimeException("Error: La categoria con este nombre ya existe.");
        }
		Categoria categoria = new Categoria();
		categoria.setNombre(request.getNombre());
		categoriaRepository.save(categoria);
	}
	
	public void editarCategoria(EditarCategoriaRequest request) {
		if (!categoriaRepository.existsByNombre(request.getNombre())) {	
            throw new RuntimeException("Error: La categoria que quiere editar no existe.");
        }
		Categoria categoria = categoriaRepository.findByNombre(request.getNombre()).orElseThrow();
		categoria.setNombre(request.getOtronombre());
	
	}
	public void eliminarCategoria(Integer id) {
		if (!categoriaRepository.existsById(id)) {	
            throw new RuntimeException("Error: La categoria con este nombre no existe.");
        }
		categoriaRepository.deleteById(id);
	}
}