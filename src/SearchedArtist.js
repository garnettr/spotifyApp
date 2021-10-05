import React from "react";

class SearchedArtist extends React.Component {
  render() {
    const { searchItem, updateTrackId } = this.props;
    return (
      <div className="searchedItems-wrapper imagesWrapper">
        {searchItem.length > 0 ? (
          searchItem.map((item, index) => (
            <span className="searchedContent" key={item.album.id} tabIndex="0" role="button" 
              onClick={(e) =>
                updateTrackId("album", item.album.id, item.album.images[1].url)
              }
            >
              <img alt={item.album.name} src={item.album.images[1].url} />
            </span>
          ))
        ) : (
          <div id="empty-list">
            {/* <p>Your Searched Album List is Empty</p> */}
          </div>
        )}
      </div>
    );
  }
}

export { SearchedArtist };
