package com.proyecto.marketin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyecto.marketin.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer>{

	Categoria findByNombre(String nombre);

	boolean existsByNombre(String nombre);

	void deleteByNombre(String nombre);
	
}
