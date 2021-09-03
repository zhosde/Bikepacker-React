import React, { Component } from "react";
import img from "../assets/starter-pack.jpeg";
import { Link } from "react-router-dom";

class About extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "lightblue",
          width: "auto",
          height: "100vh",
        }}
      >
        <img
          style={{
            width: "90vh",
            marginLeft: "6vh",
            marginTop: "6vh",
            position: "absolute",
          }}
          src={img}
          alt="prepper starter pack"
        />
        <div
          style={{
            marginLeft: "105vh",
            paddingTop: "35vh",
            position: "relative",
            fontSize: "24px",
          }}
        >
          <span style={{ marginLeft: "10vh" }}>
            <Link to="/shop">
              <i>
                Time to get my stash...
                <br />
                Keep calm and go shopping...
              </i>
            </Link>
          </span>
          <article className="message is-info">
            <div className="message-header">
              <p>About This Site</p>
            </div>
            <div className="message-body">
              $ A dedicated online shop for preppers - to find the most trendy
              stuffs <br />
              <hr />$ Prepper could be more than survivalism - Fun & Enjoyable{" "}
              <br />
              <hr /> $ Become a registered user to have profile page to check
              your own orders
            </div>
          </article>
        </div>
      </div>
    );
  }
}

export default About;
