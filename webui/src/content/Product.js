import React, { Component } from 'react'
import { USDFormatter } from '../helpers'

class ProductPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      product: {
        image: {}
      },
      quantity: 1,
      notifying: false
    }
  }

  getProduct() {
    this.props.db
      .collection('products')
      .findOne({ id: this.props.match.params.id })
      .then(product => {
        this.setState({
          product,
          notifying: Boolean(
            this.props.notify.find(element => {
              return element.id === this.props.match.params.id
            })
          )
        })
        this.props.handleBrowsedProduct(product)
      })
      .catch(err => {
        // should show alert in browser while sending the error to a service
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
    if (this.props.notify !== prevProps.notify) {
      this.setState({
        notifying: Boolean(
          this.props.notify.find(element => {
            return element.id === this.props.match.params.id
          })
        )
      })
    }
  }

  // this is a big render, which can get updated on notify (can this cause perf issues?)
  // possibly make smaller render with notify being pushed down to stock (or lifting context and creating component
  // which use the context as need for redrawing)
  render() {
    const {
      _id,
      name,
      id,
      price,
      image,
      overview,
      inventory,
      ...rest
    } = this.state.product
    const isInStock = inventory > 0
    return (
      <div className="container page">
        <div className="row">
          <div className="col col-md-10">
            <h3>{name}</h3>
          </div>
          <div className="col col-md-2 text-right">
            <h3>{USDFormatter.format(price)}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col col-md-6 text-center">
            <img src={image.large} height="300" alt={name} />
          </div>
          <div className="col col-md-6">
            <div className="row">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Overview</h5>
                  <p className="card-text">{overview}</p>
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: '10px' }}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Add to Cart</h5>
                  {isInStock ? (
                    [
                      <p key="txtInStock" className="card-text text-success">
                        In Stock
                      </p>,
                      <form key="formAddToCart" className="form-inline">
                        <label htmlFor="txtQuantity">Quantity: </label>
                        <input
                          id="txtQuantity"
                          type="number"
                          className="form-control col-2"
                          value={this.state.quantity}
                          onChange={e => {
                            this.setState({ quantity: e.target.value })
                          }}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => {
                            this.props.handleAddToCart(
                              id,
                              parseInt(this.state.quantity, 10)
                            )
                          }}
                        >
                          <i className={'fa fa-plus'} /> Add to cart
                        </button>
                      </form>
                    ]
                  ) : (
                    <p className="card-text text-danger">Out of Stock</p>
                  )}
                  {!isInStock &&
                    this.state.notifying && (
                      <p className="card-text">
                        We'll Notify you when it's back in stock.
                      </p>
                    )}
                  {!isInStock &&
                    !this.state.notifying && (
                      <form className="form-inline">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => {
                            this.props.handleProductNotification(id)
                          }}
                        >
                          Notify When in Stock
                        </button>
                      </form>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: '10px' }}>
          <div className="col col-md-12">
            <div className="card">
              <div className="card-header">Additional Information</div>
              <div className="card-body">
                {rest && (
                  <table className="table table-striped">
                    <tbody>
                      {Object.keys(rest).map(key => {
                        return (
                          <tr key={key}>
                            <td>{key}</td>
                            <td>{rest[key].toString()}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductPage
