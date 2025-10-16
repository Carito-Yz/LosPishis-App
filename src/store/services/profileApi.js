import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rtdbBaseUrl = process.env.EXPO_PUBLIC_BASE_URL_RTDB

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: fetchBaseQuery({baseUrl: rtdbBaseUrl}),
    endpoints: (builder) => ({
        getProfilePicture: builder.query({
            query: (localId) => `profilePictures/${localId}.json`
        }),
        putProfilePicture: builder.mutation({
            query: (data) => ({
                url: `profilePictures/${data.localId}.json`,
                method: 'PUT',
                body:{
                    image: data.image
                }
            })
        })
    })
})

export const {useGetProfilePictureQuery, usePutProfilePictureMutation} = profileApi