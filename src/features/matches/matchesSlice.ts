import { createSlice, createAsyncThunk, PayloadAction, SerializedError} from "@reduxjs/toolkit";
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
    error: SerializedError | null;
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
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue('Неизвестная ошибка')
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
                state.error = null;         // Сбрасываем ошибку при новой попытке
            })
            .addCase(fetchMatches.fulfilled, (state: MatchesState, action: PayloadAction<Match[]>) => {
                state.status = 'succeeded';
                state.matches = action.payload;
            })
            // Теперь используем стандартный action.error.message для rejected
            .addCase(fetchMatches.rejected, (state: MatchesState, action) => {
                state.status = 'failed';
                state.error = action.error as SerializedError || { message: 'Что-то пошло не так' };    // Использование SerializedError для ошибки
            });
    },
});

export default matchesSlice.reducer;