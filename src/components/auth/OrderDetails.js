import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import axios from "axios";

class OrderDetails extends React.Component {
  state = {
    orderedItemsArr: [],
    allTheProducts: [],
  };

  componentDidMount() {
    this.getOrderItems();
  }

  getOrderItems = () => {
    // get the order id from current URL's pathname and remove the string
    const orderId = window.location.pathname.substring(16).replace(/"/g, "");
    axios
      .get(`${process.env.REACT_APP_API_URL}/orders/${orderId}`, {
        withCredentials: true,
      })
      .then((order) => {
        const itemsArr = order.data.items;
        this.setState({
          orderedItemsArr: order.data.items,
        });
      });
  };

  getPurchasePrice = (itemId) => {
    return this.state.orderedItemsArr.find((el) => el.productID == itemId)
      .purchasePrice;
  };

  renderOrderDetail = () => {
    const itemIdArr = this.state.orderedItemsArr.map((el) => el.productID);
    return (
          <ul>
            {itemIdArr.map((itemId) => {
              return (
                <li key={itemId}>
                  <Link to={`/products/${itemId}`}>
                   <p>{this.getProductDetails(itemId).name}</p>
                    {/* <p>{itemId}</p> */}
                    <p>{this.getPurchasePrice(itemId)}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
    );
  };

  getProductDetails = (productId) => {
    const productObj = this.props.products.find((product) => {
      return product._id === productId;
    });
    return productObj;
  };

  getTotalPrice = () => {
    if (this.state.orderedItemsArr.length) {
      const totalPrice = this.state.orderedItemsArr
        .map((el) => el.purchasePrice * el.qty)
        .reduce((acc, cur) => acc + cur)
        .toFixed(2);
      return totalPrice;
    }
  };

  render() {
    const { userData, userIsLoggedIn } = this.props;
    if (userIsLoggedIn) {
      return (
        <section className="order-detail">
          {this.renderOrderDetail()}
          <label>Total Price: {this.getTotalPrice()}</label>
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

export default OrderDetails;
