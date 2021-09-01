import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import authService from "./auth-service";
import Login from "./Login";
import Signup from "./Signup";
import axios from "axios";

class UserProfile extends React.Component {
  state = {
    listOfOrders: [],
  };

  logoutUser = () => {
    authService.logout().then(() => {
      this.props.getUser(null, false);
    });
  };

  componentDidMount() {
    this.getOrderList();
  }

  getOrderList = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/orders/summary`, {
        withCredentials: true,
      })
      .then((responseFromApi) => {
        this.setState({
          listOfOrders: responseFromApi.data,
        });
      });
  };

  getOrderDetail = () => {
    const { params } = this.props.match.params
    axios
      .get(`${process.env.REACT_APP_API_URL}/orders/${params}`, {
        withCredentials: true,
      })
      .then((order) => {
        // const itemIdArr = order.items.map((itemId) => {
        //   return itemId._id;
        // });
        return '4';
      })
      .then((itemIdArr) => {
        return "foobar"
        // return (
        //   // <ul>
        //   //   {itemIdArr.map((itemId)=>{
        //   //     return (
        //   //       <li key={itemId}>
        //   //         <Link to={`/products/${itemId}`}>
        //   //           {itemId}
        //   //         </Link>
        //   //       </li>
        //   //     )
        //   //   })}
        //   // </ul>
        // )
      });
  };

  renderOrderDetail = () => {
    return (
      <>
      <div>{this.getOrderDetail()}</div>
      </>
    )
  }

  renderOrderList = () => {
    return (
      <ul>
        {this.state.listOfOrders.map((order) => {
          return (
            <li key={order}>
              <Link to={`/profile/orders/${order}`}>
                Order {order.substring(0, 5)}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  render() {
    const { userData, userIsLoggedIn } = this.props;
    if (userIsLoggedIn) {
      return (
        <section className="profile">
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
                <button type="submit" onClick={() => this.logoutUser()}>
                  Logout
                </button>
              </Link>
            </li>
          </ul>

          <Switch>
            <Route path="/profile/orders">{this.renderOrderList()}</Route>
            <Route path={`/profile/orders/:orderId`}>
              {this.renderOrderDetail()}
            </Route>
          </Switch>
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

export default UserProfile;
