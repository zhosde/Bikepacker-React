import React, { Component } from 'react'
import gif from '../assets/let me open my bunker.gif'
import img from '../assets/starter-pack.jpeg'
import {Link} from 'react-router-dom'

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
              <img
                style={{ marginTop: "16vh" }}
                src={gif}
                alt="john wick movie gif"
              />
            </div>
          </div>
        );
    }
}

export default About
