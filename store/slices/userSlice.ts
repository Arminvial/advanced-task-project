// store/slices/userSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface UserState {
  user: {
    id: string
    name: string
    email: string
  } | null
}

const initialState: UserState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
