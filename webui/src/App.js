import React, { Component } from 'react'
import {
  NavbarTop,
  NavBarBrand,
  NavBarNav,
  NavBarSearch,
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
      cart: []
    }

    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  handleAddToCart(productId) {}

  render(props) {
    return (
      <div>
        <NavbarTop>
          <NavBarBrand href="/" src="/images/logo.png" />
          <NavBarToggler />
          <NavBarNav>
            <NavItem link="/" title="Home" />
            {this.props.stitchClient.isAuthenticated() ? (
              <a
                className="link nav-link base nav-item"
                href="javascript:void(0)"
                onClick={() =>
                  this.props.stitchClient
                    .logout()
                    .then(() => window.location.reload())
                }
              >
                Logout
              </a>
            ) : (
              <NavItem link="/login" title="Login" />
            )}
            <NavBarSearch />
            <NavItemIcon link="/cart" title="cart" icon="fa fa-shopping-cart" />
          </NavBarNav>
        </NavbarTop>
        <NavBarSide>
          {menuItems.map(item => {
            return <NavBarSideItem key={item.title} {...item} />
          })}
        </NavBarSide>
        <div className="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/login"
              render={routeProps => <Login {...this.props} {...routeProps} />}
            />
            <Route path="/cart" component={Cart} />
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
