import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Sidebar extends Component {

  state = {};

  componentDidMount() {
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className={this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-title">Dashboard</span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>
          <li className={this.isPathActive('/company') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/company">
              <span className="menu-title">Company</span>
              <i className="mdi mdi-city menu-icon"></i>
            </Link>
          </li>
          <li className={this.isPathActive('/deliverypartner') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/deliverypartner">
              <span className="menu-title">Delivery Partners</span>
              <i className="mdi mdi-bike menu-icon"></i>
            </Link>
          </li>
          <li className={this.isPathActive('/orders') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/orders">
              <span className="menu-title">Orders</span>
              <i className="mdi mdi-truck-delivery menu-icon"></i>
            </Link>
          </li>
          <li className={this.isPathActive('/reports') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/reports">
              <span className="menu-title">Reports</span>
              <i className="mdi mdi-elevation-rise menu-icon"></i>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

}

export default withRouter(Sidebar);