package com.sanialert.sanialert.cardsystem.config;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.sanialert.sanialert.cardsystem.dto.CardCreateDTO;
import com.sanialert.sanialert.cardsystem.service.CardService;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(CardService cardService) {
        return args -> {
            CardCreateDTO card1 = new CardCreateDTO();
            card1.setTechnicalResponsible("João Silva");
            card1.setDate(LocalDate.now().minusDays(5));
            card1.setTurbidity(0.8);
            card1.setDissolvedOxygen(6.5);
            card1.setHeavyMetalsPresent(true);
            card1.setHeavyMetalsLevel(0.0007);
            card1.setResiduesDetected(false);
            card1.setPh(7.2);
            cardService.createCard(card1);

            CardCreateDTO card2 = new CardCreateDTO();
            card2.setTechnicalResponsible("Maria Oliveira");
            card2.setDate(LocalDate.now().minusDays(3));
            card2.setTurbidity(0.5);
            card2.setDissolvedOxygen(6.0);
            card2.setHeavyMetalsPresent(false);
            card2.setResiduesDetected(false);
            card2.setPh(6.2);
            cardService.createCard(card2);

            CardCreateDTO card3 = new CardCreateDTO();
            card3.setTechnicalResponsible("Carlos Pereira");
            card3.setDate(LocalDate.now());
            card3.setTurbidity(6.2);
            card3.setDissolvedOxygen(2.8);
            card3.setHeavyMetalsPresent(true);
            card3.setHeavyMetalsLevel(0.06);
            card3.setResiduesDetected(false);
            card3.setPh(5.5);
            cardService.createCard(card3);

            CardCreateDTO card4 = new CardCreateDTO();
            card4.setTechnicalResponsible("Ana Santos");
            card4.setDate(LocalDate.now().plusDays(1));
            card4.setTurbidity(0.7);
            card4.setDissolvedOxygen(5.5);
            card4.setHeavyMetalsPresent(true);
            card4.setHeavyMetalsLevel(0.0005);
            card4.setResiduesDetected(false);
            card4.setPh(7.8);

            cardService.createCard(card4);
        };
    }
}
