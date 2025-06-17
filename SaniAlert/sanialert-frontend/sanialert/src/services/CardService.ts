import type { CardCreateDTO, CardDTO } from '../types/card';

const API_URL = 'http://localhost:8080/api/cards';

class CardService {
  async getAllCards(): Promise<CardDTO[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching cards:', error);
      throw error;
    }  }

  async getCardById(id: string): Promise<CardDTO> {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching card ${id}:`, error);
      throw error;
    }  }

  async getMostRecentCard(): Promise<CardDTO | null> {
    try {
      const response = await fetch(`${API_URL}/most-recent`);
      if (response.status === 204) {
        return null;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching most recent card:', error);
      throw error;
    }
  }

  /**
   * Obtém todos os cards exceto o mais recente
   */
  async getCardsExceptMostRecent(): Promise<CardDTO[]> {
    try {
      const response = await fetch(`${API_URL}/except-most-recent`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching cards except most recent:', error);
      throw error;
    }  }

  async createCard(cardData: CardCreateDTO): Promise<CardDTO> {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating card:', error);
      throw error;
    }  }

  async deleteCards(ids: string[]): Promise<void> {
    try {
      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ids)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting cards:', error);
      throw error;
    }
  }
}

export default new CardService();
