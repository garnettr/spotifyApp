import React from "react";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: false };

    // This binding is necessary to make `this` work in the callback
    this.updateBkg = this.updateBkg.bind(this);
    this.toggleBkg = this.toggleBkg.bind(this);
  }

  toggleBkg() {
    this.setState(
      (state) => ({
        isToggleOn: !state.isToggleOn,
      }),
      () => {
        this.updateBkg(this.state.isToggleOn);
      }
    );
  }

  updateBkg(truthFalse) {
    let body = document.body;
    if (truthFalse == true) {
      body.className = "vibesOn";
    } else {
      body.className = "vibesOff";
    }
  }

  render() {
    const { userInfo } = this.props;
    return (
      <div className="welcome-wrapper">
        <div className="welcome-content">
          <button onClick={this.toggleBkg}>
            {this.state.isToggleOn ? "Vibes Off" : "Vibes On"}
          </button>
          <span>
            {userInfo.images.length > 0 ? (
              <img src={userInfo.images[0].url} />
            ) : (
              ""
            )}
            <p>Welcome {userInfo.display_name}</p>
          </span>
        </div>
      </div>
    );
  }
}

export { Welcome };
