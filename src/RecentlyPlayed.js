import React from "react";

class RecentlyPlayed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: false};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    const { recentlyPlayed, updateTrackId, recentlyPlayedToggle } = this.props;
    return (
      <section className="recentlyPlayed-Wrapper imagesWrapper">
        
        <figure className={recentlyPlayedToggle ? "show" : "hidden"}>

        <span className="trackHeader-container">
          <h4 className="recentlyPlayed-Header">Recently Played
          </h4>
          <button onClick={this.handleClick}>{this.state.isToggleOn ? 'Condense' : 'Show All'}</button>
        </span>

        <div className="tracksWrapper">

            <span>
            { recentlyPlayed.map((item, index) => 

              index <= 4 ? 
                <span className="trackInfo-btn" key={item.track.id} tabIndex="0" role="button" onClick={(e) => updateTrackId("track",item.track.id,item.track.album.images[1].url)}>
                <img alt={item.track.artists[0].name} src={item.track.album.images[1].url} />
                  <span>
                   <h4>{item.track.name}</h4>
                    <p>{item.track.artists[0].name}</p>
                  </span>
                </span>
              :  null

            )}
            </span>

            <span className={this.state.isToggleOn ? 'Show' : 'hidden'}>
          { recentlyPlayed.map((item, index) => 

            index >= 5 ? 
              <span className="trackInfo-btn" key={item.track.id} tabIndex="0" role="button"  onClick={(e) => updateTrackId("track",item.track.id,item.track.album.images[1].url)}>
              <img alt={item.track.artists[0].name} src={item.track.album.images[1].url} />
                <span>
                    <h4>{item.track.name}</h4>
                    <p>{item.track.artists[0].name}</p>
                </span>
              </span>
             : null

          )}
          </span>
        </div>

        </figure>

      </section>
    );
  }
}

export { RecentlyPlayed };
