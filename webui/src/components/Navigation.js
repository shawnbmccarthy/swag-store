import React from 'react'
import './Navigation.css'
import { NavLink, Link } from 'react-router-dom'

export const NavbarTop = ({ children }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top">
    <span className="before" />
    <div className="container">
      <span />
      {children}
      <span className="after" />
    </div>
    <span className="after" />
  </nav>
)

export const NavBarBrand = ({ href, src }) => (
  <ul className="nav-brand-ul mr-auto">
    <Link className="a-navbar-brand" to={href}>
      <li className="nav-logo-holder">
        <img className="nav-logo-img" src={src} alt="" />
      </li>
      <li className="nav-copy">Swag Store</li>
    </Link>
  </ul>
)

export const NavItem = ({ link, title, icon, badge }) => (
  <li className="nav-item">
    <NavLink
      exact
      className="link nav-link base"
      activeStyle={{ fontWeight: 'bold' }}
      to={link}
    >
      {icon && <i className={icon} style={{ marginRight: '5px' }} />}
      {title}
      {badge > 0 && <span className="badge badge-notify">{badge}</span>}
    </NavLink>
  </li>
)

export const NavBarNav = ({ children }) => (
  <div className="collapse navbar-collapse" id="navbarTargetContent">
    <ul className="nav navbar-nav ml-auto">{children}</ul>
  </div>
)

export const NavBarSearch = () => (
  <form className="form-inline my-2 my-lg-0 ml-auto">
    <input className="form-control mr-sm-2" type="text" placeholder="Search" />
    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
      Search
    </button>
  </form>
)

export const NavBarToggler = () => (
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarTargetContent"
    aria-controls="navbarTargetContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon" />
  </button>
)
