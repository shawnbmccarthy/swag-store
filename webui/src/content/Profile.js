import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { USDFormatter, DateFormatter } from '../helpers'
import '../components/Profile.css'

const OrderItem = ({ product }) => (
  <div className="row">
    <div className="col-md-2 col-6">
      <img src={product.image.thumb} alt={product.name} />
    </div>
    <div className="col-md-4 col-4">
      <Link to={`/products/${product.id}`}>{product.name}</Link>
    </div>
    <div className="col-md-2 col-4">
      <input
        type="number"
        value={product.quantity}
        className="form-control col-md-12"
      />
    </div>
    <div className="col-md-4 col-4">{USDFormatter.format(product.price)}</div>
  </div>
)

export default class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const userInfo = this.props.userInfo
    return (
      <div className="container page">
        <h2>Profile</h2>

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
          </div>

          <div className="hr hr-8 dotted" />
        </div>
        <h2>Orders</h2>
        <div className="card">
          <div className="card-body">
            {userInfo.orders.length > 0 && (
              <div className="container">
                <div className="row">
                  <div className="col-1 col-md-1 d-none d-sm-block" />
                  <div className="col-2 col-md-2 d-none d-sm-block">
                    <strong>Order Date</strong>
                  </div>
                  <div className="col-2 col-md-2 d-none d-sm-block">
                    <strong>Status</strong>
                  </div>
                  <div className="col-7 col-md-7 d-none d-sm-block">
                    <strong>Products</strong>
                  </div>
                </div>
                {userInfo.orders.map((order, i) => {
                  return (
                    <div className="row">
                      <div className="col-1 col-md-1 d-none d-sm-block">
                        {i + 1}
                      </div>
                      <div className="col-2 col-md-2 d-none d-sm-block">
                        {DateFormatter.format(order.date_created)}
                      </div>
                      <div className="col-2 col-md-2 d-none d-sm-block">
                        {order.status}
                      </div>
                      <div className="col-7 col-md-7 d-none d-sm-block">
                        {order.products.map(product => (
                          <OrderItem key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  )
                })}
                <div className="row">
                  <div className="order-total">
                    <strong>Total:</strong>{' '}
                    {USDFormatter.format(userInfo.orders.total)}
                  </div>
                </div>
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
