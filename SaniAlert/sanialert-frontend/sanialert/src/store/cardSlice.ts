import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CardDTO, CardCreateDTO } from '../types/card';
import CardService from '../services/CardService';

interface CardState {
  cards: CardDTO[];
  selectedCardIds: string[];
  mostRecentCard: CardDTO | null;
  otherCards: CardDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: CardState = {
  cards: [],
  selectedCardIds: [],
  mostRecentCard: null,
  otherCards: [],
  loading: false,
  error: null
};

export const fetchCards = createAsyncThunk(
  'cards/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await CardService.getAllCards();
    } catch (error) {
      return rejectWithValue('Falha ao carregar os cards');
    }
  }
);

export const fetchMostRecentCard = createAsyncThunk(
  'cards/fetchMostRecent',
  async (_, { rejectWithValue }) => {
    try {
      return await CardService.getMostRecentCard();
    } catch (error) {
      return rejectWithValue('Falha ao carregar o card mais recente');
    }
  }
);

export const fetchOtherCards = createAsyncThunk(
  'cards/fetchOthers',
  async (_, { rejectWithValue }) => {
    try {
      return await CardService.getCardsExceptMostRecent();
    } catch (error) {
      return rejectWithValue('Falha ao carregar os outros cards');
    }
  }
);

export const createCard = createAsyncThunk(
  'cards/create',
  async (cardData: CardCreateDTO, { rejectWithValue }) => {
    try {
      return await CardService.createCard(cardData);
    } catch (error) {
      return rejectWithValue('Falha ao criar o card');
    }
  }
);

export const deleteCards = createAsyncThunk(
  'cards/delete',
  async (ids: string[], { rejectWithValue }) => {
    try {
      await CardService.deleteCards(ids);
      return ids;
    } catch (error) {
      return rejectWithValue('Falha ao deletar os cards');
    }
  }
);

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    toggleCardSelection(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.selectedCardIds.includes(id)) {
        state.selectedCardIds = state.selectedCardIds.filter(cardId => cardId !== id);
      } else {
        state.selectedCardIds.push(id);
      }
    },
    clearSelectedCards(state) {
      state.selectedCardIds = [];
    },
    selectAllCards(state) {
      state.selectedCardIds = state.cards.map(card => card.id);
    }
  },  extraReducers: (builder) => {
    builder.addCase(fetchCards.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCards.fulfilled, (state, action: PayloadAction<CardDTO[]>) => {
      state.loading = false;
      // Sort cards by date, newest first
      state.cards = action.payload.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
    builder.addCase(fetchCards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;    });

    builder.addCase(fetchMostRecentCard.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMostRecentCard.fulfilled, (state, action) => {
      state.loading = false;
      state.mostRecentCard = action.payload;
    });
    builder.addCase(fetchMostRecentCard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;    });

    builder.addCase(fetchOtherCards.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOtherCards.fulfilled, (state, action) => {
      state.loading = false;
      state.otherCards = action.payload;
    });
    builder.addCase(fetchOtherCards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;    });

    builder.addCase(createCard.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createCard.fulfilled, (state, action: PayloadAction<CardDTO>) => {
      state.loading = false;
      state.cards.push(action.payload);
      state.cards.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      if (!state.mostRecentCard || new Date(action.payload.date) > new Date(state.mostRecentCard.date)) {
        if (state.mostRecentCard) {
          state.otherCards.unshift(state.mostRecentCard);
        }
        state.mostRecentCard = action.payload;
      } else {
        state.otherCards.push(action.payload);
      }
    });
    builder.addCase(createCard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;    });

    builder.addCase(deleteCards.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCards.fulfilled, (state, action) => {
      state.loading = false;      const deletedIds = action.payload;
      state.cards = state.cards.filter(card => !deletedIds.includes(card.id));      
      if (state.mostRecentCard && deletedIds.includes(state.mostRecentCard.id)) {
        state.mostRecentCard = null;        if (state.otherCards.length > 0) {
          const sortedCards = [...state.otherCards].sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          state.mostRecentCard = sortedCards[0];
          state.otherCards = sortedCards.slice(1);        }
      } else {
        state.otherCards = state.otherCards.filter(card => !deletedIds.includes(card.id));      }
      
      state.selectedCardIds = state.selectedCardIds.filter(id => !deletedIds.includes(id));
    });
    builder.addCase(deleteCards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const { toggleCardSelection, clearSelectedCards, selectAllCards } = cardSlice.actions;

export default cardSlice.reducer;
