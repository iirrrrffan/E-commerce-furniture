import Button from 'react-bootstrap/Button';
// import React, { useContext } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
// import { userContext } from "../../App";
import Navigationbar from "../Navigationbar";
import Foot from "./Foot";
import {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../App';
import { toast } from 'react-toastify';
import axios from 'axios';
const userId = localStorage.getItem("userID");

export default function Cart() {
  // const { cart,setCart } = useContext(userContext);

  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${userId}/cart`);
      console.log(response.data.data.cart);
      setCart(response.data.data.cart);
    } catch (error) {
      console.log("error fetching the product", error);
      toast.error("error");
    }
  }
  useEffect(()=>{
    fetchCart()
  },[])

const remove = async (id) => {
  try{
     const productId = id;
     const response =  await axios.delete(`http://localhost:3000/api/users/${userId}/cart`,{
      data:{ productId:productId},
     });
     fetchCart();
     console.log(response);
  }catch(error){
    console.log("error fetching the product", error);
    toast.error("error");
  }
  
};
const decreaseQuantity = (Id) => {
  const updatedCart = cart.map((item) => {
    if (item._id === Id && item.qty > 1) {
      return { ...item, qty: item.qty - 1 };
    }
    return item;
  });
  setCart(updatedCart);
};
const incri=(item)=>{
    const updatecart=cart.map((cartItem)=>{
        if(cartItem.Id===item.Id){
            return {...cartItem,Qty:cartItem.Qty+1}
            
        }return cartItem
    })
    setCart(updatecart)
}
const handleRemoveAll=()=>{
  setCart([]);
}
const totalCartItem = (item) => {
  return item.Price * item.Qty;
};
const totalcash=cart.reduce((total,item)=>total+item.Price*item.Qty,0)

  return (
    <div>
        <Navigationbar/>
      <section className="navu h-100 text-center" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol md="10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
                   Shopping Cart
                </MDBTypography>
                <div>
                  <p className="mb-0">
                    <span >TOTAL: RS {totalcash}</span>
                   
                  </p>
                </div>
              </div>

              {cart.map((item) => (
                <MDBCard key={item._id} className="rounded-3 mb-4">
                  <MDBCardBody className="p-4">
                    <MDBRow className="justify-content-between align-items-center">
                      <MDBCol md="2" lg="2" xl="2">
                        <MDBCardImage
                          className="rounded-3"
                          fluid
                          src={item.image}
                          alt="products"
                        />
                      </MDBCol>
                      <MDBCol md="3" lg="3" xl="3">
                        <p className="lead fw-normal mb-2">{item.title}</p>
                        <button onClick={()=>decreaseQuantity(item._id)}>-</button>
                        <span>{item.Qty}</span>
                        <button onClick={()=>incri(item._id)}>+</button>
                      
                      </MDBCol>
                      <MDBCol
                        md="3"
                        lg="3"
                        xl="2"
                        className="d-flex align-items-center justify-content-around"
                      >
                        {/* Additional content here */}
                      </MDBCol>
                      <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                        <MDBTypography tag="h5" className="mb-0">
                          {item.Price}
                        </MDBTypography>
                        <h6>Total: ₹{totalCartItem(item)}</h6>
                      </MDBCol>

                      <MDBCol md="1" lg="1" xl="1" className="text-end">
                        <a href="#!" className="text-danger">
                          <MDBIcon
                          
                            onClick={()=>remove(item._id)}
                            icon="trash text-danger"
                            size="lg"
                          />
                        </a>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              ))}
              
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <Button onClick={handleRemoveAll}  variant="danger" className="mb-5" >Delet All</Button>{' '}
      </section>
      <Foot/>
    </div>
  );
}
