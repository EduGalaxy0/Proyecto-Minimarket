package com.proyecto.marketin.request;

public class EmailRequest {
	
	 String mailFrom;
	 String mailTo;
	 String subject;
	 String username;
	 String codigo;
	
	public String getMailFrom() {
		return mailFrom;
	}
	public void setMailFrom(String mailFrom) {
		this.mailFrom = mailFrom;
	}
	public String getMailTo() {
		return mailTo;
	}
	public void setMailTo(String mailTo) {
		this.mailTo = mailTo;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	
	
}
