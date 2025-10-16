import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        user: "",
        localId: "",
        profilePicture: ""
    },
    reducers:{
        setUserEmail: (state, action) => {
            state.user = action.payload
        },
        setLocalId: (state, action) => {
            state.localId = action.payload
        },
        setProfilePicture: (state, action) => {
            state.profilePicture = action.payload
        },
        clearUser: (state, action) => {
            state.user = "",
            state.localId = "",
            state.profilePicture = ""
        }
    }
})

export const {setUserEmail, setLocalId, setProfilePicture, clearUser} = userSlice.actions

export default userSlice.reducer