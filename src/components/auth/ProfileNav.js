import React from "react";
import { Link } from "react-router-dom";
import authService from "./auth-service";
import Login from "./Login";
import Signup from "./Signup";

class ProfileNav extends React.Component {

  logoutUser = () => {
    authService.logout().then(() => {
      this.props.getUser(null, false);
    });
  };

  render() {
    const { userData, userIsLoggedIn } = this.props;
    if (userIsLoggedIn) {
      return (
        <section className="profile-nav">
          <ul>
            {userIsLoggedIn && <li>Welcome, {userData.username} </li>}
            <li>
              <Link to="/shop" style={{ textDecoration: "none" }}>
                Back To Products
              </Link>
            </li>

            <li>
              <Link to="/profile/orders" style={{ textDecoration: "none" }}>
                My Orders
              </Link>
            </li>

            {/* only admin can add product */}
            {userData.isAdmin && (
              <li>
                <Link to="/addproduct" style={{ textDecoration: "none" }}>
                  Add Product
                </Link>
              </li>
            )}

            <li>
              <Link to="/">
                <button className="button is-normal is-info" type="submit" onClick={() => this.logoutUser()}>
                  Logout
                </button>
              </Link>
            </li>
          </ul>
        </section>
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
