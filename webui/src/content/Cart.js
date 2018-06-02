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
                  <div className="col" />
                  <div className="col">Name</div>
                  <div className="col">Quantity</div>
                  <div className="col">Price</div>
                  <div className="col" />
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
              Total: ${this.props.cart.totalPrice.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const CartItem = ({ product, handleDeleteFromCart }) => (
  <div className="row">
    <div className="col">
      <img src={product.image.thumb} alt={product.name} />
    </div>
    <div className="col">{product.name}</div>
    <div className="col">{product.quantity}</div>
    <div className="col">${product.price.toFixed(2)}</div>
    <div className="col">
      <button className="btn btn-danger btn-xs">X</button>
    </div>
  </div>
)

export default Cart
