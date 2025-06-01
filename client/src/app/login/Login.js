import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';
import jwtDecode from "jwt-decode";

import { loginSuccess } from '../../store/admin/action';
import AdminRepository from '../../repositories/AdminRepository';

let passwordStyle = {
  position: "absolute",
  top: "15px",
  right: "40px",
  cursor: 'pointer'
};

const Login = (props) => {

  const dispatch = useDispatch();
  const { auth } = useSelector(({ admin }) => admin);

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const userOnChange = (user) => {
    setUser(user);
    let errorObj = { ...errors };
    errorObj['user'] = '';
    setErrors(errorObj);
  }

  const passwordOnChange = (password) => {
    setPassword(password);
    let errorObj = { ...errors };
    errorObj['password'] = '';
    setErrors(errorObj);
  }

  const enterPressed = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      loginOnClick()
    }
  }

  const loginOnClick = async () => {
    let errorObj = {};
    if (user && password) {
      let result = await AdminRepository.login({ userName: user, password });
      if (result && result.data) {
        let user = jwtDecode(result.data);
        await localStorage.setItem('usertoken', result.data);
        dispatch(loginSuccess({ user: user, token: result.data }));
        notification.success({
          message: "Welcome Back!"
        });
        window.location.href = "/dashboard";
      } else if (result && result.message) {
        notification.error({
          message: result.message
        });
      } else {
        notification.error({
          message: 'Something Wrong'
        });
      }
    } else {
      if (!user) errorObj['user'] = 'Please Enter User';
      if (!password) errorObj['password'] = 'Please Enter Password';
      setErrors(errorObj);
    }
  }

  useEffect(() => {
    let usertoken = localStorage.getItem('usertoken');
    if (usertoken) {
      window.location.href = "/dashboard";
    }
  }, [auth, dispatch]);

  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={require("../../assets/images/rootlogo.png")} alt="logo" />
              </div>
              <div>
                <div className="input-group">
                  <input
                    className="form-control"
                    placeholder='Username'
                    value={user}
                    onChange={(e) => userOnChange(e.target.value)}
                    onKeyPress={enterPressed.bind(this)}
                  />
                </div>
                <div className="input-group mt-4">
                  <input
                    className="form-control"
                    placeholder='Password'
                    type={isShowPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => passwordOnChange(e.target.value)}
                    onKeyPress={enterPressed.bind(this)}
                  />
                  {!isShowPassword ?
                    <i className="mdi mdi-eye-off" onClick={() => setShowPassword(!isShowPassword)} style={passwordStyle} /> :
                    <i className="mdi mdi-eye" onClick={() => setShowPassword(!isShowPassword)} style={passwordStyle} />
                  }
                </div>
              </div>
              <div className="mt-3">
                <button
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  onClick={loginOnClick}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;