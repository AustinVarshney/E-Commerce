import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useMutation } from "@tanstack/react-query";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toast';
import { useAuth } from '../../Context/AuthContext';
import { login, register } from '../../components/API/api';

import './Auth.css';


function Auth() {
  const { loginContext } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [userdetails, setUserDetails] = useState({
    username: "",
    password: "",
    email: "",
    mobile_number: ""
  });

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsRegister((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }))
  }
  const registerMutation = useMutation({
    mutationFn: (user) => register(user),
    onSuccess: (response) => {
      console.log("Onsuccess inside");
      console.log("Mutate Register Successful", response);

      setTimeout(() => {
        if (!response?.token) {
          console.error("Signup response missing token or user");
          return;
        }

        toast.success("Registration Successfully");
        loginContext(response.token, response.user);
        setUserDetails({
          username: "", email: "", password: "", mobile_number: ""
        })

        setTimeout(() => {
          navigate("/");
        }, 2000);

      }, 2000)
    },

    onError: (error) => {
      console.error("Mutation Error:", error);
    },
    onSettled: () => {
      console.log("Mutation Settled");
    }
  })

  const loginMutation = useMutation({
    mutationFn: (loginData) => login(loginData),
    onSuccess: async (response) => {
      console.log("Login Match : ", response);

      setTimeout(() => {

        loginContext(response.token, response.user);
        toast.success("Login Successfully");
        setUserDetails({
          email: "",
          password: ""
        })
        setTimeout(() => {
          navigate("/");
        }, 1000)
      }, 800)

    },
    onError: (error) => {
      console.error("Login error:", error);
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      console.log("Registering:", userdetails);
      registerMutation.mutate(userdetails);
    } else {
      const loginDetails = {
        email: userdetails.email,
        password: userdetails.password
      };

      loginMutation.mutate(loginDetails);
    }

    setUserDetails({
      username: "",
      email: "",
      password: "",
      mobile_number: ""
    });
  }

  return (
    <>
      <div className="outer-container">
        <ToastContainer position="top-right" />
        <div
          className={`inner-container ${isRegister ? 'register-mode' : 'login-mode'}`}
        >
          <div className="left-container">
            <h3>Welcome Back!</h3>
            <h4 className="account">
              {isRegister ? 'Have an account?' : "Don't have an account?"}
            </h4>
            <Stack spacing={2} direction="row">
              <Button
                variant="outlined"
                onClick={handleToggle}
                className="register-button"
              >
                {isRegister ? 'Login' : 'Register'}
              </Button>
            </Stack>
          </div>

          <div className="right-container">
            <h2 className="heading">{isRegister ? 'Register' : 'Login'}</h2>
            <div className="input-fields">
              <form onSubmit={handleSubmit}>
                {isRegister && (
                  <>
                    <input type="text" placeholder="username" name="username" onChange={handleOnChange} value={userdetails.username} />
                    <input
                      type="tel"
                      placeholder="mobile no."
                      id="mobile_number"
                      name="mobile_number"
                      onChange={handleOnChange}
                      value={userdetails.mobile_number}
                    />
                    <input type="email" placeholder="email" name="email" onChange={handleOnChange} value={userdetails.email} />
                  </>
                )}
                {!isRegister && (
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    onChange={handleOnChange}
                    value={userdetails.email}
                  />
                )}
                <input
                  type="password"
                  placeholder="password"
                  id="password"
                  name='password'
                  onChange={handleOnChange}
                  value={userdetails.password}
                />
                {!isRegister && <p className="forgot-password">Forgot password?</p>}

                <Stack spacing={2} direction="row" style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                  <Button variant="outlined" type='submit' className="login-button">
                    {isRegister ? 'Register' : 'Login'}
                  </Button>
                </Stack>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Auth;
