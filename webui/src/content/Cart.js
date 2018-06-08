import React from 'react'
import { Link } from 'react-router-dom'
import { USDFormatter } from '../helpers'

const Cart = ({ cart, handleUpdateCartItem, handleCheckout, history }) => {
  const products = cart.products
  return (
    <div className="container page">
      <h2>Cart</h2>
      <div className="card">
        <div className="card-body">
          {products.length > 0 && (
            <div className="container">
              <div className="row">
                <div className="col-2 col-md-2 d-none d-sm-block" />
                <div className="col-6 col-md-6 d-none d-sm-block">
                  <strong>Name</strong>
                </div>
                <div className="col-2 col-md-2 d-none d-sm-block">
                  <strong>Quantity</strong>
                </div>
                <div className="col-1 col-md-1 d-none d-sm-block">
                  <strong>Price</strong>
                </div>
                <div className="col-1 col-md-1 d-none d-sm-block" />
              </div>
              {products.map(product => (
                <CartItem
                  key={product.id}
                  product={product}
                  handleUpdateCartItem={handleUpdateCartItem}
                />
              ))}
            </div>
          )}
          {products.length === 0 && (
            <div className="alert alert-info">Cart is empty</div>
          )}
          <div className="cart__total">
            <strong>Total:</strong> {USDFormatter.format(cart.totalPrice)}
          </div>
          {products.length > 0 && (
            <div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleCheckout()
                  history.push('/')
                }}
              >
                Check Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const CartItem = ({ product, handleUpdateCartItem }) => (
  <div className="row">
    <div className="col-md-2 col-6">
      <img src={product.image.thumb} alt={product.name} />
    </div>
    <div className="col-md-6 col-6">
      <Link to={`/products/${product.id}`}>{product.name}</Link>
    </div>
    <div className="col-md-2 col-4">
      <input
        type="number"
        value={product.quantity}
        className="form-control col-md-5"
        onChange={e =>
          handleUpdateCartItem(product.id, parseInt(e.target.value, 10))
        }
      />
    </div>
    <div className="col-md-1 col-4">{USDFormatter.format(product.price)}</div>
    <div className="col-md-1 col-4">
      <button
        className="btn btn-danger btn-sm"
        onClick={() => handleUpdateCartItem(product.id)}
      >
        X
      </button>
    </div>
  </div>
)

export default Cart
