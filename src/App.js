import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import SearchTerms from "./Search";
import { SearchedArtist } from "./SearchedArtist";
import { TopTracks } from "./TopTracks";
import { RecentlyPlayed } from "./RecentlyPlayed";
import { IframePlayer } from "./IframePlayer";
import "./App.scss";
import { Welcome } from "./Welcome";
import { Menu } from "./Menu";

class App extends Component {

  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }],
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0,
      },
      userInfo: {
        images: [{ url: "" }],
        display_name: "",
      },
      searchItem: [],
      topTracks: [],
      recentlyPlayed: [],
      TrackInfo: {
        trackOrAlbum: "",
        TrackId: "",
        images: [{ url: "" }],
      },
      artist_search: "",
      is_playing: "Paused",
      progress_ms: 0,
      likedTracksToggle: true,
    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.grabCurrentSearch = this.grabCurrentSearch.bind(this);
    this.setNewSearch = this.setNewSearch.bind(this);
    this.updateTrackId = this.updateTrackId.bind(this);
    this.showTracksToggle = this.showTracksToggle.bind(this);
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
      this.getCurrentlyPlaying(_token);
    }
  }
  // --- Start Search Component Code
  // Triggered when user hits enter on search input
  handleNewSearch = (e) => {
    let _token = hash.access_token;
    if (e.key === "Enter") {
      const val = e.target.value;
      const search = {
        artist: val,
        complete: false,
      };
      const newSearch = search;
      this.setNewSearch(newSearch);
    }
  };

  setNewSearch = (newSearch) => {
    let _token = hash.access_token;
    this.setState(
      {
        artist_search: newSearch,
      },
      () => {
        this.grabCurrentSearch(_token);
      }
    );
  };

  grabCurrentSearch = (token) => {
    let artist = this.state.artist_search;
    var a3 = $.ajax({
      url: `https://api.spotify.com/v1/search?q=${artist.artist}&type=track%2Cartist&market=US&limit=10&offset=5`,
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        this.setState(
          {
            searchItem: data.tracks.items,
          },
          () => {
            // console.log(data);
          }
        );
      },
    });
    $.when(a3).done(function (r3) {
      // console.log(r3[0]);
    });
  };

  showTracksToggle = () => {
    this.setState(
      (state) => ({
        likedTracksToggle: !state.likedTracksToggle,
        recentlyPlayedToggle: !state.recentlyPlayedToggle
      })
    );
  }
  




  // --- End Search Component Code


  // Update Track ID
  updateTrackId(trackOrAlbum, id, image) {
    this.setState({
      TrackInfo: {
        trackOrAlbum: trackOrAlbum,
        TrackId: id,
        images: image,
      },
    });
  }

  getCurrentlyPlaying(token) {
    var a1 = $.ajax({
        url: "https://api.spotify.com/v1/me/player",
        type: "GET",
        beforeSend: (xhr) => {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: (data) => {
          // this.setState({
          //   item: data.item,
          //   is_playing: data.is_playing,
          //   progress_ms: data.progress_ms,
          // });
          // console.log(data);
        },
      }),
      a2 = $.ajax({
        url: "https://api.spotify.com/v1/me/tracks",
        type: "GET",
        beforeSend: (xhr) => {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: (data) => {
          this.setState({
            topTracks: data.items,
          });
        },
      }),
      a3 = $.ajax({
        url: "https://api.spotify.com/v1/me",
        type: "GET",
        beforeSend: (xhr) => {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: (data) => {
          this.setState({
            userInfo: data,
          });
        },
      }),
      a4 = $.ajax({
        url: "https://api.spotify.com/v1/me/player/recently-played",
        type: "GET",
        beforeSend: (xhr) => {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: (data) => {
          this.setState({
            recentlyPlayed: data.items,
          });
          console.log(data);
        },
      }),
      a5 = $.ajax({
        url: "https://api.spotify.com/v1/me/player/play",
        type: "PUT",
        beforeSend: (xhr) => {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: (data) => {
          this.setState({});
          console.log(data);
        },
      });

    $.when(a1, a2).done(function (r1, r2) {});
  }

  render() {
    return (
        <>
          {!this.state.token && (
            <section className="introWrapper">

            <div className="introContent">

            <h1>Hey.</h1>
            <p>This app is built using Spotify's open source API, allowing the user to securely sign in to their profile and view a custom dashboard. 
            <br></br><br></br>
            View your <b>recently liked tracks, played artist </b> and includes a <b>search feature.</b>
            </p>

              <a className="btn btn-dark"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}>

            
              See how it works
            </a>
            </div>


            </section>
          )}

          {this.state.token && (
            <>
            <Welcome userInfo={this.state.userInfo} />
            <section className="contentWrapper vibesoff">
              <section className="searchWrapper">
                <SearchTerms
                  handleNewSearch={this.handleNewSearch}
                  searchItem={this.state.searchItem}
                />
                <IframePlayer TrackInfo={this.state.TrackInfo} />
                <SearchedArtist
                  searchItem={this.state.searchItem}
                  updateTrackId={this.updateTrackId}
                  TrackId={this.state.TrackId}
                />
              </section>
              <section className="likedTracksContent">
                <TopTracks
                  topTracks={this.state.topTracks}
                  updateTrackId={this.updateTrackId}
                  likedTracksToggle={this.state.likedTracksToggle}
                />
                <RecentlyPlayed
                  recentlyPlayed={this.state.recentlyPlayed}
                  recentlyPlayedToggle = {this.state.recentlyPlayedToggle}
                  updateTrackId={this.updateTrackId}
                />

              </section>
            </section>

            <footer>
              <Menu 
              showHideLikedTracks={this.state.likedTracksToggle}
              showTracksToggle ={this.showTracksToggle}
              showHidePlayedTracks={this.state.recentlyPlayedToggle}
              showRecentlyPlayed = {this.showRecentlyPlayed}
              
              />
            </footer>

              {/* <Player
                item={this.state.item}
                is_playing={this.state.is_playing}
                progress_ms={this.progress_ms}
              /> */}
            </>
          )}
        </>
    );
  }
}

export default App;
