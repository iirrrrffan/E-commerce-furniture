import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { userContext } from '../../App'
import { Card, Container } from 'react-bootstrap'
import Navigationbar from '../Navigationbar'
import { toast } from 'react-toastify'


const Viewproduct = () => {
    const navi=useNavigate()
    const {product,setCart,login,cart}=useContext(userContext)
    const {id}=useParams() 
    const view=product.filter((item)=>item.Id===parseInt(id)) 
        const addcart=()=>{
            if(login){
                const [newdata]=view
              const duplicate=cart.find((item)=>item.Id===newdata.Id)
              if(duplicate){
                toast.warning("product already added")
              }else{ 
                setCart((prev)=>[...prev,newdata])
                toast.success('product successfully added')
              }            
            }else{
               toast.warning('please login')
                navi("/login")
            }
        
           }
     
    
    
  return (
    <div>
     <Navigationbar />
    <Container fluid>
    <div  className='d-flex align-items-center justify-content-center flex-wrap'>
    
    {view.map((item) => (
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
                <Card.Img variant="top" src={item.Image} style={{ height: '13rem', width: '9rem' }} />
                <Card.Body>
                    <Card.Title>{item.ProductName}</Card.Title>
                    <Card.Text> Old Price <del>{item.OldPrice}</del></Card.Text>
                    <Card.Text> Offer Price {item.Price}
                    </Card.Text>
                    <button onClick={addcart}>Add to cart</button>
                </Card.Body>
            </Card>
            
        </div>
    ))}
    </div>
    </Container>
    </div>
  )
}

export default Viewproduct