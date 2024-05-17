package com.proyecto.marketin.model;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import jakarta.persistence.Basic;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;


@Entity
@Table(name = "empleados", uniqueConstraints = {@UniqueConstraint(columnNames = {"username"})})
@SQLDelete(sql="UPDATE empleados SET estado = 0 WHERE id=?")
@Where(clause = "estado = 1")
public class Empleado implements UserDetails{
	
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private Integer id;
	@Basic
	@Column(nullable = false)
	private String username;
	
	private String password;
	private String firstname;
	private String lastname;
	private String email;
	private String address;
	private String numberphone;
	private Integer estado = 1;

	@ManyToMany(fetch = FetchType.EAGER, targetEntity = Perfil.class, cascade = CascadeType.MERGE)
	@JoinTable(name = "Empleado_Perfil", joinColumns = @JoinColumn(name = "id_Username"), inverseJoinColumns = @JoinColumn(name="id_Perfil"))
	private Set<Perfil> perfiles;
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return perfiles.stream().map(perfil -> new SimpleGrantedAuthority(perfil.getNombre())).collect(Collectors.toList());
				
	}
	
	public void setPerfiles(Set<Perfil> perfiles) {
        this.perfiles = perfiles;
    }

    public Set<Perfil> getPerfiles() {
        return perfiles;
    }
	public String getPassword() {

		return password;
	}
	
	public String getUsername() {

		return username;
	}
	@Override
	public boolean isAccountNonExpired() {

		return true;
	}
	@Override
	public boolean isAccountNonLocked() {

		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {

		return true;
	}
	@Override
	public boolean isEnabled() {

		return true;
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getNumberphone() {
		return numberphone;
	}

	public void setNumberphone(String numberphone) {
		this.numberphone = numberphone;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	public Integer getEstado() {
		return estado;
	}

	public void setEstado(Integer estado) {
		this.estado = estado;
	}


	
}

