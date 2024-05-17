import Button from 'react-bootstrap/Button';
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

import Navigationbar from "../Navigationbar";
import Foot from "./Foot";
import {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../App';
import { toast } from 'react-toastify';
import axios from 'axios';
const userId = localStorage.getItem("userID");

export default function Cart() {


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
const totalCartItem = (item) => {
  return item.price * item.qty;
};


const buyProduct = async ()=>{
  try{
    const response = await Axios.post(`http://localhost:3000/api/users/${userId}/payment`);
      console.log(response.data.url);
      window.location.href = response.data.url;
  }catch(error){
    toast.error(error);
    console.log(error);
  }
}
const totalCartPrice = cart.reduce(
  (total, item) => total + item.price * 1,
  0
);

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
                        {/* <button >-</button>
                        <span>count</span>
                        <button >+</button> */}
                      
                      </MDBCol>
                      <MDBCol
                        md="3"
                        lg="3"
                        xl="2"
                        className="d-flex align-items-center justify-content-around"
                      >
                        
                      </MDBCol>
                      <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                        <MDBTypography tag="h5" className="mb-0">
                          {item.price}
                        </MDBTypography>
                        {/* <h6>Total: ₹{totalCartItem(item)}</h6> */}
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
                <h6>Total: ₹{totalCartPrice}</h6>

        <Button variant="primary" className="mb-5" onClick={buyProduct} >BUY</Button>{' '}
      </section>
      <Foot/>
    </div>
  );
}
