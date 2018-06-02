import React, { Component } from 'react'

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
              <strong>Total:</strong> ${this.props.cart.totalPrice.toFixed(2)}
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
    <div className="col col-6">{product.name}</div>
    <div className="col col-2">{product.quantity}</div>
    <div className="col col-1">${product.price.toFixed(2)}</div>
    <div className="col col-1">
      <button className="btn btn-danger btn-sm">X</button>
    </div>
  </div>
)

export default Cart
