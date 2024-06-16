package com.proyecto.marketin.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    
    
    private JavaMailSender  javaMailSender;
    private TemplateEngine templateEngine;
    
    public EmailService(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    public void sendEmail(){

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("eduysting@hotmail.com");
        message.setTo("eduysting@gmail.com");
        message.setSubject("Pruebita");
        message.setText("esto es el contenido del email");

        javaMailSender.send(message);
    }
    
    public void sendEmailTemplate() {
    	MimeMessage message = javaMailSender.createMimeMessage();
    	try {
    		MimeMessageHelper helper = new MimeMessageHelper(message, true);
    		Context context = new Context();
    		String htmlText = templateEngine.process("email-template", context);
    		helper.setFrom("eduysting@hotmail.com");
            helper.setTo("eduysting@gmail.com");
            helper.setSubject("Pruebita");
            helper.setText(htmlText, true);
            javaMailSender.send(message);
    	}
    	catch(MessagingException e) {
    		e.printStackTrace();
    	}
    }
}
