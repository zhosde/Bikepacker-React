import React, { Component } from "react";

export default class SearchBar extends Component {
    state={
        searchWord:'',
    }

    handleSearch = async (event) => {
        await this.setState({searchWord:event.target.value})
        this.props.SearchTheProduct(this.state.searchWord)
    }


  render() {
    return (
      <div className="field has-addons">
        <div className="control">
          <input
            className="input"
            type="search"
            placeholder="Find a product"
            onChange={this.handleSearch}
          ></input>
        </div>
        <div className="control">
          <a className="button is-info">Search</a>
        </div>
      </div>
    );
  }
}
