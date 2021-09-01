import React, { Component } from 'react'
import { NavLink as Link } from "react-router-dom";
import '../App.css';
import bgCover from "../assets/on-the-road.jpg";

class HomePage extends Component {

    render() {

        const linkStyle = {
            color: "white",
        }
        return (
          <section className="home-page">
            <nav className="home-page-nav">
              <ul>
                <li>
                  <Link to="/about" style={linkStyle}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/shop" style={linkStyle}>
                    Shop
                  </Link>
                </li>
                <li>
                  <h1>PrepperBuy</h1>
                </li>
                <li>
                  <Link to="/profile" style={linkStyle}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/cart" style={linkStyle}>
                    Cart
                  </Link>
                </li>
              </ul>
            </nav>
            <img src={bgCover} alt="tibet namtso" />
            <aside className="quote">
              <p>
                <i>Always on the road</i>
              </p>
              <p>
                <i>Always prepared</i>
              </p>
            </aside>
          </section>
        );
    }
}

export default HomePage;