package com.proyecto.marketin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.marketin.request.EmailRequest;
import com.proyecto.marketin.service.EmailService;

@RestController
public class EmailController {
    
    @Autowired
    EmailService emailService;

    @GetMapping("/enviarcorreo")
    public ResponseEntity<String> sendEmail(){
        emailService.sendEmail();
        return new ResponseEntity<String>("Correo enviado", HttpStatus.OK);
    }
    
    @PostMapping("/enviarcorreo-html")
    public ResponseEntity<String> sendEmailTemplate(@RequestBody EmailRequest request ){
        emailService.sendEmailTemplate(request);
        return new ResponseEntity<String>("Correo con plantilla enviado", HttpStatus.OK);
    }
}
