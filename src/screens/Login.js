import React,{useState}from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'

export default function Login() {
    const [credentials, setCredentials] =useState({email:"",password:""})
    let navigate = useNavigate();
    // use of fetch api
    const handleSubmit = async(e) => {
        // synthetic event
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/loginuser",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            // backend me data jaayega
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json= await response.json();
        console.log(json);
        if(!json.success){
            alert("Enter valid Credentials!")
        }
        if(json.success){
          // for storing the authtoken in the local storage
          localStorage.setItem('userEmail',credentials.email);
          localStorage.setItem('authToken',json.authToken);
          console.log(localStorage.getItem('authToken'));
            navigate("/");
        }

    }
    const onChange =(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <>
    <Navbar></Navbar>
    <div className="container">
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label" style={{color: 'white'}}>Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp " name='email' value={credentials.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" style={{color: 'white'}}>Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
  </div>
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to="/createuser" className="m-3 btn btn-danger">new user</Link>
</form>
</div>
    </>
  )
}
