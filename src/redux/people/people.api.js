import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const peopleApi = createApi({
  reducerPath: "peopleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swapi.dev/api/",
  }),
  endpoints: (builder) => ({
    searchPeople: builder.query({
      query: (searchParams) => ({
        url: `/people/?${searchParams ?? ""}`,
      }),
    }),
  }),
});

export const { useLazySearchPeopleQuery } = peopleApi;

export default peopleApi;
