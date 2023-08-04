import React, { useContext, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { AuthDialogProps } from '../../Interfaces/Auth.interface';
import { UserLoginRequestDto } from '../../../Dto/Users/Request/userLoginRequestDto';
import { loginUser, registerUser } from '../../../services/users-https-service';
import { UserRegisterRequestDto } from '../../../Dto/Users/Request/userRegisterRequestDto';
import { showToast } from '../../../helpers/toastHelper';
import { AuthContext } from '../../../Providers/AuthContext';
import LoadingContext from '../../../Context/loadingContext';
import { BookSaveRequestDto } from '../../../Dto/Books/Request/BookSaveRequestDto';

const AuthDialog: React.FC<AuthDialogProps> = ({ open, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    repeatPassword: ''
  });

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null); 
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  const auth = useContext(AuthContext);
  const { isLoading, setLoading } = useContext(LoadingContext);
  

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  const { setIsAuthenticated, setUser } = auth;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const prepareLogin = () => {
    const _loginDto = new UserLoginRequestDto();
    _loginDto.userNameOrEmail = formData.email;
    _loginDto.password = formData.password;
    return _loginDto;
  }

  const prepareRegister = () =>{
    const _registerDto = new UserRegisterRequestDto()
    _registerDto.email = formData.email;
    _registerDto.password = formData.password;
    _registerDto.userName = formData.password;
    return _registerDto
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setEmailError(null);  // Resetting email error
    setPasswordError(null); // Resetting password error
    
    if (!emailRegex.test(formData.email) && !isLogin) {
      setEmailError('Invalid email format!');
      return;
    }

    if (!formData.email.trim()) {
      setEmailError('Email cannot be empty!');
      return;
  }

  if (!formData.password.trim()) {
    setPasswordError('Password cannot be empty!');
    return;
}
  
  
    if (isLogin) {
      try{
        if (!formData.email.trim()) {
          setEmailError('Email or username cannot be empty!');
          return;
        }
  
        if (!formData.password.trim()) {
          setPasswordError('Password cannot be empty!');
          return;
        }
      const payload = prepareLogin();
      const response = await loginUser(payload, setLoading);
  
      if (response) {
        setIsAuthenticated(true);
        setUser(response.data);
        localStorage.setItem("token", response.data.jwt);
        showToast(`Welcome ${response.data.userName}`, "success");
        onClose();
      }}catch (error){
        setEmailError('Invalid credentials. Please check your email/username and password.');
        setPasswordError('Invalid credentials. Please check your email/username and password.');
        showToast("Failed to login. Please check your credentials and try again.", "error");
      }
    } else {
      if (formData.password !== formData.repeatPassword) {
        setPasswordError('Passwords do not match!');
        return;
      }

      if (!isLogin && !formData.username.trim()) {
        setEmailError('Username cannot be empty!'); // You can create another state for username errors, but for simplicity, I'm using the emailError here.
        return;
    }
    
      
      if (!passwordRegex.test(formData.password)) {
        setPasswordError('Password should have at least 8 characters, with 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character!');
        return;
      }
      const payload = prepareRegister();
      const response = await registerUser(payload, setLoading);
  
      if (response) {
        onClose();
        setIsLogin(true);  
        showToast("User Successfully Registered, Please now Login", "success");
      }
    }
  };
  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isLogin ? 'Login' : 'Register'}</DialogTitle>
      <form onSubmit={handleSubmit}>
      <DialogContent>
        {!isLogin && (
          <>
            <TextField
              fullWidth
              margin="dense"
              label="Username"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!passwordError}
              helperText={passwordError}
            />
            <TextField
              fullWidth
              margin="dense"
              error={!!passwordError}
              helperText={passwordError}
              label="Repeat Password"
              variant="outlined"
              type="password"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
            />
          </>
        )}
        {isLogin && (
          <>
            <TextField
              fullWidth
              margin="dense"
              label="Email Or UserName"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!passwordError}
              helperText={passwordError}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          {isLogin ? 'Login' : 'Register'}
        </Button>
      </DialogActions>
    </form>
      <div style={{ padding: '0px 24px 24px 24px', textAlign: 'center' }}>
        {isLogin ? (
          <span>
            New user?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                setIsLogin(false);
                setEmailError(null); // Reset email error
                setPasswordError(null); // Reset password error
              }}
            >
              Register here
            </Link>
          </span>
        ) : (
          <span>
            Already have an account?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                setIsLogin(true);
                setEmailError(null); // Reset email error
                setPasswordError(null); // Reset password error
              }}
            >
              Login here
            </Link>
          </span>
        )}
      </div>
    </Dialog>
  );
};

export default AuthDialog;
