import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import { userContext } from '../../App'
import { Card, Container } from 'react-bootstrap'
import Navigationbar from '../Navigationbar'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { Axios, userContext } from '../../App'
import axios from 'axios'
import {RiHeartsFill} from 'react-icons/ri'



const Viewproduct = () => {
  const localname = localStorage.getItem("username")
  const {id}=useParams() 
  const [product,setProduct]=useState([])
  const localId = localStorage.getItem("userID")
  const {addtowishlist}=useContext(userContext)

    const navi=useNavigate()
    // const {product,setCart,login,cart}=useContext(userContext)
    // console.log(localId,"iiii")
   
 
    useEffect(()=>{
      const fetchProduct = async ()=>{
        try{
          const response = await axios.get(`http://localhost:3000/api/users/products/${id}`)
      
          if(response.status===200){
         

            setProduct(response.data.data)
            console.log(product)

          }
  
        }catch(error){
          console.log(error);
        }
      }
      fetchProduct()
    },[])
        
   
        

          const handleAddToCart = async(event)=>{
            event.preventDefault()
            
             try{
               const response = await Axios.post(`http://localhost:3000/api/users/${localId}/cart`,{productId:id});
               console.log(response,"hhh");
          
              //  console.log(response,"oooooo");
          
               if(response && response.data && response.data.status === "success"){
                     toast.success('Product successfully added to the  cart ')
               }else{
                  console.log('Unexpected response structure:',response);
                  toast.error('Unexpected response structure')
               }
             }catch(error){
               console.log('Error adding product to the cart:',error);
               toast.error(error.response ? error.response.data.message:'An error occured')
             }
          }
     
          //  const view=product.filter((item)=>item.Id===parseInt(id))
    
    
  return (
    <div>
     <Navigationbar />
    <Container fluid>
    <div  className='d-flex align-items-center justify-content-center flex-wrap'>
 
{
  product &&(
        <div  className='d-flex align-items-center justify-content-center flex-wrap'>
          
            <Card className="shadow p-3 m-2 bg-body-tertiary rounded"
                style={{
                     width: "15rem",
                    height: "28rem",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",    
                }}>
                <Card.Img variant="top" src={product.image} style={{ height: '13rem', width: '9rem' }} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text> Old Price <del>{product.oldprice}</del></Card.Text>
                    <Card.Text> Offer Price {product.price}
                    </Card.Text>
                    <button onClick={handleAddToCart}>Add to cart</button>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <RiHeartsFill    onClick={() => 
                   localId ? addtowishlist(product._id): toast.error("Please login")
                  }  />
                </Card.Body>
            </Card>
            
        </div>
      )
    }
   
    </div>
    </Container>
    </div>
  )
}

export default Viewproduct