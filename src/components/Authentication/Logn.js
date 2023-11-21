import React, { useContext, useRef } from 'react'
import { Button } from 'react-bootstrap'
import { userContext } from '../../App'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Logn = () => {
  const navi=useNavigate()
  const {user,setLogin}=useContext(userContext)
  console.log(user);
  const userRef = useRef(null);
  const passRef = useRef(null);
  const Login=(e)=>{
    e.preventDefault();
    const Name=userRef.current.value;
    const Password=passRef.current.value;
    
    const findname=user.find((item)=>item.name===Name)
    const findpassword=user.find((item)=>item.password===Password)
    if(findname&&findpassword){
      setLogin(true)
      toast.success('login success')
      navi('/')
    }else{
     toast.warning('incorrect password or username')
    } 
  }
  return (
    <div><div  className='shadow p-3 mb-5 bg-white roundedm-3  ' style={{width:"40rem", height:"70vh", margin:"auto" ,marginTop:"10%"}}> 
     <h1 style={{textAlign:"center"}}>Log in</h1>
    <input ref={userRef} className='mt-5'   style={{height:"3rem",width:"35rem"}} placeholder='         username'  />
    <br/>   
    <br/>
    <input ref={passRef} type='password' style={{height:"3rem",width:"35rem"}}  placeholder='        password' />
    <br/>
    <h6  className='mt-3 text-primary'>forget password</h6>
    
    <Button onClick={Login}  className='mt-3'  variant="success">Login</Button><br/>
    <h6 ><Link to="/sign">Signup</Link> </h6>
    </div></div>
  )
}

export default Logn