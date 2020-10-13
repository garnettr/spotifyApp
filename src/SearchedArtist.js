import React from "react";

class SearchedArtist extends React.Component {
  render() {
    const { searchItem, updateTrackId } = this.props;
    return (
      <div className="searchedItems-wrapper imagesWrapper">
        {searchItem.length > 0 ? (
          searchItem.map((item, index) => (
            <a
              href="#"
              onClick={(e) =>
                updateTrackId("album", item.album.id, item.album.images[1].url)
              }
            >
              <img src={item.album.images[1].url} />
            </a>
          ))
        ) : (
          <div id="empty-list">
            <p>Your Searched Album List is Empty</p>
          </div>
        )}
      </div>
    );
  }
}

export { SearchedArtist };
