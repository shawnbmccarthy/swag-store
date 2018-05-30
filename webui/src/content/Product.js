import React, { Component } from 'react'

class ProductPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      product: {}
    }
  }

  getProduct() {
    this.props.stitchClient
      .executeFunction('getProduct', this.props.id)
      .then(product => {
        console.log(product)
        this.setState({ product })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getProduct()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.id !== prevProps.id) {
      this.getProduct()
    }
  }

  render() {
    return (
      <div className="productPage">
        <div className="row">
          <h2>Product Page</h2>
          <h3>{this.state.product.name}</h3>
        </div>
        <div className="row" />
      </div>
    )
  }
}

export default ProductPage
