import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { USDFormatter } from '../helpers'

const ProductDeck = ({ products, handleAddToCart }) => {
  return (
    <div className={'card-deck w-75'}>
      {products.map(product => {
        return (
          <ProductCard
            key={product.id}
            {...product}
            handleAddToCart={handleAddToCart}
          />
        )
      })}
    </div>
  )
}

class ProductCard extends Component {
  constructor(props) {
    super(props)
    this.handleAddToCartClick = this.handleAddToCartClick.bind(this)
  }

  handleAddToCartClick() {
    this.props.handleAddToCart(this.props.id)
  }

  render() {
    return (
      <div className={'card'}>
        <img className={'card-img-top'} src={this.props.image.large} alt={''} />
        <div className={'card-body'}>
          <h5 className={'card-title'}>
            <Link to={`/products/${this.props.id}`}>{this.props.name}</Link>
          </h5>
          <p className={'card-text'}>
            <small>{this.props.overview}</small>
          </p>
        </div>
        <div className="card-footer">
          <p className={'card-text'}>
            <small className={'text-muted'}>
              {USDFormatter.format(this.props.price)}
            </small>
            <button
              type="button"
              className="float-right btn btn-outline-primary btn-sm"
              onClick={this.handleAddToCartClick}
            >
              <i className={'fa fa-plus'} /> Add to cart
            </button>
          </p>
        </div>
      </div>
    )
  }
}

export { ProductDeck, ProductCard }
