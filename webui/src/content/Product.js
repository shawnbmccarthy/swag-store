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
      .executeFunction('getProduct', this.props.match.params.id)
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
    if (this.props.match.params.id !== prevProps.match.params.id) {
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
