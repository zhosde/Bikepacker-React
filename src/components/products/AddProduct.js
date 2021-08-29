import React, { Component } from "react";
import axios from "axios";
import service from "../../api/service"

class AddProduct extends Component {
  state = {
    name: "",
    description: "",
    category: "",
    image: '',
    price: 0,
    stocked: true,
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    // const name = this.state.name;
    // const description = this.state.description;
    // const category = this.state.category;
    // const image = this.state.image;
    // const price = this.state.price;
    // const stocked = this.state.stocked;

    service
      .saveNewProduct(this.state)
      .then((res) => {
        console.log("added new product: ", res);
      })
      // .catch((err) => console.log("Error while adding the new product: ", err));

    // axios
    //   .post(
    //     "http://localhost:5000/api/products",
    //     {
    //       name,
    //       description,
    //       category,
    //       image,
    //       price,
    //       stocked,
    //     },
    //     { withCredentials: true }
    //   )
    
      // .then(() => {
      //   this.setState({
      //     name: "",
      //     description: "",
      //     category: "",
      //     image: "",
      //     price: 0,
      //     stocked: true,
      //   });
      // })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    service
      .handleUpload(uploadData)
      .then((response) => {
        this.setState({ image: response.imageUrl });
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  render() {
    return (
      <div className='add-product'>
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
          <select
            value={this.state.stocked}
            onChange={(e) => this.handleChange(e)}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>

          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={this.handleFileUpload}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddProduct;
