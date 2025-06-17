package com.sanialert.sanialert.cardsystem.model;

import java.time.LocalDate;
import java.util.UUID;

public class Card {
    private UUID id;
    private String technicalResponsible;
    private LocalDate date;
    private Double ph;
    private Double turbidity;
    private Double dissolvedOxygen;
    private Boolean heavyMetalsPresent;
    private Double heavyMetalsLevel;
    private Boolean residuesDetected;
    private String description; 
    private WaterQualityStatus status;

    public Card() {
        this.id = UUID.randomUUID();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTechnicalResponsible() {
        return technicalResponsible;
    }

    public void setTechnicalResponsible(String technicalResponsible) {
        this.technicalResponsible = technicalResponsible;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getTurbidity() {
        return turbidity;
    }

    public void setTurbidity(Double turbidity) {
        this.turbidity = turbidity;
    }

    public Double getDissolvedOxygen() {
        return dissolvedOxygen;
    }

    public void setDissolvedOxygen(Double dissolvedOxygen) {
        this.dissolvedOxygen = dissolvedOxygen;
    }

    public Boolean getHeavyMetalsPresent() {
        return heavyMetalsPresent;
    }

    public void setHeavyMetalsPresent(Boolean heavyMetalsPresent) {
        this.heavyMetalsPresent = heavyMetalsPresent;
    }

    public Double getHeavyMetalsLevel() {
        return heavyMetalsLevel;
    }

    public void setHeavyMetalsLevel(Double heavyMetalsLevel) {
        this.heavyMetalsLevel = heavyMetalsLevel;
    }

    public Boolean getResiduesDetected() {
        return residuesDetected;
    }

    public void setResiduesDetected(Boolean residuesDetected) {
        this.residuesDetected = residuesDetected;
    }

    public Double getPh() {
        return ph;
    }

    public void setPh(Double ph) {
        this.ph = ph;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) { 
        this.description = description;
    }

    public WaterQualityStatus getStatus() {
        return status;
    }

    public void setStatus(WaterQualityStatus status) {
        this.status = status;
    }
}
