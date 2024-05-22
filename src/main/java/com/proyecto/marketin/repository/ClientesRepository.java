package com.proyecto.marketin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyecto.marketin.model.Cliente;

public interface ClientesRepository extends JpaRepository<Cliente, Long>{
	
	List<Cliente> findByNombre(String nombre);

    List<Cliente> findByDireccion(String direccion);

    List<Cliente> findByTelefono(String telefono);
}
