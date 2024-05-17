import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';



const Success = () => {
    const navigate = useNavigate();

useEffect(()=>{
    let isSuccess = true;
    const fetchData = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3000/api/users/payment/success`);
            if (response.status === 20
               && isSuccess)
            toast.success("Payment successful");
          navigate("/");
        }catch(error){
            navigate("/");
        }  
    }
    const timeoutId = setTimeout(fetchData, 3000);
    return () => {
        isSuccess = false;
        clearTimeout(timeoutId);
      };
},[])

  return (
    <div className="payment-success d-flex justify-content-md-center">
      <img
        src="https://cdn.dribbble.com/users/253392/screenshots/6906291/check.gif"
        alt="Success"
      />
    </div>
  )
}

export default Success
