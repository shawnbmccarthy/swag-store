import React, { Component } from 'react'
import { ProductDeck } from '../components/Products'

export class ProductsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      products: []
    }
  }

  getProducts() {
    this.props.stitchClient
      .executeFunction('getProducts', this.props.category)
      .then(products => {
        console.log(products)
        this.setState({ products })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    console.log('products page componentDidMount')
    this.getProducts()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.category !== prevProps.category) {
      console.log('products page componentDidUpdate')
      this.getProducts()
    }
  }

  /*
   * TODO: Dynamically generate SingleProduct component for each product in products;
   *       - Max 3 products per row
   *       - All rows should be pushed by expanding menu
   */
  render() {
    console.log('Rendering Product Page')
    return (
      <div className="productPage">
        <div className="row">
          <h2>{this.props.category}</h2>
        </div>
        <div className="row">
          <ProductDeck products={this.state.products} />
        </div>
      </div>
    )
  }
}
