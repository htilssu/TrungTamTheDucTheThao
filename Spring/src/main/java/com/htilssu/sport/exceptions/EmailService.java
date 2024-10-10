package com.htilssu.sport.exceptions;

import java.util.Locale;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final MessageSource messageSource; 
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    public EmailService(JavaMailSender mailSender, MessageSource messageSource) {
        this.mailSender = mailSender;
        this.messageSource = messageSource;
    }

    public void sendResetLink(String email, String resetLink) {
        if (!isValidEmail(email) || !isValidResetLink(resetLink)) {
            throw new IllegalArgumentException("Invalid email or reset link");
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(messageSource.getMessage("email.reset.subject", null, Locale.getDefault()));
        message.setText(messageSource.getMessage("email.reset.body", new Object[]{resetLink}, Locale.getDefault()));

        try {
            mailSender.send(message);
            logger.info("Reset password email sent to {}", email);
        } catch (MailException e) {
            logger.error("Failed to send reset password email to {}", email, e);
            throw new EmailSendingException("Failed to send reset password email", e);
        }
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"; 
        return email != null && Pattern.matches(emailRegex, email);
    }

    private boolean isValidResetLink(String resetLink) {     
        return resetLink != null && resetLink.length() > 10; 
    }
}
