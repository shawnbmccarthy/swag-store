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
import { Cart, Home, Register, Login } from './content/Pages'
import { ProductsPage } from './content/Products'
// TODO: Cleanup footer import Footer from './components/Footer';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = props
  }

  render(props) {
    return (
      <div>
        <NavbarTop>
          <NavBarBrand href="/" src="/images/logo.png" />
          <NavBarToggler />
          <NavBarNav>
            <NavItem link="/" title="Home" />
            <NavItem link="/register" title="Register" />
            <NavItem link="/login" title="Login" />
            <NavBarSearch />
            <NavItemIcon link="/cart" title="cart" icon="fa fa-shopping-cart" />
          </NavBarNav>
        </NavbarTop>
        <NavBarSide>
          <NavBarSideItem
            link="/products/category/apparel"
            title="apparel"
            icon="fas fa-tshirt"
          />
          <NavBarSideItem
            link="/products/category/bags"
            title="bags"
            icon="fas fa-shopping-bag"
          />
          <NavBarSideItem
            link="/products/category/kids"
            title="kids"
            icon="fas fa-child"
          />
          <NavBarSideItem
            link="/products/category/travel"
            title="travel"
            icon="fas fa-globe"
          />
          <NavBarSideItem
            link="/products/category/accessories"
            title="accessories"
            icon="fa fa-suitcase"
          />
          <NavBarSideItem
            link="/products/category/vintage"
            title="vintage"
            icon="fab fa-shirtsinbulk"
          />
        </NavBarSide>
        <div className="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/cart" component={Cart} />
            <Route
              path="/products/category/:category"
              render={routeProps => (
                <ProductsPage
                  category={routeProps.match.params.category}
                  {...this.state}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
