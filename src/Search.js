import React from "react";
import * as $ from "jquery";
import hash from "./hash";

const SearchTerms = (props) => {
  const items = props.searchItem.items;
  return (
    <>
      <input
        onKeyUp={props.handleNewSearch}
        type="text"
        placeholder="Search For Your Artist"
      />
      {/* {console.log(items.length)} */}

      {/* <img src={props.searchItem.album.images[0].url} /> */}
    </>
  );
};

export default SearchTerms;
