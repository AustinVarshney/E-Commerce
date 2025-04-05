import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toast';
import amazonIcon from '../../../src/assets/icons8-amazon.svg';
import googleIcon from '../../../src/assets/icons8-google.svg';
import { forgotPassword, login, register } from '../../components/API/api';
import { useAuth } from '../../Context/AuthContext';
import './Auth.css';


function Auth() {
  const { loginContext } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const forgotPasswordRef = useRef(null);
  const [showPassword2, setShowPassword2] = useState(false);
  const [userdetails, setUserDetails] = useState({
    username: "",
    password: "",
    email: "",
    mobile_number: ""
  });
  const [forgotPasswordDetails, setForgotPasswordDetails] = useState({
    email: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

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

  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const forgot_Password = useMutation({
    mutationFn: (userData) => forgotPassword(userData),
    onSuccess: async (response) => {
      console.log("Forgot Password Successfully", response);

      setTimeout(() => {
        toast.success("Forgot Password Successfully");
        forgotPasswordDetails.email = "",
          forgotPasswordDetails.confirmNewPassword = "",
          forgotPasswordDetails.newPassword = ""
        setTimeout(() => {
          navigate("/auth");
        }, 1000)
      }, 800)

    },

    onError: (error) => {
      console.error("Forgot Password Error:", error);
      toast.error(error.message || "Failed to reset password. Try again.");
    }
  })

  const handleForgotPasswordSubmit = () => {
    if (!forgotPasswordDetails.email || !forgotPasswordDetails.confirmNewPassword) {
      toast.error("Please enter both email and new password!");
      return;
    } else if (forgotPasswordDetails.newPassword === forgotPasswordDetails.confirmNewPassword) {
      forgot_Password.mutate(forgotPasswordDetails);
    } else {
      toast.error("Password does not match");
    }
  };

  const openForgotPassword = () => {
    let forgotPasswordContainer = forgotPasswordRef.current;
    if (forgotPasswordContainer) {
      forgotPasswordContainer.style.display = "flex";
    }
  };

  const handleClickOutside = (event) => {
    if (forgotPasswordRef.current && !forgotPasswordRef.current.contains(event.target)) {
      forgotPasswordRef.current.style.display = "none";
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="outer-container">
        <ToastContainer position="top-right" />
        <div
          className={`inner-container ${isRegister ? 'register-mode' : 'login-mode'}`}
        >
          <div className='forgot-password-container' ref={forgotPasswordRef}>
            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-email">email</InputLabel>
              <OutlinedInput type='email' name='email' value={forgotPasswordDetails.email} onChange={handleForgotPasswordChange}
                id="outlined-adornment-email"
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      size="small"
                      // onClick={handleSendOTP}
                      disabled={!forgotPasswordDetails.email}
                    >
                      Verify
                    </Button>
                  </InputAdornment>
                }
                label="email" />
            </FormControl>

            {otpSent && (
              <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                <InputLabel htmlFor="otp">Enter OTP</InputLabel>
                <OutlinedInput
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  id="otp"
                  label="Enter OTP"
                />
              </FormControl>
            )}

            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">new password</InputLabel>
              <OutlinedInput type={showPassword ? 'text' : 'password'} name="confirmNewPassword"
                value={forgotPasswordDetails.confirmNewPassword}
                onChange={handleForgotPasswordChange}
                id="outlined-adornment-password"

                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? 'hide the password' : 'display the password'
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">confirm new password</InputLabel>
              <OutlinedInput type={showPassword2 ? 'text' : 'password'} name='newPassword' value={forgotPasswordDetails.newPassword} onChange={handleForgotPasswordChange}
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword2 ? 'hide the password' : 'display the password'
                      }
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <NavLink className='forgot-password-button' onClick={handleForgotPasswordSubmit}>Submit</NavLink>
          </div>
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

                {!isRegister && <p className="forgot-password" onClick={openForgotPassword}>Forgot password?</p>}

                <Stack spacing={2} direction="row" style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                  <Button variant="outlined" type='submit' className="login-button">
                    {isRegister ? 'Register' : 'Login'}
                  </Button>
                </Stack>
              </form>
            </div>

            <NavLink to="http://localhost:5001/auth/google" className='google-container'><span><img src={googleIcon} className='google-icon' /></span>Login with google</NavLink>
            <NavLink to="http://localhost:5001/auth/amazon" className='amazon-container'><span><img src={amazonIcon} className='amazon-icon' /></span>Login with amazon</NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
export default Auth;
