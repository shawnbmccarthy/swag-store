import React, { Component } from 'react'
import { ProductDeck } from '../components/Products'

class ProductsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      products: []
    }
  }

  getProducts() {
    this.props.db
      .collection('products')
      .find({ category: this.props.match.params.category })
      .toArray()
      .then(products => {
        this.setState({ products })
      })
      .catch(err => {
        // alert and error service needed
        console.log(err)
      })
  }

  componentDidMount() {
    this.getProducts()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.getProducts()
    }
  }

  render() {
    return (
      <div className="container page">
        <div className="row">
          <h2>{this.props.match.params.category}</h2>
        </div>
        <div className="row">
          <ProductDeck
            products={this.state.products}
            handleAddToCart={this.props.handleAddToCart}
          />
        </div>
      </div>
    )
  }
}

export default ProductsPage
