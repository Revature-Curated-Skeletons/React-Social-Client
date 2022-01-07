import React, { SyntheticEvent, useEffect, useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap'
import { reverbClient } from "../../remote/reverb-api/reverbClient";
import ResultsList from './ResultsList'
import SearchResult from './SearchResult'

function SearchBar() {
  const [input, setInput] = useState("");
  const [initialResults, setInitialResults] = useState<SearchResult[]>([]);

  async function getSearch() {
    const resp = await reverbClient.get(`/api/search?query=${input}`);
    if (resp.status.toString()[0] != "2") {
      console.log(resp.data);
    }
    console.log(resp)
    console.log(resp.data)
    setInitialResults(resp.data.responses);
  }

  // Event handler that handles any change in the search bar, specifically that when the search bar is empty and the first character is added, the database is queried, and the initialResults array is set to every entry, beginning with that character. Further changes longer than a length of one are filtered instead.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (input.length == 0) {
      setInitialResults([]);
      getSearch()
    }
    setInput(e.target.value);
  }

  const renderSearchResults = () => {
    if (input) {
      if (initialResults.length) {
        const results:SearchResult[] = initialResults.filter(
          result => result.email.includes(input)
        );
        console.log(results)
        if (results.length) {
          return (<ResultsList results={results} />);
        }
      }
      const items = "users";
      return (<p>{`No ${items} found`}</p>);
    }
  }

  return (
    <>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search for Users"
          aria-label="search-input"
          aria-describedby="basic-addon1"
          value={input}
          onChange={handleChange}
        />
      </InputGroup>
      {renderSearchResults()}
    </>
  )
}

export default SearchBar;
