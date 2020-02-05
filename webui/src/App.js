import React, { Component } from 'react'
import {
  NavbarTop,
  NavBarBrand,
  NavBarNav,
  NavItem,
  NavBarToggler
} from './components/Navigation'
import { SideMenu } from './components/SideMenu'
import { Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { Home, Login } from './content/Pages'
import Cart from './content/Cart'
import ProductsPage from './content/Products'
import ProductPage from './content/Product'
import ProfilePage from './content/Profile'
// TODO: Cleanup footer import Footer from './components/Footer';
import './App.css'

const menuItems = [
  {
    link: '/products/category/apparel',
    title: 'apparel',
    icon: 'fas fa-tshirt'
  },
  {
    link: '/products/category/bags',
    title: 'bags',
    icon: 'fas fa-shopping-bag'
  },
  {
    link: '/products/category/kids',
    title: 'kids',
    icon: 'fas fa-child'
  },
  {
    link: '/products/category/travel',
    title: 'travel',
    icon: 'fas fa-globe'
  },
  {
    link: '/products/category/accessories',
    title: 'accessories',
    icon: 'fa fa-suitcase'
  },
  {
    link: '/products/category/vintage',
    title: 'vintage',
    icon: 'fab fa-shirtsinbulk'
  }
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authData: {},
      cart: {
        products: [],
        totalQuantity: 0,
        totalPrice: 0
      },
      orders: [],
      notify: [],
      browsed_products: [],
      personalized_recs: []
    }

    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleUpdateCartItem = this.handleUpdateCartItem.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleProductNotification = this.handleProductNotification.bind(this)
    this.handleBrowsedProduct = this.handleBrowsedProduct.bind(this)
  }

  componentDidMount() {
    if (this.props.stitchClient.auth.isLoggedIn) {
      this.props.stitchClient.callFunction('getUserInfo').then(userInfo => {
        this.setState(userInfo)
      })
    }
  }

  handleAddToCart(productId, quantity = 1) {
    this.props.stitchClient.callFunction('addToCart', [productId, quantity])
      .then(({ cart }) => {
        this.setState({ cart })
      })
  }

  handleUpdateCartItem(productId, quantity = 0) {
    this.props.stitchClient.callFunction('updateCartItem', [productId, quantity])
      .then(({ cart }) => {
        this.setState({ cart })
      })
  }

  handleCheckout() {
    this.props.stitchClient.callFunction('checkout')
      .then(({ cart, orders }) => {
        this.setState({ cart, orders })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleProductNotification(productId) {
    this.props.stitchClient.callFunction('registerProductNotification', [productId])
      .then(({ notify }) => {
        this.setState({ notify })
      })
  }

  handleBrowsedProduct({ id, name }) {
    const users = this.props.db.collection('users')
    users
      .updateOne(
        { user_id: this.props.stitchClient.authedId() },
        {
          $addToSet: {
            browsed_products: { id, name, date_visited: new Date() }
          }
        }
      )
      .then(() => {
        return users
          .findOne(
            { user_id: this.props.stitchClient.authedId() },
            { _id: 0, browsed_products: 1 }
          )
          .then(({ browsed_products }) => {
            this.setState({ browsed_products })
          })
      })
  }

  render(props) {
    const isAuthenticated = this.props.stitchClient.auth.isLoggedIn
    return (
      <div>
        <NavbarTop>
          <NavBarBrand href="/" src="/images/logo.png" />
          <NavBarToggler />
          {isAuthenticated && (
            <NavBarNav>
              <li key="user-welcome" className="nav-item">
                <span className="navbar-text link">
                  Hello, {this.state.authData.first_name}
                </span>
              </li>
              <NavItem key="home" link="/" title="home" />
              <NavItem key="profile" link="/profile" title="profile" />
              <NavItem
                key="cart"
                link="/cart"
                title="cart"
                icon="fa fa-shopping-cart"
                badge={this.state.cart.totalQuantity}
              />
              <li key="logout" className="nav-item">
                <button
                  type="button"
                  className="btn btn-link link nav-link base"
                  onClick={() =>
                    this.props.stitchClient.auth.logout()
                      .then(() => window.location.reload())
                  }
                >
                  logout
                </button>
              </li>
            </NavBarNav>
          )}
        </NavbarTop>
        {isAuthenticated && <SideMenu items={menuItems} />}
        <div className="main">
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Home}
              {...this.props}
              personalized_recs={this.state.personalized_recs}
            />
            <Route
              exact
              path="/login"
              render={routeProps => <Login {...this.props} {...routeProps} />}
            />
            <ProtectedRoute
              exact
              path="/cart"
              component={Cart}
              {...this.props}
              cart={this.state.cart}
              handleUpdateCartItem={this.handleUpdateCartItem}
              handleCheckout={this.handleCheckout}
            />
            <ProtectedRoute
              exact
              path="/profile"
              component={ProfilePage}
              {...this.props}
              userInfo={this.state}
            />
            <ProtectedRoute
              exact
              path="/products/category/:category"
              component={ProductsPage}
              {...this.props}
              handleAddToCart={this.handleAddToCart}
            />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductPage}
              {...this.props}
              handleAddToCart={this.handleAddToCart}
              handleProductNotification={this.handleProductNotification}
              handleBrowsedProduct={this.handleBrowsedProduct}
              notify={this.state.notify}
            />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
