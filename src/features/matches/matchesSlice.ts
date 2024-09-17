import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { fetchMatchesAPI } from "./matchesAPI.ts";

interface Match {
    idEvent: string;
    strEvent: string;
    dateEvent: string;
    strTime: string;
    // Последущие необходимые поля
}

interface MatchesState {
    matches: Match[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: MatchesState = {
    matches: [],
    status: 'idle',
    error: null,
};

export const fetchMatches = createAsyncThunk<Match[], void, { rejectValue: string}> (
    'matches/fetchMatches',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchMatchesAPI();
        } catch (err) {
            return rejectWithValue('Ошибка при загрузке данных');
        }
    }
)

// Создание слайс с типами
const matchesSlice = createSlice<MatchesState, {}, 'matches'>({
    name: 'matches',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMatches.pending, (state: MatchesState) => {
                state.status = 'loading';
            })
            .addCase(fetchMatches.fulfilled, (state: MatchesState, action: PayloadAction<Match[]>) => {
                state.status = 'succeeded';
                state.matches = action.payload;
            })
            // Теперь используем стандартный action.error.message для rejected
            .addCase(fetchMatches.rejected, (state: MatchesState, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Что-то пошло не так';
            });
    },
});

export default matchesSlice.reducer;