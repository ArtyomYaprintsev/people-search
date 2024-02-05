// https://swapi.dev/api/people/

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const peopleApi = createApi({
  reducerPath: "peopleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swapi.dev/api/",
  }),
  endpoints: (builder) => ({
    searchPeople: builder.query(() => ({
      query: (name) => ({
        url: `/people/?search=${name ?? ""}`,
      }),
    })),
  }),
});

export const { useLazySearchPeopleQuery } = peopleApi;

export default peopleApi;
