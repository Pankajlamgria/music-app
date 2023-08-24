import React from "react";
import "../css/login.css";
import { useState } from "react";
import musiccontext from "../context/Musincontext";
import { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Login = () => {
  const history=useHistory();
  const contextcontent=useContext(musiccontext);
  const host = "http://localhost:4000";
  const [logindetail,setlogindetail]=useState({email:"",password:""});
  const [signindetail,setsignindetail]=useState({email:"",password:"",name:""});

  const handlesignindetailchange=(e)=>{
    setsignindetail({...signindetail,[e.target.name]:e.target.value})
  }
  const handledetailchange=(e)=>{
    setlogindetail({...logindetail,[e.target.name]:e.target.value})
  } 
  const login=async(email1,password1)=>{
    const response=await fetch(`${host}/api/auth/login`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({email:email1,password:password1}),
    });
    const loginres= await response.json();
    if(loginres.success){
      localStorage.setItem("musictoken",loginres.authtoken);
      history.push("/");
    }
    else{
      alert("Incorrect details");
    }

  }

  const signin=async(name1,email1,password1)=>{
    const response=await fetch(`${host}/api/auth/signin`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({name:name1,email:email1,password:password1}),
    });
    const signinres= await response.json(); 
    if(signinres.success){
      localStorage.setItem("musictoken",signinres.authtoken);
      history.push("/");
    }
    else{
      alert("Incorrect details");
    }

  }
  const handlesignin=(e)=>{
    e.preventDefault();
    signin(signindetail.name,signindetail.email,signindetail.password)
  }
  const handlelogin=(e)=>{
    e.preventDefault();
    // console.log(logindetail);
    login(logindetail.email,logindetail.password);
  }
  return (
    <div style={{color:"white"}}>
      <div className="loginform" id="loginformid">
        <h2>Login</h2>
        <div className="form-text createaccmsg" onClick={()=>{
          document.getElementById("loginformid").style.display="none";
          document.getElementById("signinformid").style.display="flex";
        }}>
              Create New account.
            </div>
        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{backgroundColor:"#121212",color:"white"}}
              name="email"
              onChange={handledetailchange}
              
            />
            <div id="emailHelp" className="form-text sometext">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
            style={{backgroundColor:"#121212",color:"white"}}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={handledetailchange}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" onClick={handlelogin}>
            Log in
          </button>
        </form>
      </div>



      <div className="loginform" id="signinformid">
        <h2>Signin</h2>
        <div className="form-text createaccmsg" onClick={()=>{
          document.getElementById("loginformid").style.display="flex";
          document.getElementById("signinformid").style.display="none";
        }}>
              Already has an account.
            </div>
        <form>
        <div className="mb-3">
            <label for="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              style={{backgroundColor:"#121212",color:"white"}}
              name="name"
              onChange={handlesignindetailchange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{backgroundColor:"#121212",color:"white"}}
              name="email"
              onChange={handlesignindetailchange}
              
            />
          </div>
         
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
            style={{backgroundColor:"#121212",color:"white"}}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={handlesignindetailchange}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" onClick={handlesignin}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
