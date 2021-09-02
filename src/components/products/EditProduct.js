import React, { Component } from "react";
import axios from "axios";

class EditProduct extends Component {
  state = {};

  componentDidMount() {
    this.getSingleProduct();
  }

  getSingleProduct = () => {
    const { params } = this.props.match;
    axios
      .get(`${process.env.REACT_APP_API_URL}/products/${params.id}`, {
        withCredentials: true,
      })
      .then((responseFromApi) => {
        const theProduct = responseFromApi.data;
        this.setState(theProduct);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleFormSubmit = (event) => {
    const name = this.state.name;
    const description = this.state.description;
    const category = this.state.category;
    const image = this.state.image;
    const price = this.state.price;
    const stocked = this.state.stocked;

    event.preventDefault();

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/products/${this.props.theProduct._id}`,
        { name, description, category, image, price, stocked },
        { withCredentials: true }
      )
      .then(() => {
        // to updated product data (state in app.js)
        this.props.updateTheState()
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="edit-form">
        <hr />
        <h1>Edit</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={(e) => this.handleChange(e)}
          />
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={this.state.category}
            onChange={(e) => this.handleChange(e)}
          />
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={this.state.price}
            onChange={(e) => this.handleChange(e)}
          />
          <label>Stocked:</label>
          <select
            value={this.state.stocked}
            onChange={(e) => this.handleChange(e)}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={(e) => this.handleChange(e)}
          />
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={(e) => this.handleChange(e)}
          />
          <button
            className="button is-info"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default EditProduct;
