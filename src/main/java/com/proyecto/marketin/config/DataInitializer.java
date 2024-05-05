/*package com.proyecto.marketin.config;

import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.proyecto.marketin.model.Empleado;
import com.proyecto.marketin.model.Perfil;
import com.proyecto.marketin.repository.EmpleadoRepository;
import com.proyecto.marketin.repository.PerfilRepository;


@Configuration
public class DataInitializer 
{
	
    @Bean
    CommandLineRunner initializeData(EmpleadoRepository empleadoRepository, PasswordEncoder passwordEncoder, PerfilRepository perfilRepository) 
    {
        return args ->
        {
        	
            
           
            
            Perfil administrador1 = new Perfil();
            administrador1.setNombre("ADMINISTRADOR");
            perfilRepository.save(administrador1);
            Empleado empleado2 = new Empleado();
            Set<Perfil> perfiles = new HashSet<>();
    		Optional<Perfil> perfilOptional = perfilRepository.findByNombre("ADMINISTRADOR");
    		if (perfilOptional.isPresent()) {
    		    Perfil perfilEncontrado = perfilOptional.get();
    		    perfiles.add(perfilEncontrado);
    		} else {
    		    throw new RuntimeException("Error: El perfil no fue encontrado");
    		}
            empleado2.setUsername("73037571");
            empleado2.setFirstname("Jimmy");
            empleado2.setLastname("Del Águila");
            empleado2.setEmail("jimmydelaguilaruiz@gmail.com ");
            empleado2.setAddress(" Jirón José Carlos Mariategui n° 123");
            empleado2.setNumberphone("965825089");
            empleado2.setPassword(passwordEncoder.encode("123456"));
            empleado2.setPerfiles(authorities1);
            empleadoRepository.save(empleado2);
            
        };
    }
}
*/