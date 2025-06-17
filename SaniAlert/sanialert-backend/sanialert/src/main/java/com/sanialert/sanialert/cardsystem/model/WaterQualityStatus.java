package com.sanialert.sanialert.cardsystem.model;

public enum WaterQualityStatus {
    GOOD("Boa"),
    REGULAR("Regular"),
    CRITICAL("Crítica");

    private final String description;

    WaterQualityStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
