import React from "react";

const SearchTerms = (props) => {
  return (
    <>
      <input
        onKeyUp={props.handleNewSearch}
        type="text"
        placeholder="Search For Your Artist"
      />
    </>
  );
};

export default SearchTerms;
