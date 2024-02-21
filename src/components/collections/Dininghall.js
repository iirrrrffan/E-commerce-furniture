// import React, { useContext } from 'react'
// import { userContext } from '../../App'
import { useEffect, useState } from 'react'
import Navigationbar from '../Navigationbar'
import { Button, Card, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Axios } from '../../App'
import { toast } from 'react-toastify'

const Dininghall = () => {
  // const{product}=useContext(userContext)
const [product,setProduct]=useState([])

useEffect(()=>{
  const fetchProduct =async () =>{
    try{
      const response = await Axios.get('http://localhost:3000/api/users/products')
   
     console.log(response,"blaaa");
  
      if( response.status===201 ){
         toast.success('successFully fetched',{
         toastId:'sucess1'
         })
        setProduct(response.data.data)
      }
    }catch(error){
       console.log(error);
    }
  }
  fetchProduct()
},[])


  const dinig=product.filter((item)=>item.category==='dining hall')
  const navi=useNavigate()
  return (
    <div>
      <Navigationbar/>

      <Container fluid>
    <div  className='d-flex align-items-center justify-content-center flex-wrap'>

    {dinig.map((item) => (
        <div  className='d-flex align-items-center justify-content-center flex-wrap'>
          <Button variant="primary" onClick={()=>navi(`/view/${item._id}`)}>
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

export default Dininghall