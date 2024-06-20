package com.proyecto.marketin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.marketin.model.Categoria;
import com.proyecto.marketin.model.Producto;
import com.proyecto.marketin.repository.CategoriaRepository;
import com.proyecto.marketin.repository.ProductoRepository;
import com.proyecto.marketin.request.AgregarProductoRequest;
import com.proyecto.marketin.service.ProductoService;



@RestController
@RequestMapping(value = "/v3")

public class AlmaceneroRestController {
	
	private final ProductoService productoService;
	private final ProductoRepository productoRepository;
	private final CategoriaRepository categoriaRepository;
	
	
	public AlmaceneroRestController(ProductoService productoService, ProductoRepository productoRepository,
			CategoriaRepository categoriaRepository) {
		super();
		this.productoService = productoService;
		this.productoRepository = productoRepository;
		this.categoriaRepository = categoriaRepository;
	}
	@GetMapping(value = "productos")
	public List<Producto> getAllProductos() {
		return productoRepository.findAll();
	}
	@GetMapping(value = "categorias")
	public List<Categoria> getAllCategorias() {
		return categoriaRepository.findAll();
	}
	@PostMapping("/agregar")
    public ResponseEntity<?> agregarProducto(@RequestBody AgregarProductoRequest request) {
        try {
            Producto nuevoProducto = productoService.nuevoProducto(request);
            return ResponseEntity.ok(nuevoProducto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
	@PutMapping("/editar")
    public ResponseEntity<?> editarProducto(@RequestBody AgregarProductoRequest request) {
        try {
            productoService.editarProducto(request);
            return ResponseEntity.ok("Producto editado exitosamente.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Integer id) {
        try {
            productoService.eliminarProducto(id);
            return ResponseEntity.ok("Producto eliminado exitosamente.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
