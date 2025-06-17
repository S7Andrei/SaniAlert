package com.sanialert.sanialert.cardsystem.service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.sanialert.sanialert.cardsystem.dto.CardCreateDTO;
import com.sanialert.sanialert.cardsystem.dto.CardDTO;
import com.sanialert.sanialert.cardsystem.exception.CardNotFoundException;
import com.sanialert.sanialert.cardsystem.exception.InvalidCardDataException;
import com.sanialert.sanialert.cardsystem.model.Card;
import com.sanialert.sanialert.cardsystem.model.ParameterQuality;
import com.sanialert.sanialert.cardsystem.utils.WaterQualityEvaluator;

@Service
public class CardService {

    private final List<Card> cards = new ArrayList<>();

    public CardDTO createCard(CardCreateDTO cardCreateDTO) {
        validateCardData(cardCreateDTO);

        Card card = new Card();
        card.setId(UUID.randomUUID());
        card.setTechnicalResponsible(cardCreateDTO.getTechnicalResponsible());
        card.setDate(cardCreateDTO.getDate() != null ? cardCreateDTO.getDate() : LocalDate.now());
        card.setTurbidity(cardCreateDTO.getTurbidity());
        card.setDissolvedOxygen(cardCreateDTO.getDissolvedOxygen());
        card.setHeavyMetalsPresent(cardCreateDTO.getHeavyMetalsPresent());
        card.setHeavyMetalsLevel(cardCreateDTO.getHeavyMetalsLevel());
        card.setResiduesDetected(cardCreateDTO.getResiduesDetected());
        card.setPh(cardCreateDTO.getPh());
        card.setDescription(cardCreateDTO.getResiduesDescription());

        ParameterQuality turbidityQuality = WaterQualityEvaluator.evaluateTurbidity(card.getTurbidity());
        ParameterQuality dissolvedOxygenQuality = WaterQualityEvaluator
                .evaluateDissolvedOxygen(card.getDissolvedOxygen());
        ParameterQuality heavyMetalsQuality = WaterQualityEvaluator.evaluateHeavyMetals(card.getHeavyMetalsPresent(),
                card.getHeavyMetalsLevel());
        ParameterQuality residuesQuality = WaterQualityEvaluator.evaluateResidues(card.getResiduesDetected());
        ParameterQuality phQuality = WaterQualityEvaluator.evaluatePh(card.getPh());

        card.setStatus(WaterQualityEvaluator.determineOverallStatus(
                turbidityQuality,
                dissolvedOxygenQuality,
                heavyMetalsQuality,
                residuesQuality, phQuality));

        cards.add(card);
        return convertToDTO(card, turbidityQuality, dissolvedOxygenQuality, heavyMetalsQuality, residuesQuality,
                phQuality);
    }

    public List<CardDTO> getAllCards() {
        return cards.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CardDTO getCardById(UUID id) {
        return cards.stream()
                .filter(card -> card.getId().equals(id))
                .findFirst()
                .map(this::convertToDTO)
                .orElseThrow(() -> new CardNotFoundException("Card not found with ID: " + id));
    }

    public CardDTO getMostRecentCard() {
        return cards.stream()
                .max(Comparator.comparing(Card::getDate))
                .map(this::convertToDTO)
                .orElse(null);
    }

    public List<CardDTO> getCardsExceptMostRecent() {
        if (cards.isEmpty()) {
            return Collections.emptyList();
        }

        Card mostRecentCard = cards.stream()
                .max(Comparator.comparing(Card::getDate))
                .orElse(null);

        if (mostRecentCard == null) {
            return Collections.emptyList();
        }

        return cards.stream()
                .filter(card -> !card.getId().equals(mostRecentCard.getId()))
                .map(this::convertToDTO).collect(Collectors.toList());
    }

    public void deleteCards(List<UUID> ids) {
        ids.forEach(id -> {
            boolean removed = cards.removeIf(card -> card.getId().equals(id));
            if (!removed) {
                throw new CardNotFoundException("Card not found with ID: " + id);
            }
        });
    }

    private void validateCardData(CardCreateDTO cardCreateDTO) {
        if (cardCreateDTO.getTechnicalResponsible() == null
                || cardCreateDTO.getTechnicalResponsible().trim().isEmpty()) {
            throw new InvalidCardDataException("Technical responsible is required");
        }

        if (cardCreateDTO.getTurbidity() != null && cardCreateDTO.getTurbidity() < 0) {
            throw new InvalidCardDataException("Turbidity cannot be negative");
        }

        if (cardCreateDTO.getDissolvedOxygen() != null && cardCreateDTO.getDissolvedOxygen() < 0) {
            throw new InvalidCardDataException("Dissolved Oxygen cannot be negative");
        }

        if (Boolean.TRUE.equals(cardCreateDTO.getHeavyMetalsPresent()) && cardCreateDTO.getHeavyMetalsLevel() == null) {
            throw new InvalidCardDataException("Heavy metals level must be provided when heavy metals are present");
        }
        if (cardCreateDTO.getHeavyMetalsLevel() != null && cardCreateDTO.getHeavyMetalsLevel() < 0) {
            throw new InvalidCardDataException("Heavy metals level cannot be negative");
        }

        if (cardCreateDTO.getPh() != null && cardCreateDTO.getPh() < 0) {
            throw new InvalidCardDataException("pH cannot be negative");
        }
    }

    private CardDTO convertToDTO(Card card) {
        ParameterQuality turbidityQuality = WaterQualityEvaluator.evaluateTurbidity(card.getTurbidity());
        ParameterQuality dissolvedOxygenQuality = WaterQualityEvaluator
                .evaluateDissolvedOxygen(card.getDissolvedOxygen());
        ParameterQuality heavyMetalsQuality = WaterQualityEvaluator.evaluateHeavyMetals(card.getHeavyMetalsPresent(),
                card.getHeavyMetalsLevel());
        ParameterQuality residuesQuality = WaterQualityEvaluator.evaluateResidues(card.getResiduesDetected());
        ParameterQuality phQuality = WaterQualityEvaluator.evaluatePh(card.getPh());
        return convertToDTO(card, turbidityQuality, dissolvedOxygenQuality, heavyMetalsQuality, residuesQuality,
                phQuality);
    }

    private CardDTO convertToDTO(Card card, ParameterQuality turbidityQuality,
            ParameterQuality dissolvedOxygenQuality, ParameterQuality heavyMetalsQuality,
            ParameterQuality residuesQuality, ParameterQuality phQuality) {

        CardDTO dto = new CardDTO();
        dto.setId(card.getId());
        dto.setTechnicalResponsible(card.getTechnicalResponsible());
        dto.setDate(card.getDate());
        dto.setTurbidity(card.getTurbidity());
        dto.setTurbidityQuality(turbidityQuality);
        dto.setDissolvedOxygen(card.getDissolvedOxygen());
        dto.setDissolvedOxygenQuality(dissolvedOxygenQuality);
        dto.setHeavyMetalsPresent(card.getHeavyMetalsPresent());
        dto.setHeavyMetalsLevel(card.getHeavyMetalsLevel());
        dto.setHeavyMetalsQuality(heavyMetalsQuality);
        dto.setResiduesDetected(card.getResiduesDetected());
        dto.setResiduesQuality(residuesQuality);
        dto.setPh(card.getPh());
        dto.setPhQuality(phQuality);
        dto.setStatus(card.getStatus());
        dto.setDescription(card.getDescription()); 

        return dto;
    }
}
