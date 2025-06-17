package com.sanialert.sanialert.cardsystem.dto;

import java.time.LocalDate;

public class CardCreateDTO {
    private String technicalResponsible;
    private LocalDate date;
    private Double turbidity;
    private Double dissolvedOxygen;
    private Boolean heavyMetalsPresent;
    private Double heavyMetalsLevel;
    private Boolean residuesDetected;
    private Double ph;
    private String residuesDescription;

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

    public String getResiduesDescription() { 
        return residuesDescription;
    }

    public void setResiduesDescription(String residuesDescription) { 
        this.residuesDescription = residuesDescription;
    }
}
