import React, { useState, useRef } from 'react'
import axios from 'axios';
import './Login.css';
import { CSSTransition } from 'react-transition-group';


const Register = (props) =>{
    
    const [email, setEmail]= useState('');
    const [pass, setPass]= useState('');
    const [name, setName]= useState('');
    const [managerID, setManagerID]= useState('');
    const [isManager, setIsManager] = useState(false);
    const [doj, setDoj]= useState('');
    const [errorm, setErrorm] = useState('');
    const buttonRef = useRef(null);

    const requestObject = {
      email: email,
      empName: name,
      password: pass,
      DOJ: doj,
      isManager: isManager,
      // manager:"Manager1",
      managerID: managerID
     


    };
  
    console.log('JSON request object:', requestObject);

    const handleSubmit =  async (e) =>{
        e.preventDefault();
        console.log(email,pass,name,isManager,doj)
        try {
           const response = await axios.post('http://localhost:8089/register', requestObject);
            // handle successful login here
            buttonRef.current.click();
          } catch (error) {
            setErrorm(error.message);
            
            //console.error(error);
          }
    }
    
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
        <h2>Register</h2>
        <form className="reg-form" onSubmit={handleSubmit}>
        <div>
        <label htmlFor="name">Full Name</label>
        <input value={name} onChange = {(e) => setName(e.target.value)} type='name' placeholder='Name' id ='name' name='name '></input>
        <label htmlFor="email">Email</label>
        <input value={email} onChange = {(e) => setEmail(e.target.value)} type='email' placeholder='youremail@gmail.com' id ='email' name='email '></input>
        {/* <label htmlFor="managerID">Manager ID</label>
        <input value={managerID} onChange = {(e) => setManagerID(e.target.value)} type='text' id ='managerID' name='managerID '></input> */}
        <label htmlFor="doj">Date Of Joining</label>
        <input value={doj} onChange = {(e) => setDoj(e.target.value)} type='date' id ='doj' name='doj'></input>

        <label htmlFor="password">Password</label>
        <input value={pass} onChange = {(e) => setPass(e.target.value)} type="password" placeholder='*********' id ='password' name='password '></input>
        <div className="checkbox-container">
         
          <label htmlFor="isManager">Are you a Manager?</label>
          <input
            type="checkbox"
            id="isManager"
            name="isManager"
            checked={isManager}
            onChange={(e) => setIsManager(e.target.checked)}
          />
        </div>
        <div className ="manager">
        <label  htmlFor="managerID">Your Manager's ID</label>
        <input value={managerID} onChange = {(e) => setManagerID(e.target.value)}
         type='manager' placeholder='Manager ID' id ='managerID' name='managerID '
         disabled={isManager}></input>
        </div>
        </div>
        <div>
       <button type='submit' className='login-button'>REGISTER</button>
       </div>
       </form>
       
       {errorm && <p className="error">{errorm}</p>}
       <button ref={buttonRef} className="link-btn" onClick={()=>props.onFormSwitch('login')}>Already Have an account? Login here</button>
    </div> 
    </>
    )
    
}

export default Register