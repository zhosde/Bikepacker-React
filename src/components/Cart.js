import React from "react";
import axios from "axios";
import Order from "./Order";
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  state = {
    productInCart: this.props.productInCart,
    numOfProduct: this.props.numOfProduct,
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const productInCart = this.state.productInCart;
    const numOfProduct = this.state.numOfProduct;
    const userId = this.props.user.id;

    axios
      .post(`http://localhost:5000/api/orders`, { productInCart, userId })
      .then((orderFromDB) => {
        return <Order theOrder={orderFromDB} />;
      });
  };

  handleChangeQty = (event) => {
    this.setState({
      numOfProduct: event.target.value,
    });
  };

  render() {
    return (
      <>
        {this.state.productInCart.map((product) => {
          return (
            <li key={product._id}>
              <Link to={`/products/${product._id}`}>
                <img src={product.image} />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </Link>
            </li>
          );
        })}

        <form onSubmit={this.handleFormSubmit}>
          <label>Qty: </label>
          <input
            type="number"
            name="qty"
            value={this.state.numOfProduct}
            onChange={(e) => this.handleChangeQty(e)}
          />
          {/* <label>{this.state.numOfProduct*product.price}</label> */}

          <label>Total Price: </label>

          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default Cart;
