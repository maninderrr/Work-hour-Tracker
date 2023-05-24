import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { CSSTransition } from 'react-transition-group';

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8089/login', {
        email: email,
        password: password,
      });
      if (response.data.isManager) {
        console.log(response.data);
        navigate(`/summary?id=${response.data.empID}`, {
          state: { empid: response.data.empID },
        });
      } else {
        console.log(response.data);
        navigate(`/dashboard?id=${response.data.empID}`, {
          state: { empid: response.data.empID },
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    
    <>
    <CSSTransition in={true} appear={true} classNames="fade" timeout={1000}>
    <div className="work-hour-tracker">
    <h1 style={{ fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '4rem', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.2rem', color: '#4e4e4e', marginBottom: '2rem' }}>
  Work Hour Tracker
</h1>
      </div>
      </CSSTransition>
    <div className="auth-form-container">
      

      <h2 className="title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email"> <i className="fas fa-envelope"></i> Email</label>
         
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password"><i className="fas fa-lock"></i> Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="*********"
            id="password"
            name="password"
            required
          ></input>
        </div>
        <button type="submit" className="login-button">
          LOGIN
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch('register')}
      >
        Don't have an account? Register here
      </button>
    </div>
    </>
  );
};

export default Login;
