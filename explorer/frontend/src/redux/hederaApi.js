import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const hederaApi = createApi({
    reducerPath: 'hederaApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://'}),
    endpoints: (builder) => ({
        getTransactions: builder.query({
            query: (net) => ({
                url: `${net}/api/v1/transactions`,
                params: {
                    limit: 10,
                    order: 'desc'
                }
            }),
            transformResponse: (response) => response.transactions
        }),
        getSupply: builder.query({
            query: (net) => ({
                url: `testnet.mirrornode.hedera.com/api/v1/network/supply`
            })
        }),
        getTransaction: builder.query({
            query: ({net, id}) => ({
                url: `${net}/api/v1/transactions/${id}`

            }),
            transformResponse: (response) => response.transactions[0]
        }),
        
        getAccount: builder.query({
            query: ({net, acc}) => ({
                //url: `${net}/api/v1/accounts/${acc}`
                url: `localhost:8080/account/${acc}`
            }),
            transformResponse: (response) => response.data[0]
        }),
        getToken: builder.query({
            query: ({net, token}) => ({
                //url: `${net}/api/v1/tokens/${token}`
                url: `localhost:5551/api/v1/tokens/${token}`
            })
        })
    })
})

export const {useGetTransactionsQuery, useGetSupplyQuery, useGetTransactionQuery, useGetAccountQuery, useGetTokenQuery} = hederaApi;