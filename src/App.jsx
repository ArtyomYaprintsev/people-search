import { useEffect, useState } from "react";

import { useLazySearchPeopleQuery } from "./redux/people/people.api";

import List from "./components/List";
import Loader from "./components/Loader";
import Pagination from "./components/Pagination";

import "./App.css";

// Could not find information about the page size manipulations for clients,
// so set the default value is set equal to the one that swapi uses
const SEARCHED_PAGE_SIZE = 10;
const DELAY_BEFORE_FETCH = 500;

function App() {
  const [personName, setPersonName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [searchPeople, { data, error, isFetching }] =
    useLazySearchPeopleQuery();

  const getLastPageNumber = (itemsCount) =>
    Math.ceil(itemsCount / SEARCHED_PAGE_SIZE);

  useEffect(() => {
    let timeoutId;

    if (personName) {
      const searchParams = new URLSearchParams({
        search: personName,
        page: currentPage,
      });

      timeoutId = setTimeout(
        () => searchPeople(searchParams.toString()),
        DELAY_BEFORE_FETCH
      );
    }

    return () => clearTimeout(timeoutId);
  }, [personName, currentPage, searchPeople]);

  useEffect(() => {
    if (error) alert(JSON.stringify(error, null, 2));
  }, [error]);

  return (
    <div id='search-page' className='page'>
      <div className='search-input__container'>
        <label htmlFor='people-search'>
          Enter the name of the person you are looking for
        </label>
        <input
          type='text'
          id='people-search'
          placeholder='e.g. Luke Skywalker or C-3PO'
          defaultValue={personName}
          onChange={(e) => setPersonName(e.target.value)}
        />
      </div>

      {isFetching && (
        <div className='loader__container'>
          <Loader />
          <p>
            Search for people whose name contains (case-insensitive) the
            substring '{personName}'.
          </p>
        </div>
      )}

      {Array.isArray(data?.results) && (
        <>
          <List
            renderItem={(person) => (
              <a href={person.url} target='_blank' rel='noreferrer'>
                {`${person.name} (gender: ${person.gender}, birth year: ${person.birth_year})`}
              </a>
            )}
            data={data.results}
            emptyListMessage={`People whose name contains the entered substring were not found.`}
            data-total-count={data.count}
          />

          <Pagination
            setPage={setCurrentPage}
            lastPage={getLastPageNumber(data.count)}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
}

export default App;
