import React, { Component } from 'react'
import ProductList from './products/ProductList'

export default class Main extends Component {
    state={
        productList: this.props.products,
        searchList: this.props.products,
    }

    


    render() {
        return (
            <div>
                
            </div>
        )
    }
}
