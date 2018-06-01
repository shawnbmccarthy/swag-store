import React, { Component } from 'react'
import {
  NavbarTop,
  NavBarBrand,
  NavBarNav,
  NavItem,
  NavItemIcon,
  NavBarSide,
  NavBarSideItem,
  NavBarToggler
} from './components/Navigation'
import { Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { Cart, Home, Login } from './content/Pages'
import ProductsPage from './content/Products'
import ProductPage from './content/Product'
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
        authData: {},
        cart: {
          products: []
        }
      }
    }

    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    if (this.props.stitchClient.isAuthenticated()) {
      this.props.stitchClient.executeFunction('getUserInfo').then(userInfo => {
        this.setState({ userInfo })
      })
    }
  }

  handleAddToCart(productId) {
    this.props.stitchClient
      .executeFunction('addToCart', productId)
      .then(cart => {
        this.setState({ cart })
      })
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
              <a
                key="logout"
                className="link nav-link base nav-item"
                href="javascript:void(0)"
                onClick={() =>
                  this.props.stitchClient
                    .logout()
                    .then(() => window.location.reload())
                }
              >
                Hello, {this.state.userInfo.authData.first_name} Logout
              </a>,
              <NavItemIcon
                key="cart"
                link="/cart"
                title="cart"
                icon="fa fa-shopping-cart"
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
              path="/login"
              render={routeProps => <Login {...this.props} {...routeProps} />}
            />
            <ProtectedRoute path="/cart" component={Cart} {...this.props} />
            <ProtectedRoute
              exact
              path="/products/category/:category"
              component={ProductsPage}
              {...this.props}
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
