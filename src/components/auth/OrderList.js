import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import axios from "axios";

class OrderList extends React.Component {
  state = {
    listOfOrders: [],
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
    const { userIsLoggedIn } = this.props;
    if (userIsLoggedIn) {
      return (
        <section className="order-list">
          {this.renderOrderList()}
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

export default OrderList;
