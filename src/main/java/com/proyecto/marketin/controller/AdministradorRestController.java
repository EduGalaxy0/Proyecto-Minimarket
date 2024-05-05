package com.proyecto.marketin.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.marketin.model.Empleado;
import com.proyecto.marketin.model.Perfil;
import com.proyecto.marketin.repository.EmpleadoRepository;
import com.proyecto.marketin.repository.PerfilRepository;
import com.proyecto.marketin.service.AgregarPerfilEmpleadoRequest;
import com.proyecto.marketin.service.AuthService;
import com.proyecto.marketin.service.RegisterPerfilRequest;


@RestController
@RequestMapping(value = "/v1")

public class AdministradorRestController {
	
	private final AuthService authService;
	private final EmpleadoRepository empleadoRepository;
	private final PerfilRepository perfilRepository;
	
	public AdministradorRestController(AuthService authService, EmpleadoRepository empleadoRepository,
			PerfilRepository perfilRepository) {
		super();
		this.authService = authService;
		this.empleadoRepository = empleadoRepository;
		this.perfilRepository = perfilRepository;
	}

	@PostMapping(value = "registerPost")
	public void register(@RequestBody RegisterRequest request){
		
		authService.register(request);
		
	}

	@GetMapping(value = "usuarios")
	public List<Empleado> getAllEmpleados() {
		return empleadoRepository.findAll();
	}

	@GetMapping(value = "perfiles")
	public List<Perfil> getAllPerfiles() {
		return perfilRepository.findAll();
	}

	@PostMapping(value = "agregarPerfil")
	public void setPerfil(@RequestBody RegisterPerfilRequest request) {

		authService.registerPerfil(request);
	}
	
	
	@PostMapping("/agregarPerfilEmpleado")
	public void setPerfilEmpleado(@RequestBody AgregarPerfilEmpleadoRequest request) {

		authService.agregarPerfilAEmpleado(request);
	}
	
	@GetMapping("/editarUsuario={username}?")
	public List<Empleado> getEmpleado(@PathVariable String username) {
		List<Empleado> empleado = new ArrayList();
		Optional<Empleado> empleadoOptional = empleadoRepository.findByUsername(username);
		if (empleadoOptional.isPresent()) {
		    Empleado empleadoEncontrado = empleadoOptional.get();
		    empleado.add(empleadoEncontrado);
		} else {
		    throw new RuntimeException("Error: El perfil no fue encontrado");
		}
		return empleado;
	}
	
	@PostMapping("/editarUsuario?=true")
	public void editarEmpleado(@RequestBody EditarEmpleadoRequest request) {
		authService.editarEmpleado(request);
	}
}
