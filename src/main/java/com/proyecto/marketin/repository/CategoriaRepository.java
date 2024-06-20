package com.proyecto.marketin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyecto.marketin.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer>{

	

	boolean existsByNombre(String nombre);

	Optional<Categoria> findByNombre(String categoria);


	
}
