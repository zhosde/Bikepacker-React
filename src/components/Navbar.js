import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import logo from "../assets/main-logo.png";

class Navbar extends Component {
  state = {
    searchWord: "",
    SearchTheProduct: this.props.SearchTheProduct,
  };

  handleSearch = async (event) => {
    await this.setState({ searchWord: event.target.value });
    this.state.SearchTheProduct(this.state.searchWord);
  };

  render() {
    const linkStyle = {
      color: "black",
    };

    return (
        <div className="navbar">
          <div>
              <img src={logo} alt="logo" />
            </div>
            <div className='searchbar'>
              <input
                type="search"
                name="search"
                placeholder="Search..."
                value={this.state.searchWord}
                onChange={this.handleSearch}
              ></input>
            </div>
            <div>
              <Link to="/profile" style={linkStyle}>
                Profile
              </Link>
            </div>
            <div>
              <Link to="/cart" style={linkStyle}>
                Cart
              </Link>
            </div>
        </div>
    );
  }
}

export default Navbar;
