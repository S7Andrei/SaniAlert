package com.sanialert.sanialert.cardsystem.dto;

import java.time.LocalDate;
import java.util.UUID;

import com.sanialert.sanialert.cardsystem.model.ParameterQuality;
import com.sanialert.sanialert.cardsystem.model.WaterQualityStatus;

public class CardDTO {
    private UUID id;
    private String technicalResponsible;
    private LocalDate date;
    private Double turbidity;
    private ParameterQuality turbidityQuality;
    private Double dissolvedOxygen;
    private ParameterQuality dissolvedOxygenQuality;
    private Boolean heavyMetalsPresent;
    private Double heavyMetalsLevel;
    private ParameterQuality heavyMetalsQuality;
    private Boolean residuesDetected;
    private ParameterQuality residuesQuality;
    private Double ph;
    private ParameterQuality phQuality;
    private WaterQualityStatus status;
    private String description; 

    public CardDTO() {
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

    public ParameterQuality getTurbidityQuality() {
        return turbidityQuality;
    }

    public void setTurbidityQuality(ParameterQuality turbidityQuality) {
        this.turbidityQuality = turbidityQuality;
    }

    public Double getDissolvedOxygen() {
        return dissolvedOxygen;
    }

    public void setDissolvedOxygen(Double dissolvedOxygen) {
        this.dissolvedOxygen = dissolvedOxygen;
    }

    public ParameterQuality getDissolvedOxygenQuality() {
        return dissolvedOxygenQuality;
    }

    public void setDissolvedOxygenQuality(ParameterQuality dissolvedOxygenQuality) {
        this.dissolvedOxygenQuality = dissolvedOxygenQuality;
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

    public ParameterQuality getHeavyMetalsQuality() {
        return heavyMetalsQuality;
    }

    public void setHeavyMetalsQuality(ParameterQuality heavyMetalsQuality) {
        this.heavyMetalsQuality = heavyMetalsQuality;
    }

    public Boolean getResiduesDetected() {
        return residuesDetected;
    }

    public void setResiduesDetected(Boolean residuesDetected) {
        this.residuesDetected = residuesDetected;
    }

    public ParameterQuality getResiduesQuality() {
        return residuesQuality;
    }

    public void setResiduesQuality(ParameterQuality residuesQuality) {
        this.residuesQuality = residuesQuality;
    }

    public WaterQualityStatus getStatus() {
        return status;
    }

    public void setStatus(WaterQualityStatus status) {
        this.status = status;
    }

    public String getDescription() { 
        return description;
    }

    public void setDescription(String description) { 
        this.description = description;
    }

    public Double getPh() {
        return ph;
    }

    public void setPh(Double ph) {
        this.ph = ph;
    }

    public ParameterQuality getPhQuality() {
        return phQuality;
    }

    public void setPhQuality(ParameterQuality phQuality) {
        this.phQuality = phQuality;
    }
}
