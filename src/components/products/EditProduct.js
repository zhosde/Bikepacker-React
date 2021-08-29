import React, { Component } from "react";
import axios from "axios";

class EditProduct extends Component {
  state = {
    name: this.props.theProduct.name,
    description: this.props.theProduct.description,
    category: this.props.theProduct.category,
    image: this.props.theProduct.image,
    price: this.props.theProduct.price,
    stocked: this.props.theProduct.stocked
  };

  handleFormSubmit = (event) => {
    const name = this.state.name;
    const description = this.state.description;
    const category = this.state.category;
    const image = this.state.image;
    const price = this.state.price;
    const stocked = this. state.stocked;

    event.preventDefault();

    axios
      .put(
        `http://localhost:5000/api/products/${this.props.theProduct._id}`,
        { name, description, category, image, price, stocked },
        { withCredentials: true }
      )
      .then(() => {
        // Use the passed down api call to render the updated product data
        this.props.getTheProduct();
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
      const {name, value} = event.target;
    this.setState({[name]: value });
  };

  render() {
    return (
      <div>
        <hr />
        <h3>Edit form</h3>
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
            value={this.state.image}
            onChange={(e) => this.handleChange(e)}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditProduct;
