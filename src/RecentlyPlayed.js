import React from "react";

class RecentlyPlayed extends React.Component {
  render() {
    const { recentlyPlayed, updateTrackId } = this.props;
    return (
      <div className="recentlyPlayed-Wrapper imagesWrapper">
        <h4>Recently Played</h4>
        {recentlyPlayed.length > 0 ? (
          recentlyPlayed.map((item, index) => (
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
          <h2>Recently placed</h2>
        )}
      </div>
    );
  }
}

export { RecentlyPlayed };
