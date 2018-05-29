import React, { Component } from 'react'
import { ProductDeck } from '../components/Products'

export class ProductsPage extends Component {
  constructor(props) {
    super(props)

    this.state = props

    this.getProducts = this.getProducts.bind(this)
  }

  getProducts() {
    /*
     * TODO: need to fix this!
     */
    this.state.products
      .find({ category: this.props.category })
      .execute()
      .then(docs => {
        console.log(docs)
        //let html = docs.map(d => '<div>' + d.name + '</div>').join('')
        //console.log(html)
      })
  }

  /*
   * TODO: Dynamically generate SingleProduct component for each product in products;
   *       - Max 3 products per row
   *       - All rows should be pushed by expanding menu
   */
  render() {
    //this.getProducts()
    return (
      <div className="">
        <div className="row">
          <h2>{this.props.category}</h2>
        </div>
        <div className="row">
          <ProductDeck />
        </div>
      </div>
    )
  }
}
