import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { USDFormatter, DateFormatter } from '../helpers'
import '../components/Profile.css'

const OrderItem = ({ product }) => (
  <div className="row">
    <div className="col-md-6 col-6" />
    <div className="col-md-2 col-2">
      <strong>Qty</strong>
    </div>
    <div className="col-md-2 col-2">
      <strong>Price</strong>
    </div>
    <div className="col-md-2 col-2">
      <strong>Total</strong>
    </div>
    <div className="col-md-6 col-6">
      <img src={product.image.thumb} alt={product.name} />
      <br />

      <Link to={`/products/${product.id}`}>
        <small>{product.name}</small>
      </Link>
    </div>
    <div className="col-md-2 col-2">{product.quantity}</div>
    <div className="col-md-2 col-2">{USDFormatter.format(product.price)} </div>
    <div className="col-md-2 col-2">
      {USDFormatter.format(product.price * product.quantity)}{' '}
    </div>
  </div>
)

const OrderTotal = ({ products }) => (
  <div className="col-12 col-md-12 order-total">
    <div className="text-right">
      <strong>Order Total:</strong>&nbsp;
      {USDFormatter.format(
        products.reduce((sum, i) => (sum += i.quantity * i.price), 0)
      )}
    </div>
    <hr />
  </div>
)

/*
 * what was the plan with state here? does not appear to be needed right now
 */
export default class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  ordersTotal(orders) {}
  render() {
    const userInfo = this.props.userInfo
    userInfo.orders = userInfo.orders.sort((a, b) => {
      return b.date_created - a.date_created
    })
    return (
      <div className="container page">
        <br />
        <h2>Profile</h2>
        <br />
        <div className="col-xs-12 col-sm-9">
          <h4 className="blue">
            <span className="middle">
              {userInfo.firstname} {userInfo.lastname}
            </span>
          </h4>
          <div className="profile-user-info">
            <div className="profile-info-row">
              <div className="profile-info-name"> Email </div>
              <div className="profile-info-value">
                <span>{userInfo.email}</span>
              </div>
            </div>

            <div className="profile-info-row">
              <div className="profile-info-name"> Telephone </div>
              <div className="profile-info-value">
                <span>{userInfo.phone}</span>
              </div>
            </div>

            <div className="profile-info-row">
              <div className="profile-info-name"> Shipping Address </div>
              <div className="profile-info-value">
                <span>{userInfo.address}</span>
              </div>
            </div>
            <div className="profile-info-row">
              <div className="profile-info-name"> City </div>

              <div className="profile-info-value">
                <span>{userInfo.city}</span>
              </div>
            </div>
            <div className="profile-info-row">
              <div className="profile-info-name"> State, Zip </div>

              <div className="profile-info-value">
                <span>
                  {userInfo.state} {userInfo.zip}
                </span>
              </div>
            </div>
            {/*
            <div className="profile-info-row">
              <div className="profile-info-name"> Joined </div>
              <div className="profile-info-value">
                <span />
              </div>
            </div>

            <div className="profile-info-row">
              <div className="profile-info-name"> Last Online </div>

              <div className="profile-info-value">
                <span>3 hours ago</span>
              </div>
            </div>
*/}
          </div>
          <div className="hr hr-8 dotted" />
        </div>
        <br />
        <h2>My Orders</h2>
        <br />
        <div className="card">
          <div className="card-body">
            {userInfo.orders.length > 0 && (
              <div className="container">
                <div className="row">
                  <div className="col-2 col-md-2 d-none d-sm-block">
                    <strong>## Order Date</strong>
                  </div>
                  <div className="col-2 col-md-2 d-none d-sm-block">
                    <strong>Status</strong>
                  </div>
                  <div className="col-6 col-md-6 d-none d-sm-block">
                    <strong>Products</strong>
                  </div>
                </div>
                {userInfo.orders.map((order, i) => {
                  return (
                    <div className="row" key={order.id.toString()}>
                      <div className="col-2 col-md-2 d-none d-sm-block">
                        {i + 1}&nbsp;{DateFormatter.format(order.date_created)}
                      </div>
                      <div className="col-2 col-md-2 d-none d-sm-block">
                        {order.status}
                      </div>
                      <div className="col-8 col-md-8 d-none d-sm-block">
                        {order.products.map(product => (
                          <OrderItem key={product.id} product={product} />
                        ))}
                      </div>

                      <div className="row col-md-12">
                        <OrderTotal
                          products={order.products}
                          key={order.id.toString()}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            {userInfo.orders.length === 0 && (
              <div className="alert alert-info">No orders</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
