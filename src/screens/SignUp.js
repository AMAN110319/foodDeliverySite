import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

export default function SignUp() {
    const [credentials, setCredentials] =useState({name:"",email:"",password:"",geolocation:""})
    let navigate = useNavigate();
    // use of fetch api
    const handleSubmit = async(e) => {
        // synthetic event
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/createUser",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            // backend me data jaayega
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
        });
        const json= await response.json();
        console.log(json);
        if(!json.success){
            alert("Enter valid Credentials!")
        }
        else{
          navigate("/");
        }
    }
    const onChange =(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <>
    <Navbar/>
    <div className="container">
      <form onSubmit={handleSubmit}>
  <div className="mb-3" >
    <label htmlFor="Name" className="form-label" style={{color: 'white'}}>User Name</label>
    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label" style={{color: 'white'}}>Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp " name='email' value={credentials.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" style={{color: 'white'}}>Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" style={{color: 'white'}}>Address</label>
    <input type="text" className="form-control" id="exampleInputPassword1" name='geolocation' value={credentials.geolocation} onChange={onChange}/>
  </div>
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
</form>
</div>
    </>
  )
}
