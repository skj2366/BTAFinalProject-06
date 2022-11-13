import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const serverApi = createApi({
    reducerPath: 'serverApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://'}),
    endpoints: (builder) => ({
        getLocalTransactions: builder.query({
            query: () => (
                {
                url: `localhost:8080/tx`,
                params: {
                    limit: 20,
                    order: 'desc'
                }
            }),
            transformResponse: (response) => response.data
        }),
      
        getLocalTransaction: builder.query({
            query: ({id}) => ({
                url: `localhost:8080/tx/${id}`
            }),
            transformResponse: (response) => response.data[0]
        }),

        getLocalAccounts: builder.query({
            query: () => ({
                url: `localhost:8080/account`
            }),
            transformResponse: (response) => response.data
        }),
        getLocalAccount: builder.query({
            query: ({acc}) => ({
                url: `localhost:8080/account/${acc}`
            })
        }),
        transformResponse: (response) => response.data
    })
})

export const {useGetLocalTransactionsQuery, useGetLocalTransactionQuery, useGetLocalAccountsQuery, useGetLocalAccountQuery} = serverApi;