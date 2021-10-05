import React from "react";

class IframePlayer extends React.Component {
  render() {
    const { TrackInfo } = this.props;
    return (
      <>
        {TrackInfo.TrackId.length > 0 && (
          <>
            <div className="nowPlaying-image">
              <img alt={TrackInfo.TrackId} src={TrackInfo.images} />
            </div>

            <iframe
              title="spotify-player"
              src={`https://open.spotify.com/embed/${TrackInfo.trackOrAlbum}/${TrackInfo.TrackId}`}
              width="300"
              height="80"
              frameborder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
          </>
        )}
      </>
    );
  }
}

export { IframePlayer };
