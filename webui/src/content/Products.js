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
      .execute()
      .then(products => {
        this.setState({ products })
      })
      .catch(err => {
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

  /*
   * TODO: Dynamically generate SingleProduct component for each product in products;
   *       - Max 3 products per row
   *       - All rows should be pushed by expanding menu
   */
  render() {
    return (
      <div className="productsPage">
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
