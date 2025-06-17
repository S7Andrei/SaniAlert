package com.sanialert.sanialert.cardsystem.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sanialert.sanialert.cardsystem.dto.CardCreateDTO;
import com.sanialert.sanialert.cardsystem.dto.CardDTO;
import com.sanialert.sanialert.cardsystem.service.CardService;

@RestController
@RequestMapping("/api/cards")
@CrossOrigin(origins = "*")
public class CardController {

    private final CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping
    public ResponseEntity<CardDTO> createCard(@RequestBody CardCreateDTO cardCreateDTO) {
        CardDTO createdCard = cardService.createCard(cardCreateDTO);
        return new ResponseEntity<>(createdCard, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CardDTO>> getAllCards() {
        List<CardDTO> cards = cardService.getAllCards();
        return ResponseEntity.ok(cards);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CardDTO> getCardById(@PathVariable UUID id) {
        CardDTO card = cardService.getCardById(id);
        return ResponseEntity.ok(card);
    }

    @GetMapping("/most-recent")
    public ResponseEntity<CardDTO> getMostRecentCard() {
        CardDTO mostRecentCard = cardService.getMostRecentCard();
        if (mostRecentCard == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(mostRecentCard);
    }

    @GetMapping("/except-most-recent")
    public ResponseEntity<List<CardDTO>> getCardsExceptMostRecent() {
        List<CardDTO> cards = cardService.getCardsExceptMostRecent();
        return ResponseEntity.ok(cards);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteCards(@RequestBody List<UUID> ids) {
        cardService.deleteCards(ids);
        return ResponseEntity.noContent().build();
    }
}
