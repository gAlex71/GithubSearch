import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const LS_FAV_KEY = 'lfk'

interface GithubState{
    favorites: string[]
}

const initialState: GithubState = {
    // Данные будем получать из localStorage и приводить их к строке
    favorites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]')
}

export const githubSlice = createSlice({
    name: 'github',
    initialState,
    //Описываем то, как изменяем состояние
    reducers: {
        addFavorite(state, action: PayloadAction<string>){
            state.favorites.push(action.payload)
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites))
        },
        removeFavorite(state, action: PayloadAction<string>){
            state.favorites = state.favorites.filter(f => f !== action.payload)
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites))
        }
    }
})

export const githubActions = githubSlice.actions
export const githubReducer = githubSlice.reducer