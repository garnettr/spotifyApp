import React from "react";

class Welcome extends React.Component {


  render() {
    const { userInfo } = this.props;
    return (
      <header className="welcome-wrapper">
        <div className="welcome-content">
          <span>
            {userInfo.images.length > 0 ? (
              <img alt="yourProfile" src={userInfo.images[0].url} />
            ) : (
              ""
            )}
            <p>Welcome {userInfo.display_name}</p>
          </span>
        </div>
      </header>
    );
  }
}

export { Welcome };
