import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from '@/features/moviesSlice'

const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer
  }
})


export type StateType = ReturnType<typeof store.getState>;

export default store;