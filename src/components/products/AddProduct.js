import React, { Component } from "react";
import axios from "axios";

class AddProduct extends Component {
  state = { name: "", description: "", category: "", image: "", price: null,  stocked: true};

  handleFormSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const description = this.state.description;
    const category = this.state.category
    const image = this.state.image
    const price = this.state.price
    const stocked = this.state.stocked
    axios
      .post("http://localhost:5000/api/products", { name, description, category, image, price, stocked })
      .then(() => {
        this.props.getData();
        this.setState({
          name: "",
          description: "",
          category: "",
          image: "",
          price: null,
          stocked: true,
        });
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
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
          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
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
          <input
            type="text"
            name="stocked"
            value={this.state.stocked}
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

export default AddProduct;
