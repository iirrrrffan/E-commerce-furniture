// import React, { useContext } from 'react'
// import { userContext } from '../../App'
import { useEffect, useState } from 'react'
import Navigationbar from '../Navigationbar'
import { Button, Card, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Axios } from '../../App'
import { toast } from 'react-toastify'

const Kitchen = () => {
//   const {product}=useContext(userContext)
const [product,setProduct] = useState([])
console.log(product,"hai");

useEffect(()=>{
    const fetchProduct = async()=>{
   try{
  const res = await Axios.get(`http://localhost:3000/api/users/products`)

  if( res.status===201 ){
    toast.success('successFully fetched',{
    toastId:'sucess2'
    })
   setProduct(res.data.product)
 }

   }catch(error){
    console.log(error);
   }
       
    }
    fetchProduct()
  
},[])





  const ktcn=product.filter((item)=>item.type==='kitchen')

  const navi=useNavigate()
  return (

   <>
   <Navigationbar/>
   <Container fluid>
    <div  className='d-flex align-items-center justify-content-center flex-wrap'>

    {ktcn.map((item) => (
        <div  className='d-flex align-items-center justify-content-center flex-wrap'>
          <Button variant="primary" onClick={()=>navi(`/view/${item.Id}`)}>
            <Card className="shadow p-3 m-2 bg-body-tertiary rounded"
                style={{
                    width: "15rem",
                    height: "28rem",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    
                }}>
                <Card.Img variant="top" src={item.Image} style={{ height: '13rem', width: '9rem' }} />
                <Card.Body>
                    <Card.Title>{item.ProductName}</Card.Title>
                    <Card.Text> Old Price <del>{item.OldPrice}</del></Card.Text>
                    <Card.Text>Offer Price {item.Price}
                    </Card.Text>
                    
                </Card.Body>
            </Card>
            </Button>
        </div>
    ))}
    </div>
    </Container>
   
   
   </>
  )
}

export default Kitchen