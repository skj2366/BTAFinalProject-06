import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const hederaApi = createApi({
  reducerPath: 'hederaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://' }),
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (net) => ({
        url: `${net}/api/v1/transactions`,
        params: {
          limit: 10,
          order: 'desc',
        },
      }),
      transformResponse: (response) => response.transactions,
    }),
    getLocalTransactions: builder.query({
      query: (net) => ({
        url: `${net}/tx`,
        params: {
          limit: 10,
          order: 'desc',
        },
      }),
      transformResponse: (response) => response.data,
    }),
    getBlocks: builder.query({
      query: (net) => ({
        url: `${net}/api/v1/blocks`,
        params: {
          limit: 10,
          order: 'desc',
        },
      }),
      transformResponse: (response) => response.blocks,
    }),
    getLocalBlocks: builder.query({
      query: (net) => ({
        url: `${net}/block`,
        params: {
          limit: 10,
          order: 'desc',
        },
      }),
      transformResponse: (response) => response.data,
    }),
    getBlock: builder.query({
      query: ({ net, number }) => ({
        url: `${net}/api/v1/blocks/${number}`,
      }),
      transformResponse: (response) => response,
    }),
    getLocalBlock: builder.query({
      query: ({ net, number }) => ({
        url: `${net}/block/${number}`,
      }),
      transformResponse: (response) => response.data[0],
    }),
    getSupply: builder.query({
      query: (net) => ({
        url: `testnet.mirrornode.hedera.com/api/v1/network/supply`,
      }),
    }),
    getTransaction: builder.query({
      query: ({ net, id }) => ({
        url: `${net}/api/v1/transactions/${id}`,
      }),
      transformResponse: (response) => response.transactions[0],
    }),
    getAccounts: builder.query({
        query: ({ net, acc }) => ({
          url: `${net}/api/v1/accounts`
        }),
        transformResponse: (response) => response.accounts,
      }),
    getAccount: builder.query({
      query: ({ net, acc }) => ({
        //url: `${net}/api/v1/accounts/${acc}`
        url: `localhost:8080/account/${acc}`,
      }),
      transformResponse: (response) => response.data[0],
    }),
    getToken: builder.query({
      query: ({ net, token }) => ({
        //url: `${net}/api/v1/tokens/${token}`
        url: `localhost:5551/api/v1/tokens/${token}`,
      }),
    }),
    getTransactionForAccID: builder.query({
        query: ({ net, acc }) => ({
            url: `${net}/api/v1/transactions/?account.id=${acc}&order=desc`,
        }),
        transformResponse: (response) => response.transactions,
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetLocalTransactionsQuery,
  useGetBlocksQuery,
  useGetLocalBlocksQuery,
  useGetBlockQuery,
  useGetLocalBlockQuery,
  useGetSupplyQuery,
  useGetTransactionQuery,
  useGetAccountsQuery,
  useGetAccountQuery,
  useGetTokenQuery,
  useGetTransactionForAccIDQuery,
} = hederaApi;
