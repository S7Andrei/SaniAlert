package com.sanialert.sanialert.cardsystem.model;

public enum ParameterQuality {
    GOOD("Bom"),
    REGULAR("Regular"),
    CRITICAL("Crítico");

    private final String description;

    ParameterQuality(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
