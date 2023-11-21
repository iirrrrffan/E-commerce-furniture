import Button from 'react-bootstrap/Button';
import React, { useContext } from "react";
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
import { userContext } from "../../App";
import Navigationbar from "../Navigationbar";
import Foot from "./Foot";

export default function Cart() {
  const { cart,setCart } = useContext(userContext);
const remove=(index)=>{
    const newTask=[...cart]
    newTask.splice(index,1)
    setCart(newTask) 
}
const dicri=(item)=>{
  const updatecart=cart.map((cartItem)=>
    cartItem.Id===item && cartItem.Qty>1?{...cartItem,Qty:cartItem.Qty-1}:cartItem
  );
  setCart(updatecart)
}
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
                <MDBCard key={item.id} className="rounded-3 mb-4">
                  <MDBCardBody className="p-4">
                    <MDBRow className="justify-content-between align-items-center">
                      <MDBCol md="2" lg="2" xl="2">
                        <MDBCardImage
                          className="rounded-3"
                          fluid
                          src={item.Image}
                          alt="products"
                        />
                      </MDBCol>
                      <MDBCol md="3" lg="3" xl="3">
                        <p className="lead fw-normal mb-2">{item.ProductName}</p>
                        <button onClick={()=>dicri(item.Id)}>-</button>
                        <span>{item.Qty}</span>
                        <button onClick={()=>incri(item)}>+</button>
                      
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
                          
                            onClick={remove}
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
