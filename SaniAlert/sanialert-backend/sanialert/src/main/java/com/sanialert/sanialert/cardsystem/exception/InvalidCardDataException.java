package com.sanialert.sanialert.cardsystem.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidCardDataException extends RuntimeException {

    public InvalidCardDataException(String message) {
        super(message);
    }
}
