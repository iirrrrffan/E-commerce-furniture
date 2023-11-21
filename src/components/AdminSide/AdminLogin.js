import React, { useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminLogin = () => {
    const navi=useNavigate()
    const adminName = useRef();
    const adminPassword = useRef();
    const [error, setErrorMessage] = useState("");
    const handileAdmin = () => {
      const newAdminName = adminName.current.value;
      const newAdminPassword = adminPassword.current.value;
  
      if (!newAdminName || !newAdminPassword) {
        setErrorMessage("Please fill in all fields.");
        return;
      }
      if (newAdminName !== "admin") {
        setErrorMessage("Please Enter correct Username");
        return;
      }
      if (newAdminPassword !== "admin") {
        setErrorMessage("please enter correct Password");
      }
      const Admin = newAdminName === "admin" && newAdminPassword === "admin";
      if (Admin) {
        toast.success("admin Login success");
        navi("/adminpage");
      } else {
        toast.error("please enter valied username or password");
      }
    };
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