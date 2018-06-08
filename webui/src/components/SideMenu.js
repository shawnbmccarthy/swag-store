import React from 'react'
import './SideMenu.css'
import { NavLink } from 'react-router-dom'

export const SideMenu = ({ items }) => (
  <div className="left navbar-dark bg-dark">
    {items.map(item => {
      return <SideMenuItem key={item.title} {...item} />
    })}
  </div>
)

export const SideMenuItem = ({ link, title, icon }) => (
  <NavLink
    className="item nav-link nav-item"
    activeStyle={{ fontWeight: 'bold', color: '#0056b3' }}
    to={link}
  >
    <i className={`icon ${icon}`} />
    {title}
  </NavLink>
)
