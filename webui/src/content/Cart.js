import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { USDFormatter } from '../helpers'

class Cart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const products = this.props.cart.products
    return (
      <div className="container">
        <h2>Cart</h2>
        <div className="card">
          <div className="card-body">
            {products.length > 0 && (
              <div className="container">
                <div className="row">
                  <div className="col col-2" />
                  <div className="col col-6">
                    <strong>Name</strong>
                  </div>
                  <div className="col col-2">
                    <strong>Quantity</strong>
                  </div>
                  <div className="col col-1">
                    <strong>Price</strong>
                  </div>
                  <div className="col col-1" />
                </div>
                {products.map(product => (
                  <CartItem key={product.id} product={product} />
                ))}
              </div>
            )}
            {products.length === 0 && (
              <div className="alert alert-info">Cart is empty</div>
            )}
            <div className="cart__total">
              <strong>Total:</strong>{' '}
              {USDFormatter.format(this.props.cart.totalPrice)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const CartItem = ({ product, handleDeleteFromCart }) => (
  <div className="row">
    <div className="col col-2">
      <img src={product.image.thumb} alt={product.name} />
    </div>
    <div className="col col-6">
      <Link to={`/products/${product.id}`}>
        {product.name}
        {product.size && ` (${product.size})`}{' '}
      </Link>
    </div>
    <div className="col col-2">{product.quantity}</div>
    <div className="col col-1">{USDFormatter.format(product.price)}</div>
    <div className="col col-1">
      <button className="btn btn-danger btn-sm">X</button>
    </div>
  </div>
)

export default Cart
