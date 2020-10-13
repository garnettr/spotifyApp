import React from "react";

class TopTracks extends React.Component {
  render() {
    const { topTracks, updateTrackId } = this.props;
    return (
      <div className="likedTracks-Wrapper imagesWrapper">
        <h4>Liked Tracks</h4>
        {topTracks.length > 0 ? (
          topTracks.map((item, index) => (
            <a
              href="#"
              onClick={(e) =>
                updateTrackId(
                  "track",
                  item.track.id,
                  item.track.album.images[1].url
                )
              }
            >
              <img src={item.track.album.images[2].url} />
            </a>
          ))
        ) : (
          <h2>Top Tracks</h2>
        )}
      </div>
    );
  }
}

export { TopTracks };
