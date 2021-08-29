import React from "react";
import { Link } from "react-router-dom";
import authService from "./auth-service";
import Login from "./Login";
import Signup from "./Signup";

class UserProfile extends React.Component {
  logoutUser = () => {
    authService.logout().then(() => {
      this.props.getUser(null, false);
    });
  };

  render() {
    const { userData, userIsLoggedIn } = this.props;
    console.log(this.props)
    if (userIsLoggedIn) {
      return (
        <nav className="nav-style">
          <ul>
            {userIsLoggedIn && <li>Welcome, {userData.username} </li>}
            <li>
              <Link to="/shop" style={{ textDecoration: "none" }}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/">
                <button type="submit" onClick={() => this.logoutUser()}>
                  Logout
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      );
    } if (userIsLoggedIn && userData.isAdmin) {
      return (
        <nav className="nav-style">
          <ul>
            {userIsLoggedIn && <li>Welcome, {userData.username} </li>}
            <li>
              <Link to="/shop" style={{ textDecoration: "none" }}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/products" style={{ textDecoration: "none" }}>
                Add Product
              </Link>
            </li>
            <li>
              <Link to="/">
                <button type="submit" onClick={() => this.logoutUser()}>
                  Logout
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      );
    } else {
      return (
        <div className="login-signup">
          <Login />
          <Signup />
        </div>
      );
    }
  }
}

export default UserProfile;
