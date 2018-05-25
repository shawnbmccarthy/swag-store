import React, {Component} from 'react';
import {
  NavbarTop,
  NavBarBrand,
  NavBarNav,
  NavBarSearch,
  NavItem,
  NavItemIcon,
  NavBarSide, NavBarSideItem,
  NavBarToggler
} from './components/Navigation';
import {Route} from 'react-router-dom';
import {Cart, Home, Register, Login} from './content/Pages';
import {ProductsPage} from './content/Products';
// TODO: Cleanup footer import Footer from './components/Footer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
      <div>
        <NavbarTop>
          <NavBarBrand href='/' src='/images/logo.png'/>
          <NavBarToggler/>
          <NavBarNav>
            <NavItem link='/' title='Home'/>
            <NavItem link='/register' title='Register'/>
            <NavItem link='/login' title='Login'/>
            <NavBarSearch/>
            <NavItemIcon link='/cart' title='cart' icon='fa fa-shopping-cart'/>
          </NavBarNav>
        </NavbarTop>
        <NavBarSide>
          <NavBarSideItem link='/apparel' title='apparel' icon='fas fa-tshirt'/>
          <NavBarSideItem link='/bags' title='bags' icon='fas fa-shopping-bag'/>
          <NavBarSideItem link='/kids' title='kids' icon='fas fa-child'/>
          <NavBarSideItem link='/travel' title='travel' icon='fas fa-globe'/>
          <NavBarSideItem link='/accessories' title='accessories' icon='fa fa-suitcase'/>
          <NavBarSideItem link='/vintage' title='vintage' icon='fab fa-shirtsinbulk'/>
        </NavBarSide>
        <Route exact path='/' component={Home}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login}/>
        <Route path='/cart' component={Cart}/>

        <Route path='/apparel'
               render={routeProps => <ProductsPage category='apparel' {...this.state} {...routeProps}/>}/>
        <Route path='/bags' render={routeProps => <ProductsPage category='bags' {...this.state} {...routeProps}/>}/>
        <Route path='/kids' render={routeProps => <ProductsPage category='kids' {...this.state} {...routeProps}/>}/>
        <Route path='/travel' render={routeProps => <ProductsPage category='travel' {...this.state} {...routeProps}/>}/>
        <Route path='/accessories'
               render={routeProps => <ProductsPage category='accessories' {...this.state} {...routeProps}/>}/>
        <Route path='/vintage'
               render={routeProps => <ProductsPage category='vintage' {...this.state} {...routeProps}/>}/>
        <div className='main'></div>
      </div>
    );
  }
}


export default App;
