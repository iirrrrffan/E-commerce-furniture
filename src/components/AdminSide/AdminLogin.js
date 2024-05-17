import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Axios } from '../../App';

const AdminLogin = () => {
    const navi=useNavigate()
    const adminName = useRef();
    const adminPassword = useRef();
    const [error, setErrorMessage] = useState("");

    const handileAdmin = async () => {
      const newAdminName = adminName.current.value;
      const newAdminPassword = adminPassword.current.value;

      if (!newAdminName || !newAdminPassword) {
        setErrorMessage("Please fill in all fields.");
        return;
      }
      if (newAdminName !== "irfan") {
        setErrorMessage("Please Enter correct Username");
        return;
      }
      if (newAdminPassword !== "admin") {
        setErrorMessage("please enter 0 Password");
      }
      try{
         const data = {
          username:newAdminName,
          password:newAdminPassword
         }


         const response = await axios.post("http://localhost:3000/api/admin/login",data);
         console.log(response,"oooo");

         localStorage.setItem("admin_Token", response.data.data);
         toast.success("admin Login success");
         navi("/adminpage");
      }catch(error){
        toast.error("please enter valied username or password" || error)
    
      
    };
  }
  return (
    <div><div  className='shadow p-3 mb-5 bg-white roundedm-3  ' style={{width:"40rem", height:"70vh", margin:"auto" ,marginTop:"10%"}}> 
    <h1 style={{textAlign:"center"}}>Admin Login</h1>
   <input className='mt-5' ref={adminName}  style={{height:"3rem",width:"35rem"}} placeholder='         username'  />
   <br/> 
   <br/>
   <input  type='password'ref={adminPassword} style={{height:"3rem",width:"35rem"}}  placeholder='        password' />
   <br/>
   <p style={{ color: "red", textAlign: "center" }}>{error}</p>
   
   <Button onClick={handileAdmin}  className='mt-3'  variant="success">Login</Button><br/>
   
   </div></div>
  )
}

export default AdminLogin