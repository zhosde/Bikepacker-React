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

  getOrderedItemQty = (itemId) => {
    return this.state.orderedItemsArr.find((el)=>el.productID==itemId).qty
  }

  getPurchasePrice = (itemId) => {
    return this.state.orderedItemsArr.find((el) => el.productID == itemId)
      .purchasePrice;
  };

  renderOrderDetail = () => {
    const itemIdArr = this.state.orderedItemsArr.map((el) => el.productID);
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="is-info">Item</th>
            <th className="is-info">Purchase Price</th>
            <th className="is-info">Purchase Qty</th>
          </tr>
        </thead>
        {itemIdArr.map((itemId) => {
          return (
            <tbody>
              <Link to={`/products/${itemId}`}>
                <th key={itemId}>{this.getProductDetails(itemId).name}</th>
              </Link>
              {/* <p>{itemId}</p> */}
              <th>{this.getPurchasePrice(itemId)}€</th>
              <th>{this.getOrderedItemQty(itemId)}</th>
            </tbody>
          );
        })}
      </table>
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
          <label>
            <strong>Total Price: </strong>
            {this.getTotalPrice()}€
          </label>
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
