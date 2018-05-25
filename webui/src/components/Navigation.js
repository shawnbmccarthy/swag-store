import React, {Component} from 'react';
import './Navigation.css';
import {NavLink} from 'react-router-dom';

export class NavbarTop extends Component {
  state = {
    collapseIn: false
  };

  renderChildren = () => {
    const {children} = this.props;
    return React.Children.map(children, (child) => {
      return React.cloneElement(child,
        {
          navbarToggle: this.navbarToggle,
          collapseIn: this.state.collapseIn
        }
      );
    });
  };

  navbarToggle = () => {
    this.setState({collapseIn: !this.state.collapseIn})
  };

  render() {
    return (
      <nav ref='navbar' className='navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top'>
        <span className='before'/>
        <div ref='container' className='container'>
          <span/>
          {this.renderChildren()}
          <span className='after'/>
        </div>
        <span className='after'/>
      </nav>
    )
  };
}

export class NavBarBrand extends Component {
  render() {
    const {href, src} = this.props;
    return (
      <ul className='nav-brand-ul mr-auto'>
        <a className='a-navbar-brand' href={href}>
          <li className='nav-logo-holder'><img className='nav-logo-img' src={src} alt=''/></li>
          <li className='nav-copy'>Swag Store</li>
        </a>
      </ul>
    )
  }
}

export class NavItem extends Component {
  render() {
    const {link, title} = this.props;
    return (
      <NavLink className='link nav-link base nav-item' activeStyle={{fontWeight: 'bold'}} to={link}>{title}</NavLink>
    );
  }
}

export class NavItemIcon extends Component {
  render() {
    const {link, title, icon} = this.props;
    return (
      <NavLink className='link nav-link base nav-item' activeStyle={{fontWeight: 'bold'}} to={link}>
        <i className={icon}></i>{title}
      </NavLink>
    );
  }
}

export class NavBarNav extends Component {
  render() {
    const {children} = this.props;
    return (
      <div className="collapse navbar-collapse" id="navbarTargetContent">
        <ul className='nav navbar-nav ml-auto'>{children}</ul>
      </div>
    );
  }
}

export class NavBarSearch extends Component {
  render() {
    return (
      <form className='form-inline my-2 my-lg-0 ml-auto'>
        <input className='form-control mr-sm-2' type='text' placeholder='Search'/>
        <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>Search</button>
      </form>
    );
  }
}

export class NavBarToggler extends Component {
  render() {
    return (
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTargetContent"
              aria-controls="navbarTargetContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    );
  }
}

export class NavBarSide extends Component {
  state = {
    collapseIn: false
  };

  renderChildren = () => {
    const {children} = this.props;
    return React.Children.map(children, (child) => {
      return React.cloneElement(child,
        {
          navbarToggle: this.navbarToggle,
          collapseIn: this.state.collapseIn
        }
      );
    });
  };

  navbarToggle = () => {
    this.setState({collapseIn: !this.state.collapseIn})
  };

  render() {
    return (
      <div className='left navbar-dark bg-dark'>
        {this.renderChildren()}
      </div>
    );
  }
}

export class NavBarSideItem extends Component {
  render() {
    const {link, title, icon} = this.props;
    const cn = `icon ${icon}`;
    return (
      <NavLink className='item nav-link nav-item' activeStyle={{fontWeight: 'bold'}} to={link}>
        <i className={cn}/>{title}
      </NavLink>
    );
  }
}