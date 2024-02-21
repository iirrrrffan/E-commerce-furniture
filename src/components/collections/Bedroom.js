// import React, { useContext } from 'react'
// import { userContext } from '../../App'
import { Button, Card, Container } from 'react-bootstrap'
import Navigationbar from '../Navigationbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Axios } from '../../App'


const Bedroom = () => {
  // const  {product}=useContext(userContext)
 const [product,setProducts] = useState([])
 const navi=useNavigate()
 

 
useEffect(()=>{
  const fetchProduct =async () =>{
    try{
      const response = await Axios.get('http://localhost:3000/api/users/products')
   
     console.log(response,"llllll");
  
      if( response.status===201 ){
         toast.success('successFully fetched',{
         toastId:'sucess1'
         })
        setProducts(response.data.data)
      }
    }catch(error){
       console.log(error);
    }
  }
  fetchProduct()
},[])






const bed= product.filter((item)=>item.category==='bedroom')

console.log(bed,"kkkkk");
  
 
  
  return (
    <div>
    <Navigationbar />
    <Container fluid>
    <div  className='d-flex align-items-center justify-content-center flex-wrap'>

    {bed.map((item) => (
        <div  className='d-flex align-items-center justify-content-center flex-wrap'>
          <Button variant="primary" onClick={()=>navi(`/view/${item._id}`)} >
            <Card className="shadow p-3 m-2 bg-body-tertiary rounded"
                style={{
                    width: "15rem",
                    height: "28rem",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    
                }}>
                <Card.Img variant="top" src={item.image} style={{ height: '13rem', width: '9rem' }} />
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text> Old Price <del>{item.oldprice}</del></Card.Text>
                    <Card.Text>Offer Price {item.price}
                    </Card.Text>
                    
                </Card.Body>
            </Card>
            </Button>
        </div>
    ))}
    </div>
    </Container>
</div>
  )
}

export default Bedroom