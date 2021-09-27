import React from "react";
import { Link } from "react-router-dom";
import authService from "./auth-service";
import Login from "./Login";
import Signup from "./Signup";

class ProfileNav extends React.Component {
  logoutUser = () => {
    authService.logout().then(() => {
      this.props.getUser(null, false);
    }).then(()=> this.props.clearCartState())
  };

  render() {
    const { userData, userIsLoggedIn } = this.props;
    if (userIsLoggedIn) {
      return (
        <nav className="level has-background-primary-light">
          {userIsLoggedIn && (
            <p className="level-item has-text-centered">
              Welcome, {userData.username}{" "}
            </p>
          )}
          <p className="level-item has-text-centered">
            <Link to="/shop" style={{ textDecoration: "none" }}>
              Back To Products
            </Link>
          </p>
          <p className="level-item has-text-centered">
            <Link to="/profile/orders" style={{ textDecoration: "none" }}>
              My Orders
            </Link>
          </p>
          <p className="level-item has-text-centered">
            {/* only admin can add product */}
            {userData.isAdmin && (
              <Link to="/addproduct" style={{ textDecoration: "none" }}>
                Add Product
              </Link>
            )}
          </p>
          <p className="level-item has-text-centered">
            <Link to="/">
              <button
                className="button is-normal is-info"
                type="submit"
                onClick={() => this.logoutUser()}
              >
                Logout
              </button>
            </Link>
          </p>
        </nav>
      );
    } else {
      return (
        <div className="login-signup">
          <Login getUser={this.props.getUser} />
          <Signup getUser={this.props.getUser} />
        </div>
      );
    }
  }
}

export default ProfileNav;
