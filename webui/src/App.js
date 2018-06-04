import React, { Component } from 'react'
import {
  NavbarTop,
  NavBarBrand,
  NavBarNav,
  NavItem,
  NavBarSide,
  NavBarSideItem,
  NavBarToggler
} from './components/Navigation'
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
      userInfo: {
        authData: {}
      },
      cart: {
        products: [],
        totalQuantity: 0,
        totalPrice: 0
      }
    }

    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    if (this.props.stitchClient.isAuthenticated()) {
      this.props.stitchClient.executeFunction('getUserInfo').then(results => {
        const { cart, ...userInfo } = results
        this.setState({ userInfo, cart })
      })
    }
  }

  handleAddToCart(productId) {
    this.props.stitchClient
      .executeFunction('addToCart', productId)
      .then(({ cart }) => {
        this.setState({ cart: cart })
      })
    console.log(`Add Product ${productId} to the cart.`)
  }

  render(props) {
    const isAuthenticated = this.props.stitchClient.isAuthenticated()
    return (
      <div>
        <NavbarTop>
          <NavBarBrand href="/" src="/images/logo.png" />
          <NavBarToggler />
          <NavBarNav>
            {isAuthenticated && [
              <NavItem key="home" link="/" title="Home" />,
              <button
                key="btn-logout"
                type="button"
                className="btn btn-link link nav-link base nav-item"
                onClick={() =>
                  this.props.stitchClient
                    .logout()
                    .then(() => window.location.reload())
                }
              >
                Hello, {this.state.userInfo.authData.first_name} Logout
              </button>,
              <NavItem key="profile" link="/profile" title="profile" />,
              <NavItem
                key="cart"
                link="/cart"
                title="cart"
                icon="fa fa-shopping-cart"
                badge={this.state.cart.totalQuantity}
              />
            ]}
          </NavBarNav>
        </NavbarTop>
        {isAuthenticated && (
          <NavBarSide>
            {menuItems.map(item => {
              return <NavBarSideItem key={item.title} {...item} />
            })}
          </NavBarSide>
        )}
        <div className="main">
          <Switch>
            <ProtectedRoute exact path="/" component={Home} {...this.props} />
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
            />
            <ProtectedRoute
              exact
              path="/profile"
              component={ProfilePage}
              {...this.props}
              userInfo={this.state.userInfo}
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
            />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
