import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        user: ""
    },
    reducers:{
        setUserEmail: (state, action) => {
            state.user = action.payload
        }
    }
})

export const {setUserEmail} = userSlice.actions

export default userSlice.reducer