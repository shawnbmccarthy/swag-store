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
    this.props.stitchClient
      .executeFunction('getProducts', this.props.match.params.category)
      .then(products => {
        console.log(products)
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
    console.log(
      'is auth? ',
      this.props.stitchClient.auth.getLoggedInProviderType()
    )
    console.log(this.props.match.params.category)
    return (
      <div className="productsPage">
        <div className="row">
          <h2>{this.props.match.params.category}</h2>
        </div>
        <div className="row">
          <ProductDeck products={this.state.products} />
        </div>
      </div>
    )
  }
}

export default ProductsPage
