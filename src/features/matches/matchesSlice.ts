import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

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

export const fetchMatches - createAsyncThunk('matches/fetchMatches', async () => {
    const response = await axios.get(
        'https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=4328'
    );
    return response.data.events;
})