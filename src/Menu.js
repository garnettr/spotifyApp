import React from "react";


class Menu extends React.Component { 


  render() {
    const { showTracksToggle, showHideLikedTracks} = this.props;

    return (
      <section>
        <button className="btn" onClick={(e) => showTracksToggle()}>
        {showHideLikedTracks ? 'Show Recently Played Tracks' : 'Show Liked Tracks'}
        </button>
      </section>
    );
  }

}

export { Menu };