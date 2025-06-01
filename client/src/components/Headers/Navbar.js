import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';

import { logoutSuccess } from '../../store/admin/action';

const Navbar = () => {

  const dispatch = useDispatch();
  const { auth } = useSelector(({ admin }) => admin);

  const logoutOnclickConfirm = () => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Do you want to logout ',
      okText: 'Yes',
      onOk: () => logoutOnClick(),
      cancelText: 'No',
    });
  }

  const logoutOnClick = async () => {
    dispatch(logoutSuccess());
    await localStorage.removeItem('usertoken');
    window.location.href = "/";
  }

  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <Link className="navbar-brand brand-logo" to="/"><img src={require('../../assets/images/rootlogo.png')} alt="logo" /></Link>
        <Link className="navbar-brand brand-logo-mini" to="/"><img src={require('../../assets/images/logo-mini.svg')} alt="logo" /></Link>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-stretch">
        <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={() => document.body.classList.toggle('sidebar-icon-only')}>
          <span className="mdi mdi-menu"></span>
        </button>
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile">
            <Dropdown alignRight>
              <Dropdown.Toggle className="nav-link">
                <i className="mdi mdi-account-circle text-primary"></i>
                <div className="nav-profile-text">
                  <p className="mb-1 text-black">{auth?.user?.name}</p>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="navbar-dropdown">
                <Dropdown.Item onClick={logoutOnclickConfirm}>
                  <i className="mdi mdi-logout mr-2 text-primary"></i>
                  Signout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;